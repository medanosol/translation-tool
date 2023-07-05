import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "font-medium inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-sky-50 text-sky-500 shadow-[0_2px_10px] shadow-black/10 hover:bg-sky-50 disabled:bg-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
