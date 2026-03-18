import { JSX } from "react";

export interface IErrorProps extends React.HTMLAttributes<HTMLHeadingElement> {
  isErrorValue: boolean;
}

export interface IErrorFormat {
  title: string;
  isError: boolean;
}

const ErrorTextUI = ({
  isErrorValue,
  style,
  children,
  ...rest
}: IErrorProps): JSX.Element => {
  return (
    <>
      {isErrorValue ? (
        <p
          className="absolute"
          style={{ color: "red", fontSize: "14px", ...style }}
          {...rest}
        >
          {children}
        </p>
      ) : (
        <></>
      )}
    </>
  );
};

export default ErrorTextUI;
