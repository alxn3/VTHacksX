import { ChangeEventHandler } from "react";

type Props = {
  className?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onEnter?: () => void;
};

const InputBox = ({ className, placeholder, onChange, onEnter }: Props) => {
  return (
    <input
      type={'email'}
      className={`rounded-full border-2 p-[.5rem_1rem] bg-primary-50/10 border-primary-100/50 bg-opacity-20 text-opacity-80 dark:border-white/10 dark:hover:bg-white/10 hover:text-opacity-100 transition-colors hover:border-primary-200/50 focus:ring-primary-200 focus:border-primary-200 focus:ring-1 focus:outline-none placeholder-opacity-50 ${
        className || ''
      }`}
      placeholder={placeholder || "Sample text"}
      onChange={onChange}
      onKeyUp={(e) => {
        if (e.key === 'Enter') onEnter && onEnter();
      }}
    />
  );
};

export default InputBox;
