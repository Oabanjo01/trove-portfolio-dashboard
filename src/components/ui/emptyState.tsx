import { IconSearch } from "./icons";

type EmptyStateProps = {
  title: string;
  hint?: string;
};

export function EmptyState({ title, hint }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line px-6 py-10 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fill text-faint">
        <IconSearch className="h-5 w-5" />
      </span>
      <p className="text-sm font-medium text-ink">{title}</p>
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}
