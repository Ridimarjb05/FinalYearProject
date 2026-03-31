# Container Names

**Keywords:** Scoped Queries, Multiple Containers.

**Description:**
Naming containers allows you to query specific ancestors, not just the nearest one. Useful for nested layouts.

## Usage

### 1. Naming
Assigning a name.

```css
.main-layout {
  container-name: main;
  container-type: inline-size;
}

.widget-area {
  container-name: widget;
  container-type: inline-size;
}
```

### 2. Targeting Specific Container
Choosing which container context to use.

```css
@container main (min-width: 800px) {
  /* Styles rely on main layout size */
}

@container widget (max-width: 200px) {
  /* Styles rely on widget area size */
}
```
