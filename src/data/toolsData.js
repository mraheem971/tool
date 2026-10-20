import { Scissors, ImageIcon, Video, Zap, Sparkles, Shield, Layers, Sliders, Download, Eye, RefreshCw } from 'lucide-react';

export const TOOLS_DATA = [
  {
    id: 'clipper',
    slug: 'video-clipper',
    name: 'Long-Form Video Auto-Clipper',
    tagline: 'Split 30+ min videos into shorts with automated 5s dynamic Title & Part # intro bumpers',
    badge: '30+ Min Support',
    category: 'Video Tools',
    icon: Scissors,
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-600',
    accentBorder: 'border-purple-500/30',
    accentBg: 'bg-purple-500/10',
    accentText: 'text-purple-400',
    description: `The Long-Form Video Auto-Clipper is engineered for content creators, podcasters, educators, and streamers who produce lengthy media (30 minutes, 1 hour, or more) and need to rapidly create sequential, viral short-form clips for TikTok, YouTube Shorts, and Instagram Reels. 

Unlike traditional cloud-based editing services that require gigabytes of uploads and lengthy server queues, MediaForge Pro runs entirely inside your browser using HTML5 Canvas 2D and the MediaStream Recording API. Most importantly, it enforces a minimum clip duration of 30 seconds and automatically renders an animated 5-second intro bumper at the beginning of every clip displaying the Video Title, Part Number (e.g. PART 01), and optional branding subtitle in your choice of 4 modern design templates.`,
    highlights: [
      'Automatic segmentation of 30+ minute video files into sequential clips',
      'Configurable clip duration options: 30s (enforced minimum), 45s, 60s, 90s, 2m, or 5m',
      'Dynamic 5-second Title and Part # intro bumper rendered at the start of every clip',
      '4 customizable intro bumper styles: Glassmorphism Modern, Cyber Glow, Cinematic Minimal, and Broadcast Banner',
      'Multiple overlay positioning presets (Center Card, Bottom Third, Top Banner) and accent colors',
      'Interactive timeline grid with live visual thumbnails and timeline duration markers',
      'One-click batch export packaging all generated clips into a clean ZIP archive',
      'Zero server upload: 100% private, hardware-accelerated local browser processing'
    ],
    instructions: [
      {
        step: 1,
        title: 'Upload or Drag & Drop Video',
        description: 'Drop your long video file (MP4, MOV, WebM, or MKV). Files of 30 minutes, 1 hour, or longer are fully supported. Alternatively, click "Try Instant 90s Demo Video" to test the tool instantly with generated footage.'
      },
      {
        step: 2,
        title: 'Select Clip Duration & Quality',
        description: 'Choose your desired clip duration (minimum 30 seconds enforced, up to 5 minutes) and encoding quality preset (Medium Recommended, High 1080p, or Fast 480p).'
      },
      {
        step: 3,
        title: 'Customize the 5-Second Intro Overlay',
        description: 'Specify your Title, Subtitle, and starting Part #. Pick from 4 animated bumper templates (Glassmorphism, Cyber Glow, Cinematic Minimal, Broadcast Banner) and customize position and accent color.'
      },
      {
        step: 4,
        title: 'Preview and Fine-Tune Segments',
        description: 'Use the interactive timeline grid and real-time player to inspect any clip. Watch the dynamic 5-second intro overlay animate smoothly into the video footage.'
      },
      {
        step: 5,
        title: 'Export Individual Clips or Batch ZIP',
        description: 'Download any single clip immediately, or click "Export Selected Clips (ZIP)" to batch-render all segments with their intro bumpers into a single organized ZIP package.'
      }
    ],
    examples: [
      {
        title: '60-Minute Podcast to 30s-60s Viral Clips',
        scenario: 'A podcast host uploaded a 1-hour interview (1.2 GB MP4) to extract key moments for social media.',
        result: 'Generated 60 sequential 60-second clips, each starting with an automated "Podcast Ep. 42 • Part 01", "Part 02", etc., bumper. Packaged into a ZIP in minutes without uploading to cloud servers.',
        stats: '60 Clips Generated • 5s Intro on Each • 0 MB Server Upload'
      },
      {
        title: '2-Hour Gaming Stream Highlights',
        scenario: 'A Twitch streamer wanted to chop a 2-hour gameplay stream into 90-second episode chunks for YouTube Shorts.',
        result: 'Split the broadcast into 80 clips featuring the Cyber Glow intro template with Part numbers, ready for scheduled posting.',
        stats: '80 Segments Created • 1080p Output • Instant Local Encoding'
      },
      {
        title: 'University Lecture & Webinar Chapters',
        scenario: 'An educator needed to break down a 45-minute technical webinar into 3-minute bite-sized study segments.',
        result: 'Produced 15 modular video lessons formatted with Clean Cinematic banners displaying topic name and chapter numbering.',
        stats: '15 Bite-Sized Modules • High Bitrate • Fast Student Access'
      }
    ],
    faqs: [
      {
        question: 'Why is there a minimum clip duration of 30 seconds?',
        answer: 'The 30-second minimum duration guarantees that every clip has sufficient substance following the 5-second title intro bumper. It is optimized for YouTube Shorts, Instagram Reels, and TikTok algorithms which favor engaging videos that hold viewer retention past the 30-second threshold.'
      },
      {
        question: 'How does the 5-second intro bumper work?',
        answer: 'During the first 5 seconds of every clip (from timestamp 0.0s to 5.0s), an animated canvas overlay is embedded on top of the video frames. It displays your chosen Part number (e.g. PART 01), title, and subtitle, featuring entry and exit animations. After 5 seconds, the bumper smoothly fades out, letting the core video play unobstructed.'
      },
      {
        question: 'Is my video uploaded to your servers?',
        answer: 'No! Everything runs 100% locally on your machine via client-side Web APIs (HTML5 Canvas, Web Audio API, and MediaRecorder). Your video never leaves your computer, ensuring absolute privacy for unreleased podcasts, company meetings, or private recordings.'
      },
      {
        question: 'Can I choose which clips to export or must I export all?',
        answer: 'You have full flexibility! You can select or deselect any individual clip from the timeline grid, download specific clips with a single click, or select all clips for an automated batch export into a ZIP file.'
      },
      {
        question: 'What video formats are supported?',
        answer: 'MediaForge Pro supports MP4 (H.264 / AAC), WebM (VP8/VP9/AV1), MOV, and MKV files. Any video container decoded natively by modern Chromium, Firefox, or Safari browsers is supported.'
      }
    ],
    relatedToolIds: ['video', 'image']
  },
  {
    id: 'image',
    slug: 'image-compressor',
    name: 'Lossless & High-Efficiency Image Compressor',
    tagline: 'Compress PNG, JPG, WebP, and AVIF images up to 90% with side-by-side comparison slider',
    badge: 'Batch + Lossless',
    category: 'Image Tools',
    icon: ImageIcon,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    accentBorder: 'border-cyan-500/30',
    accentBg: 'bg-cyan-500/10',
    accentText: 'text-cyan-400',
    description: `The Image Compressor in MediaForge Pro provides state-of-the-art client-side image compression and format conversion. Designed for web developers, graphic designers, photographers, and e-commerce managers, it eliminates bulky file sizes without degrading visible optical quality.

Equipped with an interactive before-and-after comparison slider, you can inspect pixels down to the finest detail before exporting. Choose from granular compression presets (Low Best Quality, Medium Recommended, High Smaller File, Extreme Smallest File, or Custom 1%-100%) and seamlessly convert between PNG, JPG, and modern WebP formats on the fly.`,
    highlights: [
      'Compress JPEG, PNG, WebP, and AVIF assets with up to 90% size reduction',
      'Interactive Before / After comparison slider with draggable split view',
      '5 compression level presets: Low (92%), Medium (80%), High (60%), Extreme (40%), and Custom Slider',
      'Instant format conversion between WebP, JPEG, and PNG',
      'Optional resolution downscaling (Original, 75%, 50%, 25%)',
      'Instant synthetic 4K photography generator for zero-upload instant testing',
      'Real-time savings calculator showing exact byte count and percentage saved',
      '100% private in-browser compression with zero server-side transmission'
    ],
    instructions: [
      {
        step: 1,
        title: 'Upload Image or Generate 4K Demo',
        description: 'Drag and drop your image file (JPEG, PNG, WebP) or click "Try 4K Demo Photo" to generate a crisp high-resolution photo instantly.'
      },
      {
        step: 2,
        title: 'Choose Compression Preset or Format',
        description: 'Select your target preset (e.g., Medium Recommended for web, or Extreme for mobile) or pick a target export format like modern WebP.'
      },
      {
        step: 3,
        title: 'Inspect Visual Quality with Comparison Slider',
        description: 'Drag the split-screen slider back and forth to inspect original vs compressed visual fidelity at full scale.'
      },
      {
        step: 4,
        title: 'Download Optimized Image',
        description: 'Check the real-time savings badge (e.g., 68% size reduction) and click Download to save the optimized file instantly.'
      }
    ],
    examples: [
      {
        title: 'E-Commerce Hero Banner Optimization',
        scenario: 'A web designer needed to reduce a 4.8 MB PNG hero banner for faster mobile page loads.',
        result: 'Converted to WebP with Medium preset: file size dropped to 520 KB with zero visible loss in sharpness on Retina screens.',
        stats: '89% File Size Reduction • 4.8 MB down to 520 KB • Instant LCP boost'
      },
      {
        title: 'High-Resolution Photography Portfolio',
        scenario: 'A photographer wanted to display 20 full-frame 24MP photos without overloading website bandwidth.',
        result: 'Compressed images from an average of 14 MB each down to 1.8 MB JPEG with Low (Best Quality) preset.',
        stats: '87% Average Savings • Preserved Exquisite Dynamic Range'
      },
      {
        title: 'Discord & Social Media Avatar Sizing',
        scenario: 'A user needed to compress a 3.2 MB avatar to fit under Discord\'s free upload limit.',
        result: 'Scaled to 512×512 WebP in under 1 second, producing a crystal-clear 84 KB avatar.',
        stats: '3.2 MB down to 84 KB • 97% Reduction • Instant Export'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between Lossy and Lossless compression in this tool?',
        answer: 'Lossless compression optimizes internal encoding tables and metadata without altering a single pixel value, ideal for logos and icons. Lossy compression (such as JPEG and WebP quality factors) selectively reduces imperceptible color variance, yielding dramatically smaller file sizes while maintaining perceived visual perfection.'
      },
      {
        question: 'Why should I convert my images to WebP?',
        answer: 'WebP provides superior lossy and lossless compression for web images compared to PNG and JPEG. On average, WebP produces files 25-35% smaller than comparable JPEGs and up to 80% smaller than PNGs while preserving alpha channel transparency.'
      },
      {
        question: 'Is there a limit on how many images or how large an image I can compress?',
        answer: 'Because all processing is performed in your browser using your local CPU/GPU, there is no artificial cloud quota! You can compress high-resolution 4K and 8K images without any subscription or limits.'
      },
      {
        question: 'Do you keep any copy of my uploaded photos?',
        answer: 'Never. MediaForge Pro does not transmit your images to any remote server. Your files are loaded into browser memory via HTML5 File and Canvas APIs and discarded when you close or refresh the tab.'
      }
    ],
    relatedToolIds: ['video', 'clipper']
  },
  {
    id: 'video',
    slug: 'video-compressor',
    name: 'Adaptive Video Compressor & Resizer',
    tagline: 'Shrink large videos for Discord, email, and social media with custom target file size calculators',
    badge: 'Discord / Social Ready',
    category: 'Video Tools',
    icon: Video,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    accentBorder: 'border-emerald-500/30',
    accentBg: 'bg-emerald-500/10',
    accentText: 'text-emerald-400',
    description: `The Adaptive Video Compressor solves the universal problem of bulky video files exceeding upload limits on Discord (25 MB), email attachments, Slack, WhatsApp, and social platforms.

Built upon browser-native MediaRecorder and Web Audio APIs, this tool transcodes video streams with intelligent adaptive bitrate control and optional resolution downscaling (1080p, 720p, 480p, 360p). You can specify an exact target output size in megabytes (e.g., 20 MB for Discord), and our engine will calculate the optimal video and audio bitrates to hit that target without distortion.`,
    highlights: [
      'Intelligent bitrate and resolution optimizer for Discord, Email, and Social platforms',
      'Custom target file size mode: input desired MB and let the engine calibrate bitrates',
      '4 compression presets: Low (~30% reduction), Medium (~50%), High (~70%), and Extreme (~85%+)',
      'Audio stream preservation with Web Audio API channel synchronization',
      'Resolution downscaling options: Original, 1080p, 720p, 480p, and 360p',
      'Live progress bar with real-time percentage and estimated output size',
      'Instant synthetic 90-second demo stream for quick testing',
      '100% private in-browser compression with zero data transfer to external servers'
    ],
    instructions: [
      {
        step: 1,
        title: 'Upload Source Video',
        description: 'Drop your video file (MP4, MOV, WebM, MKV) or click "Try Instant Demo Video" to generate a sample video stream.'
      },
      {
        step: 2,
        title: 'Select Compression Mode or Target MB',
        description: 'Choose a preset like "Medium Recommended" for general sharing, or select "Target File Size" and enter 20 MB to fit Discord upload limits.'
      },
      {
        step: 3,
        title: 'Adjust Resolution & Audio Settings',
        description: 'Optionally downscale resolution to 720p or 480p for massive size reductions, and ensure audio bitrate matches your fidelity needs.'
      },
      {
        step: 4,
        title: 'Start Compression & Monitor Live Progress',
        description: 'Click "Start Video Compression" and watch the hardware-accelerated encoding bar in real time.'
      },
      {
        step: 5,
        title: 'Download Optimized Video',
        description: 'Review the before-and-after size comparison and download your compressed MP4/WebM video with one click.'
      }
    ],
    examples: [
      {
        title: 'Discord 25 MB Upload Bypass',
        scenario: 'A gamer captured a 180 MB 1080p gaming clip that exceeded Discord\'s 25 MB upload limit.',
        result: 'Using Target File Size mode set to 23 MB and 720p resolution, the clip compressed to 21.4 MB in seconds, ready to post.',
        stats: '180 MB down to 21.4 MB • 88% Reduction • Crisp 60fps Playback'
      },
      {
        title: 'Email Attachment Video Compression',
        scenario: 'A corporate employee needed to send a 75 MB product demonstration via Outlook (20 MB limit).',
        result: 'Applied Medium Preset with 720p downscaling; file compressed to 14.8 MB without audio desync.',
        stats: '80% Reduction • 75 MB to 14.8 MB • Clear Voiceover & Slides'
      },
      {
        title: 'Mobile Web Video Optimization',
        scenario: 'A web developer needed to compress a background loop video to ensure fast load times on 4G/5G phones.',
        result: 'High preset with 480p muted stream reduced 45 MB video to 4.2 MB, accelerating mobile site speed by 3.5×.',
        stats: '91% Reduction • 45 MB to 4.2 MB • Zero Buffering'
      }
    ],
    faqs: [
      {
        question: 'How does Target File Size calculation work?',
        answer: 'When you specify a target file size (e.g. 20 MB), the engine divides the target byte budget by your video\'s total duration in seconds. It allocates 128 kbps for crystal-clear audio and dedicates the remaining bandwidth to the video bitrate, optimizing visual clarity within the exact byte cap.'
      },
      {
        question: 'Will compressing my video cause audio to lose sync?',
        answer: 'No. MediaForge Pro utilizes synchronized MediaStream tracks and an integrated Web Audio API AudioContext destination. Audio and video frames are synchronized continuously during the re-encoding pass.'
      },
      {
        question: 'Why is client-side video compression faster than uploading to online converters?',
        answer: 'Traditional cloud converters require you to upload your full video file over your internet uplink (which is often 10× slower than download speed), wait in a server job queue, and then download the result. MediaForge Pro compresses the file directly on your local CPU/GPU with zero upload time!'
      },
      {
        question: 'What video containers does the compressor output?',
        answer: 'Depending on your browser, MediaForge Pro outputs MP4 (H.264 / AAC) or WebM (VP8/VP9 / Opus) video containers, both of which are universally playable on modern mobile devices, desktop players, and browsers.'
      }
    ],
    relatedToolIds: ['clipper', 'image']
  }
];
