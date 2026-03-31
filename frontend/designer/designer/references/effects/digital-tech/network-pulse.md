# Network Pulse

**Keywords:** Graph, Nodes, Connections, IoT, Data.

**Description:**
A graph of connected nodes where "packets" of light travel along the connecting lines.

## Usage

### 1. Canvas / SVG
Draw nodes (circles) and links (lines).
Animate small circles traveling along the link paths.

```javascript
// Packet logic
let t = (time + offset) % 1;
let x = lerp(nodeA.x, nodeB.x, t);
let y = lerp(nodeA.y, nodeB.y, t);
drawPacket(x, y);
```
