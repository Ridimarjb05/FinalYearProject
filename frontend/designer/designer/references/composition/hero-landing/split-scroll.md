# Split Scroll

**Keywords:** Multi-speed scroll, Parallax columns.

**Description:**
The page is split vertically. As the user scrolls, the left side (images) moves at a different speed than the right side (text), or they move in opposite directions.

## Usage

### 1. JS Transform
Listening to scroll and updating transforms separately.

```javascript
/* 
   Left Col: transform: translateY(-scrollY * 0.5 px)
   Right Col: transform: translateY(-scrollY * 1.2 px)
*/
```
