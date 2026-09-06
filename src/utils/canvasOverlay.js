/**
 * Canvas Overlay Rendering Engine
 * Renders dynamic 5-second Title and Part Number overlays with rich templates and animations
 */

export const OVERLAY_TEMPLATES = [
  {
    id: 'viral_tiktok',
    name: 'Viral TikTok / Shorts',
    description: 'Punchy gradient pill with bold part number and vibrant glow',
    accentColor: '#06B6D4',
    secondaryColor: '#8B5CF6',
    bgColor: 'rgba(15, 23, 42, 0.88)'
  },
  {
    id: 'cinematic_lower_third',
    name: 'Cinematic Lower Third',
    description: 'Sleek dark frosted glass bar with neon accent line',
    accentColor: '#10B981',
    secondaryColor: '#06B6D4',
    bgColor: 'rgba(10, 15, 29, 0.92)'
  },
  {
    id: 'cyberpunk_neon',
    name: 'Cyberpunk Neon',
    description: 'Electric cyan & magenta borders with futuristic badge',
    accentColor: '#EC4899',
    secondaryColor: '#06B6D4',
    bgColor: 'rgba(5, 5, 15, 0.94)'
  },
  {
    id: 'minimal_clean',
    name: 'Minimal Clean',
    description: 'Sleek modern typography with subtle drop-shadow',
    accentColor: '#38BDF8',
    secondaryColor: '#F59E0B',
    bgColor: 'rgba(17, 24, 39, 0.85)'
  },
  {
    id: 'center_stage',
    name: 'Center Stage Bumper',
    description: 'Bold centered hero title banner with smooth pop-in',
    accentColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    bgColor: 'rgba(13, 17, 23, 0.90)'
  }
];

export const OVERLAY_POSITIONS = [
  { id: 'top', label: 'Top Banner' },
  { id: 'center', label: 'Centered' },
  { id: 'lower_third', label: 'Lower Third' },
  { id: 'bottom', label: 'Bottom Banner' }
];

export const OVERLAY_ANIMATIONS = [
  { id: 'fade', label: 'Smooth Fade' },
  { id: 'slide', label: 'Slide In / Out' },
  { id: 'pop', label: 'Pop & Scale' }
];

/**
 * Calculates current overlay opacity and transform based on elapsed time within clip
 * @param {number} timeInClip Current playback time relative to clip start (seconds)
 * @param {number} duration Total duration of overlay in seconds (default 5.0s)
 * @param {string} animType Animation type ('fade', 'slide', 'pop')
 */
export function getOverlayAnimationState(timeInClip, duration = 5.0, animType = 'fade') {
  if (timeInClip < 0 || timeInClip > duration) {
    return { visible: false, opacity: 0, translateY: 0, scale: 1 };
  }

  const fadeInEnd = 0.5; // 0.5s fade in
  const fadeOutStart = duration - 0.7; // fade out during last 0.7s

  let opacity = 1;
  let progress = 0; // 0 to 1

  if (timeInClip < fadeInEnd) {
    progress = timeInClip / fadeInEnd;
    opacity = Math.max(0, Math.min(1, progress));
  } else if (timeInClip > fadeOutStart) {
    progress = (duration - timeInClip) / (duration - fadeOutStart);
    opacity = Math.max(0, Math.min(1, progress));
  } else {
    opacity = 1;
    progress = 1;
  }

  let translateY = 0;
  let scale = 1;

  if (animType === 'slide') {
    translateY = (1 - progress) * (timeInClip < fadeInEnd ? -20 : 20);
  } else if (animType === 'pop') {
    scale = 0.85 + (progress * 0.15);
  }

  return {
    visible: true,
    opacity,
    translateY,
    scale,
    timeRemaining: Math.max(0, duration - timeInClip)
  };
}

/**
 * Main draw function to render 5-second intro overlay onto a 2D canvas context
 */
