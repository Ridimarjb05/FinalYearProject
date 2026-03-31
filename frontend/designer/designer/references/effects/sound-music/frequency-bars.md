# Frequency Bars

**Keywords:** EQ, Equalizer, Music, Bass, Treble.

**Description:**
Vertical bars that jump up and down based on the volume of specific frequency bands.

## Usage

### 1. Canvas / CSS
Read `analyser.getByteFrequencyData(dataArray)`.
Map array values (0-255) to bar heights.
Use standard linear interpolation (lerp) to smooth the movement down so bars don't jitter too violently.
