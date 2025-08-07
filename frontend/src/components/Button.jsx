import clsx from 'clsx';

const base =
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors';

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary',
  ghost:
    'bg-transparent text-primary hover:bg-primary/10 focus:ring-primary',
};

export default function Button({
  variant = 'primary',
  isLoading = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={clsx(base, variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}
