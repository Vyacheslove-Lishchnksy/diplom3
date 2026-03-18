import { JSX } from "react";

export type IHeaderProps = React.HTMLAttributes<HTMLHeadingElement>;

const HeaderUI = ({ children }: IHeaderProps): JSX.Element => {
  return (
    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-5xl">
      {children}
    </h1>
  );
};

export default HeaderUI;
