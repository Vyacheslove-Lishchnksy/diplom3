import { JSX } from "react";
import styles from "./input.module.scss";

interface InputUIProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
}

const InputUI = ({
  icon,
  className,
  style,
  ...rest
}: InputUIProps): JSX.Element => {
  return (
    <div
      className={`relative p-0 px-2 border border-green-100 rounded ${className} ${styles.wrapper}`}
      style={style}
    >
      <input
        className={`w-full m-0 border-none bg-transparent ${styles.input}`}
        type="text"
        {...rest}
      />
      <div
        style={{
          position: "absolute",
          top: "4px",
          right: "6px",
        }}
        className="text-gray-600"
      >
        {icon}
      </div>
    </div>
  );
};

export default InputUI;
