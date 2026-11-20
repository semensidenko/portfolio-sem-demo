import { useId } from "react";
import type { InputHTMLAttributes } from "react";

export interface FormFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "size"> {
  /** Підпис над полем. Обов'язковий: поле без підпису не зрозуміле ні людині, ні скрінрідеру. */
  label: string;
  /** Тип поля: `text`, `email`, `tel` тощо. */
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  /** Початкове значення. Непорожнє значення — стан «заповнене». */
  defaultValue?: string;
  /** Підказка всередині порожнього поля. Не замінює підпис. */
  placeholder?: string;
  /** Поле з помилкою: межа й текст під полем кольору `danger`, іконка помилки. */
  error?: boolean;
  /** Текст помилки під полем. Показується лише разом з `error`. */
  errorMessage?: string;
  /** Поле недоступне: сіре, не редагується, не потрапляє у фокус. */
  disabled?: boolean;
}

const inputBase =
  "w-full rounded-control border px-6 py-3 text-body placeholder:text-ink-muted transition-colors motion-reduce:transition-none focus:outline-2 focus:outline-offset-2";

const inputStates = {
  default: "border-ink-muted bg-canvas text-ink hover:border-ink focus:outline-accent",
  error: "border-danger bg-canvas text-ink focus:outline-danger",
  disabled: "cursor-not-allowed border-line bg-surface text-ink-muted",
};

function ErrorIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="size-4 shrink-0">
      <path
        fillRule="evenodd"
        d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm-.75 3.5h1.5v5.5h-1.5V3.5Zm0 7h1.5V12h-1.5v-1.5Z"
      />
    </svg>
  );
}

/**
 * Текстове поле з підписом над ним. Для форми запиту на проєкт:
 * ім'я, email або Telegram. Помилка показується під полем текстом і іконкою.
 */
export function FormField({
  label,
  type = "text",
  error = false,
  errorMessage,
  disabled = false,
  id,
  className,
  "aria-describedby": describedBy,
  ...rest
}: FormFieldProps) {
  const autoId = useId();
  const inputId = id ?? `${autoId}-input`;
  const errorId = `${autoId}-error`;
  const showError = error && !disabled;
  const showErrorMessage = showError && Boolean(errorMessage);

  const ariaDescribedBy =
    [describedBy, showErrorMessage ? errorId : undefined].filter(Boolean).join(" ") || undefined;

  const state = disabled ? "disabled" : showError ? "error" : "default";

  return (
    <div className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}>
      <label
        htmlFor={inputId}
        className={`text-body ${disabled ? "text-ink-muted" : "text-ink"}`}
      >
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        disabled={disabled}
        aria-invalid={showError || undefined}
        aria-describedby={ariaDescribedBy}
        className={`${inputBase} ${inputStates[state]}`}
        {...rest}
      />
      {showErrorMessage && (
        <p id={errorId} className="flex items-center gap-2 text-caption text-danger">
          <ErrorIcon />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
}
