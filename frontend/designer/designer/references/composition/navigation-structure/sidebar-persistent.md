# Sidebar Persistent

**Keywords:** Dashboard, Admin, Fixed Nav, Vertical Navigation.

**Description:**
A fixed vertical column on the left (or right) that remains visible while the main content area scrolls. The standard for complex applications.

## Usage

### 1. Flex Row Layout
The classic approach.

```html
<div class="flex h-screen w-full bg-slate-900 overflow-hidden">
    
    <!-- Sidebar -->
    <aside class="w-64 flex-shrink-0 border-r border-slate-800 flex flex-col">
        <div class="h-16 flex items-center px-6 border-b border-slate-800">Logo</div>
        <nav class="flex-1 overflow-y-auto p-4 space-y-1">
            <!-- Nav Items -->
            <a href="#" class="block px-4 py-2 bg-slate-800 rounded-lg text-white">Dashboard</a>
            <a href="#" class="block px-4 py-2 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-lg">Users</a>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-slate-950 p-8">
        <h1 class="text-3xl font-bold mb-6">Overview</h1>
        <!-- Page Content -->
    </main>
</div>
```
