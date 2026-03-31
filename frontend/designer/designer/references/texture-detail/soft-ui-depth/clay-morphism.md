# Claymorphism

**Keywords:** 3D, Cartoon, Friendly, Inflated.

**Description:**
A style combining inner shadows, rounded corners, and bright colors to look like 3D clay models.

## Usage

### 1. The Clay Look
Background color + large inset shadow + drop shadow.

```css
.clay-card {
  background-color: #f76767;
  border-radius: 30px;
  box-shadow:
    inset -10px -10px 20px rgba(0,0,0,0.2), /* Inner shade */
    inset 10px 10px 20px rgba(255,255,255,0.4), /* Inner highlight */
    0 10px 20px rgba(0,0,0,0.2); /* Drop shadow */
}
```
