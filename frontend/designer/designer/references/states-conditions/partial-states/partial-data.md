# Partial Data

**Keywords:** Incomplete, Missing Fields.

**Description:**
When an object is loaded, but some non-essential fields are missing.

## Usage

### 1. Hide Empty Fields
If the data isn't there, don't show the label.

```javascript
/* Don't render "Bio:" if bio is null */
{user.bio && <p>Bio: {user.bio}</p>}
```

### 2. Explicit "Unknown"
If the field is critical.

```html
<p>Status: <span class="text-gray-500">Unknown</span></p>
```
