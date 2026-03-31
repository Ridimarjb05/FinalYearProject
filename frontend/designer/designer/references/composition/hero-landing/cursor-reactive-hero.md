# Cursor Reactive Hero

**Keywords:** Interactive, Mouse move, Parallax, Follower.

**Description:**
Background elements or the entire composition shifts slightly based on the mouse position, creating a feeling of "looking around" or 3D depth.

## Usage

### 1. JS Mouse Tracking
Mapping X/Y to Transform.

```javascript
/* 
   On mousemove:
   const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10px
   const y = (e.clientY / window.innerHeight - 0.5) * 20;
   
   layer.style.transform = `translate(${x}px, ${y}px)`;
   
   // Inverse motion for background creates depth!
   bg.style.transform = `translate(${-x}px, ${-y}px)`;
*/
```