export function drawIntroOverlay(ctx, width, height, options) {
  const {
    timeInClip = 0,
    duration = 5.0,
    partNumber = 1,
    totalParts = 1,
    title = 'Untitled Video',
    subtitle = 'Follow for next part',
    template = 'viral_tiktok',
    position = 'top',
    animation = 'fade',
    customAccent = null,
    fontSizeMultiplier = 1.0,
    showPartCounter = true,
    showSubtitle = true
  } = options;

  const anim = getOverlayAnimationState(timeInClip, duration, animation);
  if (!anim.visible || anim.opacity <= 0) return;

  const tpl = OVERLAY_TEMPLATES.find(t => t.id === template) || OVERLAY_TEMPLATES[0];
  const accent = customAccent || tpl.accentColor;
  const secondary = tpl.secondaryColor;

  ctx.save();
  ctx.globalAlpha = anim.opacity;

  // Responsive scaling factor based on canvas resolution (normalized to 1920x1080)
  const baseScale = Math.min(width / 1280, height / 720) * fontSizeMultiplier;
  const scale = Math.max(0.6, Math.min(2.0, baseScale));

  // Determine Box Placement
  let posX = width / 2;
  let posY = 80 * scale;

  if (position === 'top') {
    posY = Math.max(50 * scale, height * 0.1);
  } else if (position === 'center') {
    posY = height / 2;
  } else if (position === 'lower_third') {
    posY = height * 0.78;
  } else if (position === 'bottom') {
    posY = height * 0.88;
  }

  posY += anim.translateY * scale;

  ctx.translate(posX, posY);
  if (anim.scale !== 1) {
    ctx.scale(anim.scale, anim.scale);
  }

  // Draw template specific styles
  switch (template) {
    case 'viral_tiktok':
      drawViralTikTokTemplate(ctx, { partNumber, totalParts, title, subtitle, accent, secondary, scale, showPartCounter, showSubtitle });
      break;
    case 'cinematic_lower_third':
      drawCinematicLowerThird(ctx, { partNumber, totalParts, title, subtitle, accent, secondary, scale, showPartCounter, showSubtitle });
      break;
    case 'cyberpunk_neon':
      drawCyberpunkTemplate(ctx, { partNumber, totalParts, title, subtitle, accent, secondary, scale, showPartCounter, showSubtitle });
      break;
    case 'minimal_clean':
      drawMinimalCleanTemplate(ctx, { partNumber, totalParts, title, subtitle, accent, secondary, scale, showPartCounter, showSubtitle });
      break;
    case 'center_stage':
      drawCenterStageTemplate(ctx, { partNumber, totalParts, title, subtitle, accent, secondary, scale, showPartCounter, showSubtitle });
      break;
    default:
      drawViralTikTokTemplate(ctx, { partNumber, totalParts, title, subtitle, accent, secondary, scale, showPartCounter, showSubtitle });
  }

  ctx.restore();
}

/**
 * Helper to draw rounded rectangle with canvas path
 */
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Template 1: Viral TikTok / Shorts
 */
