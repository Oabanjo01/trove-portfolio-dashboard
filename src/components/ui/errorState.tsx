import { IconAlert, IconRefresh } from "./icons";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-line bg-surface px-6 py-12 text-center"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-loss/10 text-loss">
        <IconAlert className="h-6 w-6" />
      </span>

      <div>
        <h2 className="text-sm font-semibold text-ink">
          Something went wrong
        </h2>
        <p className="mt-1 text-sm text-muted">{message}</p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <IconRefresh className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
