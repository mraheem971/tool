# MediaForge Pro

> **High-Performance Client-Side Media Suite**: Modern Image Compressor, Adaptive Video Compressor & Smart Long-Form Video Auto-Clipper with Dynamic 5-Second Intro Bumpers.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38BDF8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Overview

**MediaForge Pro** is an all-in-one, ultra-fast client-side media manipulation platform built with modern web technologies (HTML5 Canvas 2D, Web Audio API, MediaStream Recording API, and Lucide React). All compression and video clipping happens **100% locally in your browser** &mdash; no files are ever uploaded to external servers, guaranteeing total privacy, zero bandwidth cost, and lightning-fast processing speeds.

---

## Key Features

### 1. Ultra-Fast Image Compressor
- **Multi-Format Support**: Compress and convert JPEG, PNG, and WebP images.
- **Interactive Before / After Comparison Slider**: Inspect visual fidelity side-by-side with an interactive comparison slider.
- **Granular Compression Presets**:
  - `Low — best quality` (92% quality, 100% scale)
  - `Medium — recommended` (80% quality, 100% scale)
  - `High — smaller file` (60% quality, 85% scale)
  - `Extreme — smallest file` (40% quality, 65% scale)
  - `Custom — manual slider` (1% – 100% quality factor)
- **Instant Demo Asset**: One-click synthetic 4K photography generator to test compression instantly without needing to upload files.

### 2. Adaptive Video Compressor
- **Client-Side Hardware Acceleration**: Uses HTML5 Canvas + MediaRecorder API to re-encode and transcode video files in real-time.
- **Flexible Compression Presets**:
  - `Medium — recommended` (~50% size reduction)
  - `High — smaller file` (~70% size reduction + 480p downscaling)
  - `Extreme — smallest file` (~85%+ size reduction + 360p downscaling)
  - `Low — best quality` (~30% size reduction + full resolution)
- **Target File Size Calculator**: Set exact target output size (MB) with automatic bitrate calculation.
- **Audio Preservation**: Re-encodes multi-channel video audio cleanly via HTML5 AudioContext & MediaStream destination.

### 3. Smart Long-Form Video Clipper (30+ Min Videos)
- **Automatic Video Segmentation**: Upload 30+ minute lectures, streams, podcasts, gaming videos, or tutorials, and automatically split them into sequential, bite-sized short clips.
- **Configurable Clip Duration**: Choose duration options ranging from **30 seconds (minimum enforced)** up to 5 minutes, or custom timestamps.
- **Dynamic 5-Second Title & Part # Intro Overlay**:
  - Every exported clip automatically starts with an animated 5-second intro bumper displaying the **Video Title**, **Part Number (e.g., Part 01 / 12)**, and optional Subtitle/Branding.
  - 4 stunning visual bumper templates: *Glassmorphism Modern*, *Cyber Glow*, *Cinematic Minimal*, and *Broadcast Banner*.
  - Live customizable positioning (*Center Card*, *Bottom Third*, *Top Banner*) and accent colors (*Cyan, Purple, Emerald, Amber, Rose*).
- **Interactive Timeline & Segment Preview**: Visual timeline with individual thumbnail generation, duration stamps, and playhead previews.
- **Single & Batch Export with ZIP Packaging**: Export individual clips directly or batch-export all segments into a single organized `.zip` archive with `JSZip`.
- **Instant 90s Demo Video Generator**: Synthesizes a sample multi-segment canvas stream for instant testing.

---

## Tech Stack & Architecture

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS, PostCSS, Lucide React Icons
- **Animation & Visuals**: Canvas Confetti, Tailwind Animations
- **Packaging**: JSZip, FileSaver
- **Processing**: HTML5 2D Canvas Context, MediaStream Recording API, Web Audio API

---

## Project Structure

```text
tool/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── public/
│   ├── favicon.svg
│   └── favicon.ico
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ImageCompressor/
    │   │   ├── ImageCompressor.jsx
    │   │   ├── ComparisonSlider.jsx
    │   │   └── ImageSettings.jsx
    │   ├── VideoCompressor/
    │   │   ├── VideoCompressor.jsx
    │   │   └── VideoSettings.jsx
    │   └── VideoClipper/
    │       ├── VideoClipper.jsx
    │       ├── ClipDurationSelector.jsx
    │       ├── OverlayCustomizer.jsx
    │       ├── ClipTimelineGrid.jsx
    │       ├── ClipPreviewPlayer.jsx
    │       └── BatchExportModal.jsx
    ├── services/
    │   ├── imageProcessor.js        # Canvas image compressor & format converter
    │   ├── videoCompressorEngine.js # Adaptive bitrate & resolution video optimizer
    │   ├── videoClipperEngine.js    # Long-form video splitter & 5s intro renderer
    │   └── zipExporter.js           # Multi-file ZIP packaging & download utility
    └── utils/
        ├── canvasOverlay.js         # 5-second dynamic title & part # canvas templates
        ├── formatters.js            # Time & byte formatting helpers
        └── sampleMedia.js           # Synthetic demo video & image generators
```

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mraheem971/tool.git
   cd tool
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

### Production Build

To build the application for production deployment:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## License

This project is licensed under the MIT License.
