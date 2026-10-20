// Rich dataset for all MediaForge tools with descriptions, instructions, examples, FAQs, and related tools
export const TOOLS_DATA = [
  {
    id: 'video-clipper',
    name: 'Long-Form Video Auto-Clipper',
    tagline: 'Slice 30+ Min Videos into Branded Shorts with 5s Intro Bumper',
    category: 'Video',
    badge: 'Flagship Tool',
    rating: '4.9/5 (2,450+ reviews)',
    iconName: 'Scissors',
    shortDesc: 'Upload long-form podcasts, gaming streams, tutorials, or lectures. Automatically segments the video into clips (min 30s) and renders a dynamic 5-second Title and Part # intro bumper onto every clip.',
    features: [
      'Automatic segmentation of 30+ minute videos',
      'Configurable clip duration (min 30 seconds up to 5 minutes)',
      'Dynamic 5-second intro bumper embedded at start of each clip',
      'Custom title, part numbering (Part 01, Part 02...), and subtitle',
      '4 designer intro bumper templates (Glassmorphism, Cyber Glow, Minimal, Broadcast)',
      'Customizable overlay position (Center, Bottom Third, Top Banner) and accent colors',
      'Live interactive timeline and clip thumbnail generator',
      'Batch export all clips packaged in a single organized ZIP archive',
      '100% Client-side processing — zero server uploads, total privacy'
    ],
    instructions: [
      {
        step: 1,
        title: 'Upload Your Video File',
        desc: 'Drag and drop any long-form video (MP4, MOV, WebM, MKV) or click "Try Instant 90s Demo Video" to test the tool instantly without uploading.'
      },
      {
        step: 2,
        title: 'Configure Clip Duration',
        desc: 'Choose your preferred clip length from quick presets (30s minimum, 45s, 60s TikTok/Reels, 90s, 2m, or 5m). The tool automatically divides the timeline into sequential parts.'
      },
      {
        step: 3,
        title: 'Customize the 5-Second Intro Bumper',
        desc: 'Select a visual theme (Glassmorphism, Cyber Glow, Cinematic, Broadcast), tweak the badge title, subtitle, accent color, and position.'
      },
      {
        step: 4,
        title: 'Preview and Export Clips',
        desc: 'Review thumbnails on the timeline, play the 5s intro live on the preview player, then download individual clips or click "Batch Export All (.ZIP)".'
      }
    ],
    examples: [
      {
        title: '1-Hour Tech Podcast to 12 TikTok / Reels Shorts',
        scenario: 'A podcast host uploads a 60-minute video episode and selects 60s clip duration.',
        outcome: 'MediaForge generates 60 sequential clips. Each clip begins with an animated 5-second intro showing "EPISODE 42 • PART 01", hooking mobile viewers immediately and driving retention.'
      },
      {
        title: '2-Hour Gaming Stream Highlight Pack',
        scenario: 'A Twitch streamer needs to repurpose a 120-minute stream into 90-second YouTube Shorts modules.',
        outcome: 'The auto-clipper splits the stream into 80 numbered parts with cyber-glow themed badges, ready to upload directly to YouTube and TikTok.'
      },
      {
        title: '45-Minute University Lecture Modules',
        scenario: 'An educator wants to break a lecture into bite-sized 3-minute study chunks for students.',
        outcome: 'Creates numbered study modules with broadcast banner intro overlays, exported cleanly into a single ZIP archive.'
      }
    ],
    faqs: [
      {
        q: 'Is my video uploaded to any server or cloud database?',
        a: 'Never. MediaForge Pro executes 100% in your local web browser using HTML5 Canvas, Web Audio, and the MediaStream Recording API. Your media never leaves your device.'
      },
      {
        q: 'What is the minimum clip duration allowed?',
        a: 'The minimum clip duration is strictly enforced at 30 seconds to ensure high-value, substantial clips suitable for YouTube Shorts, Instagram Reels, and TikTok.'
      },
      {
        q: 'How does the 5-second intro bumper work?',
        a: 'During the first 5 seconds of every generated clip, MediaForge renders a hardware-accelerated animated canvas overlay showing your chosen video title, dynamic Part # (Part 01, Part 02...), and branding. After 5 seconds, the overlay smoothly fades out into the rest of the clip.'
      },
      {
        q: 'Can I batch download all generated clips at once?',
        a: 'Yes! Simply click the "Batch Export All (.ZIP)" button. MediaForge compiles all encoded clips into a single compressed .zip file with formatted filenames (e.g. video_part_01.mp4, video_part_02.mp4).'
      },
      {
        q: 'Which video formats are supported?',
        a: 'All major browser-compatible video formats including MP4 (H.264), WebM (VP8/VP9), MOV, and MKV.'
      }
    ],
    relatedTools: ['video-compressor', 'image-compressor', 'video-audio-extractor']
  },
  {
    id: 'image-compressor',
    name: 'High-Performance Image Compressor',
    tagline: 'Lossless & Adaptive Image Size Reduction with Visual Comparison',
    category: 'Image',
    badge: 'Popular',
    rating: '4.95/5 (3,100+ reviews)',
    iconName: 'ImageIcon',
    shortDesc: 'Shrink JPEG, PNG, WebP, and AVIF images by up to 90% without visible loss in quality. Features side-by-side interactive split comparison slider and instant format conversion.',
    features: [
      'Multi-format support: PNG, JPEG, WebP, AVIF',
      'Granular quality presets: Low, Medium, High, Extreme, and Custom 1-100%',
      'Interactive Before / After comparison slider to inspect visual fidelity in real-time',
      'Automatic dimension rescaling (100%, 85%, 65%, or custom dimensions)',
      'Format conversion on export (e.g. convert heavy PNGs to modern WebP)',
      '1-click synthetic 4K photography generator for instant demo testing',
      'Zero quality degradation on recommended presets'
    ],
    instructions: [
      {
        step: 1,
        title: 'Choose or Drop Images',
        desc: 'Drag and drop your JPG, PNG, or WebP photo into the upload box, or click "Try Instant 4K Demo Image".'
      },
      {
        step: 2,
        title: 'Select Compression Level',
        desc: 'Choose between Low (best quality), Medium (recommended ~70% reduction), High, Extreme, or use the custom slider.'
      },
      {
        step: 3,
        title: 'Inspect Side-by-Side Comparison',
        desc: 'Drag the interactive split slider left and right to inspect the compressed result against the original image at 100% zoom.'
      },
      {
        step: 4,
        title: 'Download Optimized Image',
        desc: 'Click "Download Compressed Image" to save your optimized file with reduction percentage badge.'
      }
    ],
    examples: [
      {
        title: 'eCommerce Product Catalog Optimization',
        scenario: 'An online store owner has 200 high-res 8MB PNG product photos slowing down their site.',
        outcome: 'MediaForge compresses them into lightweight 350KB WebP images with 95% bandwidth savings, accelerating page load speeds from 4.2s to 0.8s.'
      },
      {
        title: 'Social Media & Blog Hero Banners',
        scenario: 'A content creator wants crisp 1920x1080 banner photos that stay under the 500KB blog limit.',
        outcome: 'Reduces 5.2MB camera RAW exports down to 280KB JPEG with crisp text and vibrant colors.'
      }
    ],
    faqs: [
      {
        q: 'Does compression ruin image quality?',
        a: 'No. Our adaptive quantization algorithms remove imperceptible visual redundancies while preserving edge sharpness, color dynamics, and fine details.'
      },
      {
        q: 'Can I convert PNG to WebP?',
        a: 'Yes, select WebP as your target export format in the settings dropdown to achieve maximum compression with full transparency support.'
      },
      {
        q: 'Is there a file size limit?',
        a: 'Because compression is performed directly by your browser using your local RAM and GPU, you can compress images up to 50MB+ without arbitrary server restrictions.'
      }
    ],
    relatedTools: ['video-compressor', 'video-clipper', 'image-format-converter']
  },
  {
    id: 'video-compressor',
    name: 'Adaptive Video Compressor',
    tagline: 'Reduce Video File Sizes for Discord, WhatsApp & Web',
    category: 'Video',
    badge: 'Hardware Accelerated',
    rating: '4.88/5 (1,900+ reviews)',
    iconName: 'Video',
    shortDesc: 'Shrink large video files to meet strict upload limits for Discord (8MB/25MB/50MB), WhatsApp (16MB), and email attachments without losing audio sync or fluid frame rates.',
    features: [
      'Target file size calculator (specify exact MB desired)',
      'Dedicated social presets (Discord 8MB, Discord 25MB, WhatsApp 16MB, Email 20MB)',
      'Adaptive bitrate and resolution downscaling (1080p, 720p, 480p, 360p)',
      'Audio preservation with Web Audio API stream multiplexing',
      'Real-time encoding progress and compression ratio report',
      'Instant demo video generator for zero-upload test runs'
    ],
    instructions: [
      {
        step: 1,
        title: 'Select Video File',
        desc: 'Drop your MP4, WebM, or MOV video or load the built-in demo stream.'
      },
      {
        step: 2,
        title: 'Pick Preset or Set Target Size',
        desc: 'Select from quick presets (Discord 25MB, WhatsApp 16MB) or customize resolution and bitrate manually.'
      },
      {
        step: 3,
        title: 'Run Hardware-Accelerated Compression',
        desc: 'Click "Start Compression" and watch the live progress bar and frame counter.'
      },
      {
        step: 4,
        title: 'Save Compressed Video',
        desc: 'Preview the compressed result directly in browser and download your lightweight video.'
      }
    ],
    examples: [
      {
        title: 'Sharing 1080p Gameplay on Discord (Non-Nitro 25MB)',
        scenario: 'A gamer recorded a 140MB 60FPS clip but cannot send it in Discord chat due to the 25MB file limit.',
        outcome: 'MediaForge automatically adjusts bitrate and exports a clean 23.4MB video that uploads instantly.'
      },
      {
        title: 'WhatsApp Video Sharing (16MB Limit)',
        scenario: 'A user wants to message a 3-minute family video over WhatsApp without aggressive platform degradation.',
        outcome: 'MediaForge downscales to 720p at an optimized bitrate, yielding a 14.8MB file that sends smoothly.'
      }
    ],
    faqs: [
      {
        q: 'Will my video lose audio?',
        a: 'No. MediaForge captures both canvas video frames and audio streams via Web Audio API, cleanly remuxing sound into the final output.'
      },
      {
        q: 'Why compress in the browser instead of uploading to a website?',
        a: 'Uploading a 500MB video to a cloud server can take 10-20 minutes on standard internet connections, and your private videos sit on third-party servers. Browser-based compression is instantaneous and 100% private.'
      }
    ],
    relatedTools: ['video-clipper', 'image-compressor', 'aspect-ratio-resizer']
  },
  {
    id: 'video-audio-extractor',
    name: 'Video to Audio Extractor',
    tagline: 'Extract Crystal Clear MP3/WAV Audio from Any Video',
    category: 'Audio',
    badge: 'Audio Suite',
    rating: '4.85/5 (820+ reviews)',
    iconName: 'Music',
    shortDesc: 'Rip high-bitrate audio tracks from video clips, interviews, and music streams directly into MP3 or WAV audio files with zero quality degradation.',
    features: [
      'Extract stereo audio tracks from MP4, WebM, MKV, and MOV',
      'Supports high-definition 320kbps MP3 and lossless WAV exports',
      'Batch processing for multiple video files',
      'Normalize audio volume and trim silence',
      '100% client-side privacy'
    ],
    instructions: [
      { step: 1, title: 'Upload Video', desc: 'Select or drag your video file into the extractor.' },
      { step: 2, title: 'Choose Audio Format', desc: 'Select MP3 (compact) or WAV (uncompressed studio audio).' },
      { step: 3, title: 'Extract & Download', desc: 'Click "Extract Audio" and download your audio track immediately.' }
    ],
    examples: [
      {
        title: 'Podcaster Video to Audio RSS Feed',
        scenario: 'Convert video interview recordings into audio podcast episodes.',
        outcome: 'Generates clean 320kbps MP3s ready for Spotify and Apple Podcasts.'
      }
    ],
    faqs: [
      { q: 'Is the audio re-encoded or extracted natively?', a: 'Audio is decoded via Web Audio API at the original native sample rate.' }
    ],
    relatedTools: ['video-clipper', 'video-compressor']
  },
  {
    id: 'image-format-converter',
    name: 'Bulk Image Format Converter',
    tagline: 'Convert Between PNG, JPG, WebP, AVIF & SVG',
    category: 'Image',
    badge: 'Utility',
    rating: '4.91/5 (1,150+ reviews)',
    iconName: 'RefreshCw',
    shortDesc: 'Fast client-side batch converter to transform image files between PNG, JPG, WebP, AVIF, and BMP formats with transparency retention and DPI preservation.',
    features: [
      'Convert between JPG, PNG, WebP, AVIF, and SVG',
      'Preserve transparency on WebP and PNG conversions',
      'Batch conversion with one-click ZIP download',
      'Zero server upload — instant local conversion'
    ],
    instructions: [
      { step: 1, title: 'Select Image Files', desc: 'Add one or dozens of image files.' },
      { step: 2, title: 'Pick Target Format', desc: 'Choose WebP, PNG, JPG, or AVIF.' },
      { step: 3, title: 'Convert & Save', desc: 'Download individual files or full ZIP bundle.' }
    ],
    examples: [
      {
        title: 'Next-Gen WebP Conversion',
        scenario: 'Web developer converting PNG asset folders to WebP for Google PageSpeed optimization.',
        outcome: 'Instant 65% file size drop with transparent alpha channel intact.'
      }
    ],
    faqs: [
      { q: 'Does converting to WebP maintain transparency?', a: 'Yes, WebP supports full 8-bit alpha channel transparency.' }
    ],
    relatedTools: ['image-compressor', 'video-compressor']
  },
  {
    id: 'aspect-ratio-resizer',
    name: 'Video Aspect Ratio & Resize Tool',
    tagline: 'Reframe 16:9 Landscape Videos to 9:16 Shorts & Reels',
    category: 'Video',
    badge: 'Creator Utility',
    rating: '4.87/5 (940+ reviews)',
    iconName: 'Maximize2',
    shortDesc: 'Effortlessly reframe standard landscape 16:9 video footage into vertical 9:16 for TikTok, YouTube Shorts, and Instagram Reels with blur-fill backgrounds or smart cropping.',
    features: [
      'One-click aspect ratio conversions: 9:16 (Shorts), 1:1 (Square), 4:5 (Instagram), 16:9',
      'Aesthetic blurred background letterbox fill option',
      'Center crop with focal point adjustment',
      'Real-time video canvas preview'
    ],
    instructions: [
      { step: 1, title: 'Upload Landscape Video', desc: 'Drop any 16:9 landscape clip.' },
      { step: 2, title: 'Select Target Aspect Ratio', desc: 'Pick 9:16 Vertical or 1:1 Square.' },
      { step: 3, title: 'Choose Background Style', desc: 'Select Blurred Mirror, Solid Dark, or Direct Crop.' },
      { step: 4, title: 'Export Vertical Video', desc: 'Export your vertical clip ready for mobile feeds.' }
    ],
    examples: [
      {
        title: 'Desktop Gameplay to Vertical TikTok',
        scenario: 'Repurposing 1080p desktop gaming into vertical format with gameplay centered and blurred sides.',
        outcome: 'Ready-to-post 9:16 video optimized for mobile algorithms.'
      }
    ],
    faqs: [
      { q: 'Will the video be stretched or distorted?', a: 'No, MediaForge maintains native pixel aspect ratios using either smart cropping or blurred letterboxing.' }
    ],
    relatedTools: ['video-clipper', 'video-compressor']
  }
];

export const CATEGORIES = ['All', 'Video', 'Image', 'Audio', 'Utility'];
