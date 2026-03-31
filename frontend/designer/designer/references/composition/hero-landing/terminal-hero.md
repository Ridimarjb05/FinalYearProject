# Terminal Hero

**Keywords:** CLI, Console, Hacker, Monospace, Green text.

**Description:**
Mimics a command-line interface. Text appears to be typed, colors are usually green/amber on black cursor prompts are visible.

## Usage

### 1. Styling
The aesthetic.

```html
<div class="bg-black min-h-screen text-green-500 font-mono p-8 text-lg">
    <div class="mb-4">
        <span class="text-blue-400">user@host</span>:<span class="text-blue-200">~</span>$ init-sequence --force
    </div>
    
    <div class="mb-4 opacity-80">
        Loading modules...<br>
        > Core: [OK]<br>
        > UI: [OK]<br>
        > Graphics: [OK]
    </div>

    <div class="mt-8 typing-effect border-r-2 border-green-500 animate-pulse inline-block">
        Welcome into the matrix.
    </div>
</div>
```
