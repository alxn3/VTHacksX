import { useEffect } from 'react';
import { RiMoonFill, RiMoonLine, RiSunFill, RiSunLine } from 'react-icons/ri';
import { useTheme } from 'next-themes';

type Props = {
  className?: string;
};

const ThemeToggle = ({ className }: Props) => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const MEDIA = '(prefers-color-scheme: dark)';
    const setSystem = () => setTheme('system');
    const media = window.matchMedia(MEDIA);
    media.addEventListener('change', setSystem);
    return () => media.removeEventListener('change', setSystem);
  }, [setTheme]);

  return (
    <button
      className={className}
      onClick={() =>
        setTheme(
          theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark')
            ? 'light'
            : 'dark'
        )
      }
    >
      <div>
        <RiSunLine className="absolute transition-opacity opacity-100 dark:opacity-0" />
        <RiMoonLine className="transition-opacity opacity-0 dark:opacity-100" />
      </div>
      {/* <div className="transition-opacity opacity-0 hover:opacity-100">
        <RiSunFill className="absolute transition-opacity opacity-100 dark:opacity-0" />
        <RiMoonFill className="transition-opacity opacity-0 dark:opacity-100" />
      </div> */}
    </button>
  );
};

export default ThemeToggle;