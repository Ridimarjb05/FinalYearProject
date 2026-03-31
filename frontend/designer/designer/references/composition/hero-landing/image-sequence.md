# Image Sequence (Scroll)

**Keywords:** Scrollytelling, Scrubbing, Frame-by-frame, Product rotation.

**Description:**
As the user scrolls, the image updates through a sequence of frames (like a video being scrubbed). Famous from Apple product pages (e.g., AirPods case opening).

## Usage

### 1. Canvas + RequestAnimationFrame
Drawing the current frame to a canvas based on scroll percentage.

```javascript
const canvas = document.getElementById('hero-canvas');
const context = canvas.getContext('2d');
const frameCount = 148;
const currentFrame = index => `images/frame_${index.toString().padStart(4, '0')}.jpg`;

const images = [];
const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }
};

window.addEventListener('scroll', () => {  
  const scrollTop = document.documentElement.scrollTop;
  const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => context.drawImage(images[frameIndex], 0, 0));
});

preloadImages();
```
