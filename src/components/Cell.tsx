import { ReactNode } from "react";

type CellProps = {
  children?: ReactNode;
  onClick: () => void;
};

const Cell = ({ children, onClick }: CellProps) => {
  return (
    <div
      className={`flex h-32 w-32 items-center justify-center border border-white text-4xl text-white ${
        children ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Cell;