function drawViralTikTokTemplate(ctx, { partNumber, totalParts, title, subtitle, accent, secondary, scale, showPartCounter, showSubtitle }) {
  const partText = totalParts > 1 ? `PART ${partNumber} / ${totalParts}` : `PART ${partNumber}`;
  
  // Measure texts
  ctx.font = `900 ${Math.round(20 * scale)}px "Montserrat", sans-serif`;
  const partWidth = ctx.measureText(partText).width;

  ctx.font = `800 ${Math.round(28 * scale)}px "Plus Jakarta Sans", sans-serif`;
  const titleWidth = Math.min(ctx.measureText(title).width, 700 * scale);

  ctx.font = `600 ${Math.round(15 * scale)}px "Plus Jakarta Sans", sans-serif`;
  const subWidth = showSubtitle && subtitle ? ctx.measureText(subtitle).width : 0;

  const cardWidth = Math.max(partWidth + 80 * scale, titleWidth + 60 * scale, subWidth + 60 * scale, 360 * scale);
  const cardHeight = (showSubtitle && subtitle ? 115 : 90) * scale;
  const startX = -cardWidth / 2;
  const startY = -cardHeight / 2;

  // Outer Card Shadow & Glow
  ctx.shadowColor = accent;
  ctx.shadowBlur = 25 * scale;
  ctx.shadowOffsetY = 4 * scale;

  // Background
  ctx.fillStyle = 'rgba(11, 15, 25, 0.92)';
  roundRect(ctx, startX, startY, cardWidth, cardHeight, 18 * scale);
  ctx.fill();

  // Gradient Border
  ctx.shadowBlur = 0;
  const grad = ctx.createLinearGradient(startX, startY, startX + cardWidth, startY + cardHeight);
  grad.addColorStop(0, accent);
  grad.addColorStop(0.5, secondary);
  grad.addColorStop(1, accent);
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2.5 * scale;
  ctx.stroke();

  // Part Badge Pill (Top Center)
  if (showPartCounter) {
    const pillW = partWidth + 32 * scale;
    const pillH = 28 * scale;
    const pillX = -pillW / 2;
    const pillY = startY - pillH / 2;

    const pillGrad = ctx.createLinearGradient(pillX, 0, pillX + pillW, 0);
    pillGrad.addColorStop(0, accent);
    pillGrad.addColorStop(1, secondary);

    ctx.fillStyle = pillGrad;
    ctx.shadowColor = accent;
    ctx.shadowBlur = 12 * scale;
    roundRect(ctx, pillX, pillY, pillW, pillH, 14 * scale);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `900 ${Math.round(14 * scale)}px "Montserrat", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(partText, 0, pillY + pillH / 2);
  }

  // Video Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `800 ${Math.round(24 * scale)}px "Plus Jakarta Sans", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const titleY = showPartCounter ? (showSubtitle && subtitle ? startY + 45 * scale : startY + cardHeight / 2 + 5 * scale) : startY + 35 * scale;
  
  // Truncate if too long
  let displayTitle = title;
  if (ctx.measureText(displayTitle).width > cardWidth - 40 * scale) {
    while (ctx.measureText(displayTitle + '...').width > cardWidth - 40 * scale && displayTitle.length > 5) {
      displayTitle = displayTitle.slice(0, -1);
    }
    displayTitle += '...';
  }
  ctx.fillText(displayTitle, 0, titleY);

  // Subtitle / CTA
  if (showSubtitle && subtitle) {
    ctx.fillStyle = '#94A3B8';
    ctx.font = `600 ${Math.round(14 * scale)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(subtitle, 0, startY + 82 * scale);
  }
}

/**
 * Template 2: Cinematic Lower Third
 */
function drawCinematicLowerThird(ctx, { partNumber, totalParts, title, subtitle, accent, secondary, scale, showPartCounter, showSubtitle }) {
  const partText = totalParts > 1 ? `PART ${partNumber} / ${totalParts}` : `PART ${partNumber}`;
  const width = 640 * scale;
  const height = 85 * scale;
  const x = -width / 2;
  const y = -height / 2;

  // Frosted Glass Backdrop
  ctx.fillStyle = 'rgba(8, 12, 22, 0.94)';
  roundRect(ctx, x, y, width, height, 12 * scale);
  ctx.fill();

  // Left Accent Vertical Bar
  ctx.fillStyle = accent;
  ctx.shadowColor = accent;
  ctx.shadowBlur = 12 * scale;
  roundRect(ctx, x, y, 6 * scale, height, 3 * scale);
  ctx.fill();

  ctx.shadowBlur = 0;

  // Content
  const textLeft = x + 24 * scale;
  
  if (showPartCounter) {
    ctx.fillStyle = accent;
    ctx.font = `800 ${Math.round(14 * scale)}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(partText.toUpperCase(), textLeft, y + 16 * scale);
  }

  // Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `800 ${Math.round(22 * scale)}px "Plus Jakarta Sans", sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(title, textLeft, showPartCounter ? y + 36 * scale : y + 22 * scale);

  // Subtitle on Right
  if (showSubtitle && subtitle) {
    ctx.fillStyle = '#94A3B8';
    ctx.font = `600 ${Math.round(13 * scale)}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(subtitle, x + width - 20 * scale, y + height / 2);
  }
}

/**
 * Template 3: Cyberpunk Neon
 */
function drawCyberpunkTemplate(ctx, { partNumber, totalParts, title, subtitle, accent, secondary, scale, showPartCounter, showSubtitle }) {
  const partText = `// PART 0${partNumber} //`;
  const width = 560 * scale;
  const height = 96 * scale;
  const x = -width / 2;
  const y = -height / 2;

  // Cyber Box Cut Corners
  ctx.save();
  ctx.beginPath();
  const cut = 14 * scale;
  ctx.moveTo(x + cut, y);
  ctx.lineTo(x + width - cut, y);
  ctx.lineTo(x + width, y + cut);
  ctx.lineTo(x + width, y + height - cut);
  ctx.lineTo(x + width - cut, y + height);
  ctx.lineTo(x + cut, y + height);
  ctx.lineTo(x, y + height - cut);
  ctx.lineTo(x, y + cut);
  ctx.closePath();

  ctx.fillStyle = 'rgba(6, 9, 20, 0.95)';
  ctx.shadowColor = accent;
  ctx.shadowBlur = 18 * scale;
  ctx.fill();

  ctx.strokeStyle = accent;
  ctx.lineWidth = 2 * scale;
  ctx.stroke();
  ctx.restore();

  // Part Tag Neon
  if (showPartCounter) {
    ctx.fillStyle = secondary;
    ctx.shadowColor = secondary;
    ctx.shadowBlur = 8 * scale;
    ctx.font = `900 ${Math.round(14 * scale)}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(partText, 0, y + 26 * scale);
  }

  // Title
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `900 ${Math.round(24 * scale)}px "Montserrat", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(title.toUpperCase(), 0, showPartCounter ? y + 56 * scale : y + 42 * scale);

  if (showSubtitle && subtitle) {
    ctx.fillStyle = accent;
    ctx.font = `700 ${Math.round(12 * scale)}px "JetBrains Mono", monospace`;
    ctx.fillText(`> ${subtitle}`, 0, y + 80 * scale);
  }
}

/**
 * Template 4: Minimal Clean
 */
function drawMinimalCleanTemplate(ctx, { partNumber, totalParts, title, subtitle, accent, secondary, scale, showPartCounter, showSubtitle }) {
  const partText = `PART ${partNumber}`;
  const width = 480 * scale;
  const height = 80 * scale;
  const x = -width / 2;
  const y = -height / 2;

  ctx.fillStyle = 'rgba(17, 24, 39, 0.88)';
  roundRect(ctx, x, y, width, height, 10 * scale);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1 * scale;
  ctx.stroke();

  if (showPartCounter) {
    ctx.fillStyle = accent;
    ctx.font = `800 ${Math.round(13 * scale)}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(partText, 0, y + 26 * scale);
  }

  ctx.fillStyle = '#F8FAFC';
  ctx.font = `700 ${Math.round(22 * scale)}px "Plus Jakarta Sans", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(title, 0, showPartCounter ? y + 54 * scale : y + 45 * scale);
}

/**
 * Template 5: Center Stage Hero Bumper
 */
function drawCenterStageTemplate(ctx, { partNumber, totalParts, title, subtitle, accent, secondary, scale, showPartCounter, showSubtitle }) {
  const partText = totalParts > 1 ? `PART ${partNumber} OF ${totalParts}` : `PART ${partNumber}`;
  const width = 680 * scale;
  const height = 140 * scale;
  const x = -width / 2;
  const y = -height / 2;

  // Background Box
  const grad = ctx.createRadialGradient(0, 0, 10 * scale, 0, 0, width / 2);
  grad.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
  grad.addColorStop(1, 'rgba(10, 14, 26, 0.90)');

  ctx.fillStyle = grad;
  ctx.shadowColor = accent;
  ctx.shadowBlur = 30 * scale;
  roundRect(ctx, x, y, width, height, 24 * scale);
  ctx.fill();

  // Border
  ctx.shadowBlur = 0;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2 * scale;
  ctx.stroke();

  // Part Tag
  if (showPartCounter) {
    ctx.fillStyle = accent;
    ctx.font = `900 ${Math.round(16 * scale)}px "Montserrat", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(partText, 0, y + 36 * scale);
  }

  // Big Hero Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `900 ${Math.round(32 * scale)}px "Montserrat", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(title, 0, showPartCounter ? y + 78 * scale : y + 60 * scale);

  if (showSubtitle && subtitle) {
    ctx.fillStyle = '#CBD5E1';
    ctx.font = `600 ${Math.round(16 * scale)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(subtitle, 0, y + 114 * scale);
  }
}
