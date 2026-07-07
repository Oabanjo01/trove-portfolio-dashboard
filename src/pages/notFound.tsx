import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-page px-4 font-sans text-center">
      <p className="text-6xl font-semibold text-primary">404</p>
      <div>
        <h1 className="text-lg font-semibold text-ink">Page not found</h1>
        <p className="mt-1 text-sm text-muted">
          The page you're looking for doesn't exist or was moved.
        </p>
      </div>

      <Link
        to="/"
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
