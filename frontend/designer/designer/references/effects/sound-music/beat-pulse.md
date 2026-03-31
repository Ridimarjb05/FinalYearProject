# Beat Pulse

**Keywords:** Kick, Bass, Thump, Heartbeat, Zoom.

**Description:**
A UI element (like a play button or album art) scaling up slightly on every kick drum hit.

## Usage

### 1. JS Detection
Simple: `if (volume > threshold) scale = 1.1`.
Complex: Detect peaks in low frequency bands (20Hz - 150Hz).
Decay the scale smoothly back to 1.
