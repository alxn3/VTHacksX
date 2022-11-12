import BleedContainer from './bleed-container';
import GradientOutlineButton from './gradient-outline-button';
import Socials from './socials';

const Footer = () => {
  return (
    <footer className='text-[1.5em] mt-10'>
      <BleedContainer className="pt-16 pb-20 flex items-center flex-col gap-6 text-[1.1em] text-center">
        <p>
          Start growing your art journey through <strong>Artscaper</strong>.
        </p>
        <GradientOutlineButton className="font-semilight border-1 text-[0.7em]">
          <a href={'/#hero'}>Join the waitlist</a>
        </GradientOutlineButton>
        <Socials
          containerClassName="text-[1.3em]"
          iconClassName="text-primary-300 hover:text-secondary-100 dark:text-primary-300/70 dark:hover:text-secondary-100 transition-all"
        />
      </BleedContainer>
    </footer>
  );
};

export default Footer;
