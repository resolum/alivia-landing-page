export function initHeroAnimation(): () => void {
  const TOTAL_FRAMES = 240;
  const canvas = document.getElementById("hero-canvas") as HTMLCanvasElement | null;
  const scrollTrack = document.getElementById("scroll-track");
  const resetScrollBtn = document.getElementById("reset-scroll-btn");

  if (!canvas || !scrollTrack) return () => {};

  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const card1 = document.getElementById("story-card-1");
  const card2 = document.getElementById("story-card-2");
  const card3 = document.getElementById("story-card-3");
  const card4 = document.getElementById("story-card-4");

  const images: HTMLImageElement[] = [];
  let targetFrame = 0;
  let currentFrame = 0;
  let isAutoplay = false;
  let rafId: number | null = null;
  let lastRenderedFrame = -1;

  const getFrameUrl = (index: number) => {
    const paddedIndex = String(index).padStart(3, "0");
    return `/hero/ezgif-frame-${paddedIndex}.png`;
  };

  const renderFrame = (frameIndex: number) => {
    if (!ctx) return;
    let img = images[frameIndex];

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let j = frameIndex - 1; j >= 0; j--) {
        if (images[j] && images[j].complete && images[j].naturalWidth > 0) {
          img = images[j];
          break;
        }
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let j = frameIndex + 1; j < TOTAL_FRAMES; j++) {
        if (images[j] && images[j].complete && images[j].naturalWidth > 0) {
          img = images[j];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;

    ctx.clearRect(0, 0, canvasW, canvasH);

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const imgRatio = imgW / imgH;
    const canvasRatio = canvasW / canvasH;

    let drawW: number, drawH: number, offsetX: number, offsetY: number;

    if (canvasRatio > imgRatio) {
      drawW = canvasW;
      drawH = canvasW / imgRatio;
      offsetX = 0;
      offsetY = (canvasH - drawH) / 2;
    } else {
      drawH = canvasH;
      drawW = canvasH * imgRatio;
      offsetX = canvasH * imgRatio > canvasW ? (canvasW - (canvasH * imgRatio)) / 2 : (canvasW - drawW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  };

  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    renderFrame(Math.round(currentFrame));
  };

  const getScrollProgress = () => {
    if (!scrollTrack) return 0;
    const rect = scrollTrack.getBoundingClientRect();
    const totalScrollableHeight = rect.height - window.innerHeight;
    if (totalScrollableHeight <= 0) return 0;

    const scrollY = -rect.top;
    return Math.max(0, Math.min(1, scrollY / totalScrollableHeight));
  };

  const updateOverlayCards = (progress: number) => {
    let maskFactor = 0;
    if (progress > 0.88) {
      maskFactor = Math.min(1, (progress - 0.88) / 0.12);
    }
    const maskStop = 100 - maskFactor * 35;
    canvas.style.setProperty("--mask-stop", `${maskStop}%`);

    if (card1) {
      if (progress <= 0.22) {
        card1.style.opacity = "1";
        card1.style.transform = "translateY(0px)";
      } else {
        card1.style.opacity = "0";
        card1.style.transform = "translateY(20px)";
      }
    }

    if (card2) {
      if (progress >= 0.25 && progress <= 0.48) {
        card2.style.opacity = "1";
        card2.style.transform = "translateY(0px)";
      } else {
        card2.style.opacity = "0";
        card2.style.transform = "translateY(20px)";
      }
    }

    if (card3) {
      if (progress >= 0.52 && progress <= 0.75) {
        card3.style.opacity = "1";
        card3.style.transform = "translateY(0px)";
      } else {
        card3.style.opacity = "0";
        card3.style.transform = "translateY(20px)";
      }
    }

    if (card4) {
      if (progress >= 0.78) {
        card4.style.opacity = "1";
        card4.style.transform = "translateY(0px)";
      } else {
        card4.style.opacity = "0";
        card4.style.transform = "translateY(20px)";
      }
    }
  };

  const animateLoop = () => {
    rafId = requestAnimationFrame(animateLoop);

    if (!isAutoplay) {
      const progress = getScrollProgress();
      targetFrame = progress * (TOTAL_FRAMES - 1);
      updateOverlayCards(progress);
    } else {
      targetFrame += 0.4;
      if (targetFrame >= TOTAL_FRAMES - 1) {
        targetFrame = 0;
      }
      const synthProgress = targetFrame / (TOTAL_FRAMES - 1);
      updateOverlayCards(synthProgress);
    }
    currentFrame += (targetFrame - currentFrame) * 0.12;

    const frameToDraw = Math.round(currentFrame);
    if (frameToDraw !== lastRenderedFrame) {
      renderFrame(frameToDraw);
      lastRenderedFrame = frameToDraw;
    }
  };

  const handleResetScroll = () => {
    isAutoplay = false;
    window.scrollTo({
      top: scrollTrack.offsetTop,
      behavior: "smooth",
    });
  };

  window.addEventListener("resize", resizeCanvas, { passive: true });
  if (resetScrollBtn) {
    resetScrollBtn.addEventListener("click", handleResetScroll);
  }

  // Preload images and start loop
  resizeCanvas();
  rafId = requestAnimationFrame(animateLoop);

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFrameUrl(i + 1);
    img.onload = () => {
      images[i] = img;
      if (i === 0) {
        renderFrame(0);
      }
    };
    images.push(img);
  }

  // Cleanup handler for View Transitions / unmounting
  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resizeCanvas);
    if (resetScrollBtn) resetScrollBtn.removeEventListener("click", handleResetScroll);
  };
}
