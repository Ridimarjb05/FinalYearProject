# Waveform

**Keywords:** Audio, Oscilloscope, Line, Sound, Signal.

**Description:**
A specialized line graph that shows the amplitude of sound over time.

## Usage

### 1. Canvas AnalyserNode
Read `analyser.getByteTimeDomainData(dataArray)`.
Loop through array, mapping `v` to `y` position.
Draw lines connecting points.

```javascript
ctx.beginPath();
for(let i = 0; i < bufferLength; i++) {
   let v = dataArray[i] / 128.0;
   let y = v * height / 2;
   if(i === 0) ctx.moveTo(x, y);
   else ctx.lineTo(x, y);
   x += sliceWidth;
}
ctx.stroke();
```
