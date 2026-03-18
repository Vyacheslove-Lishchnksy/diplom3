export type IButtonUIProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonUI = ({ children, ...rest }: IButtonUIProps) => {
  return (
    <button
      type="button"
      className=" px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2 cursor-pointer justify-center"
      {...rest}
    >
      {children}
    </button>
  );
};
