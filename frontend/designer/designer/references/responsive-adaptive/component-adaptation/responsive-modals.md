# Responsive Modals

**Keywords:** Dialog, Popup, Bottom Sheet, Fullscreen.

**Description:**
Modals that behave as centered popups on desktop but become fullscreen views or bottom sheets on mobile to maximize usability.

## Usage

### 1. Centered vs Fullscreen
Simplest adaptation.

```css
.modal {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%; /* Mobile: Fullscreen */
}

.modal-content {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

@media (min-width: 768px) {
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.5); /* Overlay */
  }
  .modal-content {
    width: 600px;
    height: auto;
    border-radius: 8px;
  }
}
```
