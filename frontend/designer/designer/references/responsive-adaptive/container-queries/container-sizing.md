# Container Sizing

**Keywords:** Container Queries, Component-Level Responsiveness.

**Description:**
Allowing a component to adapt based on the size of its parent container, rather than the viewport. This makes components truly modular and portable.

## Usage

### 1. Defining the Container
Marking an element as a query container.

```css
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}
```

### 2. Querying the Container
Applying styles based on container width.

```css
@container sidebar (max-width: 300px) {
  .card {
    flex-direction: column; /* Stack if sidebar is narrow */
  }
}
```
