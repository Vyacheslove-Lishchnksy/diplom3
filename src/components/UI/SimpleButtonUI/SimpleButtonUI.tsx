import style from "./SimpleButtonUI.module.scss";

export type SimpleButtonUIProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SimpleButtonUI = ({
  children,
  className,
  ...rest
}: SimpleButtonUIProps) => {
  return (
    <button className={`${style.simpleButton} ${className}`} {...rest}>
      {children}
    </button>
  );
};
