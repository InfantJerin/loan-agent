export function KeyboardHints() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white/95 backdrop-blur px-4 py-1.5 flex items-center gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
        <span>Search</span>
      </div>
      <div className="flex items-center gap-1.5">
        <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">⌘/</kbd>
        <span>AI Assistant</span>
      </div>
      <div className="flex items-center gap-1.5">
        <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">↑↓</kbd>
        <span>Navigate</span>
      </div>
      <div className="flex items-center gap-1.5">
        <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Enter</kbd>
        <span>Select</span>
      </div>
    </div>
  )
}
