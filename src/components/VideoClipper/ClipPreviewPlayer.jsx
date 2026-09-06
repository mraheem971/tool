import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Clock, Volume2, VolumeX, Eye } from 'lucide-react';
import { drawIntroOverlay } from '../../utils/canvasOverlay';
import { formatDuration, formatDurationDetailed } from '../../utils/formatters';

export default function ClipPreviewPlayer({ videoUrl, activeClip, overlayOptions }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeInClip, setCurrentTimeInClip] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const clipDuration = activeClip ? activeClip.endTime - activeClip.startTime : 30;
  const introDuration = overlayOptions?.introDuration || 5.0;

  // Render loop for canvas overlay
  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || !activeClip) return;

    const ctx = canvas.getContext('2d');

    const render = () => {
      if (video.readyState >= 2) {
        // Set canvas resolution to match video
        if (canvas.width !== video.videoWidth && video.videoWidth > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        // Draw video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Calculate time relative to clip start
        const timeInClip = Math.max(0, video.currentTime - activeClip.startTime);
        setCurrentTimeInClip(timeInClip);

        // Draw 5-second dynamic Part # and Title overlay
        drawIntroOverlay(ctx, canvas.width, canvas.height, {
          timeInClip,
          duration: introDuration,
          partNumber: activeClip.partNumber,
          totalParts: activeClip.totalParts,
          title: overlayOptions.title || activeClip.title,
          subtitle: overlayOptions.subtitle || activeClip.subtitle,
          template: overlayOptions.template || 'viral_tiktok',
          position: overlayOptions.position || 'top',
          animation: overlayOptions.animation || 'fade',
          customAccent: overlayOptions.accentColor,
          fontSizeMultiplier: overlayOptions.fontSizeMultiplier || 1.0,
          showPartCounter: overlayOptions.showPartCounter !== false,
          showSubtitle: overlayOptions.showSubtitle !== false
        });

        // Loop clip or stop at clip end
        if (video.currentTime >= activeClip.endTime) {
          video.pause();
          video.currentTime = activeClip.startTime;
          setIsPlaying(false);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [activeClip, overlayOptions, introDuration]);

  // When active clip changes, seek to clip start
  useEffect(() => {
    const video = videoRef.current;
    if (video && activeClip) {
      video.currentTime = activeClip.startTime;
      setCurrentTimeInClip(0);
      setIsPlaying(false);
    }
  }, [activeClip?.id, activeClip?.startTime]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (video.currentTime >= activeClip.endTime) {
        video.currentTime = activeClip.startTime;
      }
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video || !activeClip) return;
    video.currentTime = activeClip.startTime;
    video.play();
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video || !activeClip) return;
    const newRelative = parseFloat(e.target.value);
    video.currentTime = activeClip.startTime + newRelative;
    setCurrentTimeInClip(newRelative);
  };

  if (!activeClip) return null;

  const isIntroActive = currentTimeInClip <= introDuration;

  return (
    <div className="glass-panel rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-base text-slate-100">
            Clip Preview: <span className="text-cyan-400">Part {activeClip.partNumber} of {activeClip.totalParts}</span>
          </h3>
        </div>

        {/* Dynamic 5s Intro Status Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
          isIntroActive
            ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10 animate-pulse'
            : 'bg-slate-900 border border-slate-800 text-slate-500'
        }`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {isIntroActive
              ? `5s Intro Active (${Math.max(0, introDuration - currentTimeInClip).toFixed(1)}s)`
              : 'Intro Passed (>5s)'}
          </span>
        </div>
      </div>

      {/* Hidden Video + Canvas Player */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoUrl}
          playsInline
          muted={isMuted}
          className="hidden"
        />
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
        />

        {/* Play Overlay Button if paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white border border-cyan-500/30 backdrop-blur-md flex items-center justify-center transition-all scale-100 hover:scale-110 shadow-2xl"
          >
            <Play className="w-7 h-7 ml-1" />
          </button>
        )}
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col gap-2.5">
        {/* Scrubber */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 w-12">
            {formatDuration(currentTimeInClip)}
          </span>
          <input
            type="range"
            min="0"
            max={clipDuration}
            step="0.1"
            value={currentTimeInClip}
            onChange={handleSeek}
            className="flex-1"
          />
          <span className="text-xs font-mono text-slate-400 w-12 text-right">
            {formatDuration(clipDuration)}
          </span>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200"
              title="Replay from clip start (see 5s intro again)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Timestamp: <span className="font-mono text-slate-200">{formatDuration(activeClip.startTime)} ? {formatDuration(activeClip.endTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
