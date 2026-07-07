export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="relative size-12">
        <div className="absolute inset-0 rounded-full border-4 border-accent-cyan/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-accent-cyan" />
      </div>
    </div>
  );
}
