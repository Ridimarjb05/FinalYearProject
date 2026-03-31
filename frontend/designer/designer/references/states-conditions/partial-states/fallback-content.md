# Fallback Content

**Keywords:** Default, Backup.

**Description:**
Content shown when the primary content fails or is missing.

## Usage

### 1. Avatar Fallback
Showing initials if no image.

```jsx
<Avatar>
  <Image src={user.image} />
  <Fallback>{user.initials}</Fallback>
</Avatar>
```
