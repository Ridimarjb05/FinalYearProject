# Starfield

**Keywords:** Space, Stars, Twinkle, Parallax, Depth.

**Description:**
A static or slowly moving field of stars. Key aspects are varying sizes (to suggest depth), opacity (twinkling), and layers (parallax).

## Usage

### 1. CSS Box Shadow
A clever trick to generate many stars with one div using multiple box shadows.

```css
/* Generates stars */
@function box-shadow-stars($n) {
  $value: '#{random(2000)}px #{random(2000)}px #FFF';
  @for $i from 2 through $n {
    $value: '#{$value} , #{random(2000)}px #{random(2000)}px #FFF';
  }
  @return unquote($value);
}

.stars-1 {
  width: 1px;
  height: 1px;
  background: white;
  box-shadow: box-shadow-stars(700);
  animation: moveStar 50s linear infinite;
}
```

### 2. Canvas
Draw hundreds of small circles with varying alpha.
