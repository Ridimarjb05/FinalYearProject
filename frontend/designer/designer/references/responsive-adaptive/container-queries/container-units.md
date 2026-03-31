# Container Units

**Keywords:** CQW, CQH, Relative Units.

**Description:**
Units that are relative to the container's size, similar to `vw` / `vh` but for the container context.

## Usage

### 1. cqw (Container Query Width)
1cqw = 1% of the query container's width.

```css
.hero-text {
  /* Font size scales with the container, not viewport */
  font-size: 5cqw;
}
```

### 2. Aspect Ratio with cqw
Creating a square based on container width.

```css
.square-box {
  width: 50cqw;
  height: 50cqw;
}
```
