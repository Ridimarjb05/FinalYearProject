# Sync Conflict

**Keywords:** Merge Conflict, Version Mismatch.

**Description:**
Two clients changed the same data.

## Usage

### 1. Resolution Modal
Ask the user which version to keep (Local vs Cloud).

```html
<div class="conflict-modal">
  <h3>Version Conflict</h3>
  <div class="col">Local: "Title A"</div>
  <div class="col">Cloud: "Title B"</div>
  <button>Keep Local</button>
</div>
```
