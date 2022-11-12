import { MouseEventHandler, ReactNode } from "react";
import OutlineButton from "./outline-button"

type Props = {
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
}

const GradientOutlineButton = ({className, onClick, children} : Props) => {
  return (
    <OutlineButton className={` ${className || ''}`} onClick={onClick}>{children}</OutlineButton>
  )
}

export default GradientOutlineButton