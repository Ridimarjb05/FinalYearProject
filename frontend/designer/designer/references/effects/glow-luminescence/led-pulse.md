# LED Pulse

**Keywords:** Breathing, Status, Electronic, Indicator, Standby.

**Description:**
A smooth, rhythmic increase and decrease in brightness, often used to indicate a "standby" or "active" state on electronics.

## Usage

### 1. CSS Animation
Simple opacity or color interpolation.

```css
.led-indicator {
  width: 10px; height: 10px;
  background-color: #00ff00;
  border-radius: 50%;
  box-shadow: 0 0 5px #00ff00;
  animation: breathe 3s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { opacity: 0.4; box-shadow: 0 0 2px #00ff00; }
  50% { opacity: 1; box-shadow: 0 0 10px #00ff00; }
}
```
