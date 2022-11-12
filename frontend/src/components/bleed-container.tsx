import { ReactNode } from 'react';

type Props = {
  className?: string;
  children?: ReactNode;
};

const BleedContainer = ({ className, children }: Props) => {
  return (
    <div
      className={`bg-primary-400/50 shadow-primary-400/50 shadow-[0_0_0_100vmax] ${
        className || ''
      }`}
      style={{ clipPath: 'inset(0 -100vmax)' }}
    >
      {children}
    </div>
  );
};

export default BleedContainer;
