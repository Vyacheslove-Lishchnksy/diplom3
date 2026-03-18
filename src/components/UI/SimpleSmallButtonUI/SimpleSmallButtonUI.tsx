import { forwardRef } from "react";
import style from "./SimpleSmallButton.module.scss";

export type SimpleSmallButtonUIProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const SimpleSmallButtonUI = forwardRef<
  HTMLButtonElement,
  SimpleSmallButtonUIProps
>(({ className, children, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className={`${style.simpleSmallButton} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});

SimpleSmallButtonUI.displayName = "SimpleSmallButtonUI";

export default SimpleSmallButtonUI;
