import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { IconEye, IconEyeOff } from "../components/ui/icons";

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses =
  "w-full rounded-xl border border-transparent bg-fill px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-primary focus:bg-surface";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email.trim()) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    setLoading(true);

    try {
      await login();
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 font-sans"
      style={{
        backgroundColor: "#f5f1ee",
        backgroundImage:
          "radial-gradient(60% 60% at 0% 0%, rgba(5, 154, 131, 0.12), transparent 70%), radial-gradient(60% 60% at 100% 100%, rgba(5, 154, 131, 0.12), transparent 70%)",
      }}
    >
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
            T
          </span>
          <h1 className="mt-4 text-xl font-semibold text-ink">Welcome back</h1>
          <p className="mt-1 text-sm text-muted">Sign in to your account</p>
        </div>

        {/* noValidate so our inline validation runs instead of the
            browser's native email tooltip */}
        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-medium text-muted"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : undefined}
              className={inputClasses}
            />
            {emailError && (
              <p id="email-error" className="mt-1.5 text-xs text-loss">
                {emailError}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-medium text-muted"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? "password-error" : undefined}
                className={`${inputClasses} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-faint transition-colors hover:text-ink"
              >
                {showPassword ? (
                  <IconEyeOff className="h-4 w-4" />
                ) : (
                  <IconEye className="h-4 w-4" />
                )}
              </button>
            </div>
            {passwordError && (
              <p id="password-error" className="mt-1.5 text-xs text-loss">
                {passwordError}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <div className="mt-6 border-t border-line pt-5 text-center">
          <p className="text-xs text-faint">Don't have an account?</p>
          <button
            type="button"
            className="mt-3 w-full rounded-xl border border-line py-2.5 text-sm font-medium text-ink transition-colors hover:bg-fill"
          >
            Create a Trove account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
