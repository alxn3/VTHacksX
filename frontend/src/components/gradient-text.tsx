import { ReactNode } from "react"

type Props = {
    className?: string;
    children?: ReactNode;
}


const GradientText = ({className, children} : Props) => {
  return (
    <p className={`text-transparent bg-clip-text bg-gradient-to-br from-primary-800 via-primary-300 to-primary-100 pb-[.25em] mb-[-.25em] ${className || ""}`}>{children}</p>
  )
}

export default GradientText