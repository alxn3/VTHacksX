import { MouseEventHandler, ReactNode } from 'react';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
};
const OutlineButton = ({ onClick, className, children }: Props) => {
  return <button className={`rounded-full border-2 p-[.5rem_1rem] border-primary-300 text-primary-300 hover:bg-primary-300 hover:text-white dark:hover:text-black transition-colors ${className || ""}`} onClick={onClick}>{children}</button>;
};

export default OutlineButton;
