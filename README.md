# ? MediaForge PRO

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" />
  <img src="https://img.shields.io/badge/Client--Side-100%25%20Private-06B6D4?style=for-the-badge" alt="Client Side Privacy" />
</p>

<p align="center">
  <strong>High-Performance Media Studio</strong> featuring Smart Image Compression, Proportional Video Compression, and an Intelligent <strong>Long Video Auto-Clipper</strong> that automatically splits 30+ min videos into viral clips with dynamic <strong>5-second Part # and Title intro overlays</strong>.
</p>

---

## ? Features Overview

### 1. ?? Long Video Auto-Clipper (30+ Min to Shorts/Clips)
- **Engineered for Long Content**: Upload 30+ minute or 1 hour+ podcasts, gameplay, streams, webinars, tutorials, or meetings.
- **Duration Configuration ($\ge 30\text{s}$)**:
  - Presets: `30s` (Minimum enforced), `45s`, `60s (TikTok/Shorts)`, `90s (Reels)`, `2 min`, `3 min`, `5 min`, or custom seconds ($\ge 30\text{s}$).
  - Live estimation of total parts generated (e.g. 30-min video with 60s clips = 30 clips).
- **Dynamic 5-Second Part # & Title Intro Overlay**:
  - Automatically burned into the first 5 seconds ($0\text{s} - 5\text{s}$) of each clip.
  - Features: **Part Number** (e.g. `PART 01 / 30`), **Video Title**, and optional Call-to-Action (`?? Follow for Part 2`).
  - **5 Pre-designed Templates**:
    1. *Viral TikTok / Shorts* (Vibrant neon glow & glass pill badge)
    2. *Cinematic Lower Third* (Dark frosted glass with accent vertical bar)
    3. *Cyberpunk Neon* (Dual-color gradient borders & futuristic brackets)
    4. *Minimal Clean* (Crisp typography with drop shadow)
    5. *Center Stage Bumper* (Centered hero title card with smooth fade-out)
  - Customizable screen position (Top, Center, Lower Third, Bottom), font size scaling, and accent colors.
- **Interactive Preview Player**: Live video player showing the animated 5-second dynamic title intro rendered in real-time with an active countdown timer.
- **Batch Export**: Export single clips or batch download all clips bundled into a structured `.zip` archive.

---

### 2. ??? Smart Image Compressor
- **Multi-format Batch Processing**: Drag & drop multiple images (PNG, JPEG, WebP, AVIF, GIF, SVG).
- **Compression Level Selector**:
  - `Low — best quality` (92% quality, 100% scale)
  - `Medium — recommended` (80% quality, 100% scale)
  - `High — smaller file` (60% quality, 85% scale)
  - `Extreme — smallest file` (40% quality, 65% scale)
  - `Custom — manual slider` (1% – 100% quality factor)
- **Interactive Split Comparison Slider**: Inspect visual sharpness before & after compression side-by-side.
- **Output Formats**: Convert to WebP, AVIF, JPEG, or PNG with instant file size and bandwidth savings stats.
- **Export Options**: Download individual images or batch download all as `.zip`.

---

### 3. ?? Video Compressor & Optimizer
- **Adaptive Proportional Compression**: Bitrate dynamically scales relative to source file size for genuine reductions (up to 85%+ smaller):
  - `Medium — recommended` (~50% size reduction)
  - `High — smaller file` (~70% size reduction + 480p downscaling)
  - `Extreme — smallest file` (~85%+ size reduction + 360p downscaling)
  - `Low — best quality` (~30% size reduction + full resolution)
- **Custom Target Size (MB)**: Set exact desired file size (e.g., `0.5 MB`, `1.0 MB`, `5 MB`) and the engine automatically calculates the exact optimal bitrate.
- **Target App Limit Presets**:
  - `Tiny Web (1 MB)`
  - `Discord Free (8 MB)`
  - `WhatsApp (16 MB)`
  - `Discord (25 MB)`
- **Audio Options**: Strip/mute audio or adjust audio bitrates for maximum video file savings.

---

## ?? 100% Client-Side Privacy & Zero-Upload Lag
All media processing (video transcoding, canvas intro rendering, image compression, and zip packaging) happens **directly in your browser** using hardware acceleration (`MediaRecorder`, `OffscreenCanvas`, `AudioContext`, and `WebCodecs`).
- **No file size upload limits**.
- **No data is uploaded to any external server**.
- **Instant processing with zero network latency**.

---

## ?? Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- `npm` or `pnpm` or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/mraheem971/tool.git

# Navigate into the project folder
cd tool

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

Open your browser and visit:
?? **`http://localhost:3000/`**

### Building for Production

```bash
# Build optimized production assets
npm run build

# Preview production build locally
npm run preview
```

---

## ??? Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Batch Archiving**: [JSZip](https://stuk.github.io/jszip/)
- **Confetti Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## ?? Project Structure

```
tool/
+-- index.html
+-- package.json
+-- vite.config.js
+-- tailwind.config.js
+-- postcss.config.js
+-- src/
¦   +-- main.jsx
¦   +-- App.jsx
¦   +-- index.css
¦   +-- components/
¦   ¦   +-- Navbar.jsx
¦   ¦   +-- ImageCompressor/
¦   ¦   ¦   +-- ImageCompressor.jsx
¦   ¦   ¦   +-- ComparisonSlider.jsx
¦   ¦   ¦   +-- ImageSettings.jsx
¦   ¦   +-- VideoCompressor/
¦   ¦   ¦   +-- VideoCompressor.jsx
¦   ¦   ¦   +-- VideoSettings.jsx
¦   ¦   +-- VideoClipper/
¦   ¦       +-- VideoClipper.jsx
¦   ¦       +-- ClipDurationSelector.jsx
¦   ¦       +-- OverlayCustomizer.jsx
¦   ¦       +-- ClipTimelineGrid.jsx
¦   ¦       +-- ClipPreviewPlayer.jsx
¦   ¦       +-- BatchExportModal.jsx
¦   +-- services/
¦   ¦   +-- imageProcessor.js        # Canvas image compressor & format converter
¦   ¦   +-- videoCompressorEngine.js # Adaptive bitrate & resolution video optimizer
¦   ¦   +-- videoClipperEngine.js    # Long-form video splitter & 5s intro renderer
¦   ¦   +-- zipExporter.js           # Multi-file ZIP packaging & download utility
¦   +-- utils/
¦       +-- canvasOverlay.js         # 5-second dynamic title & part # canvas templates
¦       +-- formatters.js            # Time & byte formatting helpers
¦       +-- sampleMedia.js           # Synthetic demo video & image generators
```

---

## ?? License

This project is licensed under the [MIT License](LICENSE).
