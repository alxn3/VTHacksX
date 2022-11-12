'use client';

import GradientText from './gradient-text';
import { FiMenu } from 'react-icons/fi';
import ThemeToggle from './theme-toggle';
import Link from 'next/link';
import { useState } from 'react';
import Socials from './socials';

const links: { name: string; url: string }[] = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Demo [Soon!]',
    url: '',
  },
  {
    name: 'Survey',
    url: 'https://forms.gle/MACbkicicooAJedq9',
  },
  {
    name: 'Contact',
    url: '/contact',
  },
];

const hoverDelay = 300;

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout>();

  return (
    <>
      <GradientText className="absolute py-4 text-4xl">Artscaper</GradientText>
      <nav className="fixed py-4 text-4xl right-[calc((100%-min(var(--content-width),var(--max-content-width)))/2)] z-50">
        <div
          className={`w-full h-full fixed top-0 right-0 backdrop-blur-sm transition-all duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
          onMouseEnter={() => setIsOpen(false)}
        />
        <div
          className={`h-full fixed top-0 right-0 flex flex-col bg-primary-300 dark:bg-primary-400 transition-all ease-in-out duration-300 w-[max(calc(4em+50%-min(90%,var(--max-content-width))/2),min(25rem,100%))] ${
            isOpen ? 'translate-x-0' : 'translate-x-[100%]'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-5xl">
            {links.map((link) => (
              <Link href={link.url} key={link.url} className="transition-colors text-secondary-100/80 dark:text-secondary-200/80 hover:text-primary-50 dark:hover:text-primary-50">
                  {link.name}
              </Link>
            ))}
            <hr className="border-2 rounded-full border-primary-200/40 w-2/5" />
            <Socials
              containerClassName="text-[0.7em]"
              iconClassName="transition-colors text-secondary-100/80 dark:text-secondary-200/80 hover:text-primary-50 dark:hover:text-primary-50"
            />
            {/* <Socials className="text-[0.8em]" iconClassName={menuTextStyles} /> */}
          </div>
        </div>
        <div className="flex gap-2 px-1 py-[0.125rem] rounded-md backdrop-blur-sm z-10">
          <ThemeToggle className="transition-colors text-primary-200 hover:text-secondary-300 dark:text-primary-200/40 dark:hover:text-secondary-200" />
          <button
            className="transition-colors text-primary-200 hover:text-secondary-300 dark:text-primary-200/40 dark:hover:text-secondary-200"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() =>
              setDelayHandler(
                setTimeout(() => {
                  setIsOpen(true);
                }, hoverDelay)
              )
            }
            onMouseLeave={() => clearTimeout(delayHandler)}
          >
            <FiMenu />
          </button>
        </div>
        {/* <div className="z-10 flex flex-row space-x-2 text-xl">
          <ThemeToggle className={isOpen ? menuTextStyles : linkTextStyles} />
          <button
            className={` ${isOpen ? menuTextStyles : linkTextStyles}`}
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsOpen(true)}
          >
            <RiMenu4Fill />
          </button>
        </div> */}
      </nav>
    </>
  );
};

export default Nav;
