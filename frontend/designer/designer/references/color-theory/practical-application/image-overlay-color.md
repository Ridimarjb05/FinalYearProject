# Image Overlay Color (Scrim)

**Keywords:** Hero-header, text-on-image, legibility, gradient.

**Description:**
Placing text directly on a photo is risky because photos have unpredictable light/dark spots. A "Scrim" or overlay ensures text is always readable.

## Usage

### 1. The Black Fade
A simple linear gradient from Black (50% opacity) to Transparent.
*   Place this *behind* the text but *in front* of the image.

### 2. The Color Tint
Instead of black, use your Brand Color (e.g., Navy Blue) at 80% opacity over the entire image.
*   *Pros:* Great for branding, makes any photo look consistent.
*   *Cons:* Hides the details of the photo.

### 3. Soft Shadow
Adding `text-shadow: 0 2px 4px rgba(0,0,0,0.5)` can help text pop off a busy background without a heavy overlay.
