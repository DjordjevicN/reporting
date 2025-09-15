import { Loader2 } from "lucide-react";

export function FullScreenLoader({ loading = false }: { loading?: boolean }) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
