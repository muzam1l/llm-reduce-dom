import { ButtonHTMLAttributes, FC } from "react";
import { Spinner } from "./spinner";

type ButtonProps = {
  loading?: boolean;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, loading }) => {
  return (
    <button type="submit" className="button">
      {loading ? <Spinner /> : children}
    </button>
  );
};
