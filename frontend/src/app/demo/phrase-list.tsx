type Props = {
  phrases: string[];
  onPhraseClick?: (i: number) => void;
  active?: number;
  className?: string;
};

const PhraseList = ({ phrases, onPhraseClick, active, className }: Props) => {
  return (
    <div
      className={`flex flex-row items-start text-[1em] gap-4 p-4 min-w-2/3 ${
        className || ''
      }`}
    >
      {phrases?.map((phrase, i) => (
        <div
          key={i}
          className={` whitespace-nowrap py-1 px-3 rounded-full bg-white border-black dark:bg-black dark:border-white border-[1px] cursor-pointer hover:bg-primary-200/40 ${
            active === i ? 'bg-primary-200/40' : ''
          }`}
          onClick={() => onPhraseClick && onPhraseClick(i)}
        >
          {phrase}
        </div>
      ))}
    </div>
  );
};

export default PhraseList;
