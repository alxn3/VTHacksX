'use client';

import type { NextPage } from 'next';
import Head from 'next/head';
import BleedContainer from '@components/bleed-container';
import GradientOutlineButton from '@components/gradient-outline-button';
import GradientText from '@components/gradient-text';
import Nav from '@components/nav';

import { IoRocketSharp } from 'react-icons/io5';
import { GrGraphQl } from 'react-icons/gr';
import { MdLibraryBooks } from 'react-icons/md';
import InputBox from '@components/input-box';

import { Axios, db } from 'src/firebase/firebaseConfig';
import { useState } from 'react';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Socials from '@components/socials';

const regexExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

const emailsRef = collection(db, 'waitlist-emails');

const Landing = () => {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const updateInput = (e: any) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    if (regexExp.test(email)) {
      sendEmail();
      setEmail('');
    } else {
      toast('Please enter valid email address', {
        toastId: 'emailwarning',
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };
  const sendEmail = () => {
    // Axios.post(
    //   'https://artscaper.cloudfunctions.net/submit',
    //   email
    // )
    //   .then(res => {
    try {
      addDoc(emailsRef, {
        email: email,
        time: new Date(),
      });
      toast.success('Email added to waitlist!', {
        toastId: 'email',
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      setEmailSubmitted(true);
    } catch (error) {
      console.log(error);
      toast('There was an error saving your email, please try again', {
        toastId: 'email',
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  return (
    <div className="h-full w-[min(var(--content-width),var(--max-content-width))] mx-auto text-[max(min(min(2vw,calc(var(--max-content-width)*0.02)),1.7em),1.5em)]">
      <ToastContainer
        bodyClassName={() => ' font-gray-300 text-[0.8em] font-light block'}
        toastClassName={'cursor-pointer relative justify-center flex-auto'}
      />
      <Head>
        <title>Artscaper</title>
        <meta name="description" content="A web suite for artists." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="min-h-full" id="hero">
        <div className="flex flex-col items-center justify-center min-h-full gap-16 py-20 md:gap-5 md:flex-row">
          <div className="space-y-12 md:flex-2 md:max-w-[70%]">
            {/* TODO: Make Text Responsive */}
            <GradientText className="text-[2.9em] leading-[1.3em] font-bold">
              The new age of art&nbsp;
              <br className="hidden md:block" />
              growth is digital
            </GradientText>
            <p className="text-[1.4em] leading-[1.1em] font-light">
              Become an Artscaper to propel&nbsp;
              <br className="hidden md:block" />
              your creative journey today!
            </p>
            <div className="">
              {!emailSubmitted ? (
                <div
                  id="emailsubmit"
                  className="flex items-center flex-wrap gap-4 text-[0.8em]"
                >
                  <InputBox
                    className="font-light border-1 px-[1em] py-[0.5em]"
                    placeholder="Enter email"
                    onChange={updateInput}
                  />
                  <GradientOutlineButton
                    onClick={handleSubmit}
                    className="font-light border-1 px-[1em] py-[0.5em]"
                  >
                    Join the waitlist
                  </GradientOutlineButton>
                </div>
              ) : (
                <div
                  id="thankyou"
                  className="items-center flex-wrap gap-4 text-[0.8em] h-auto"
                >
                  <h2>Thank you for signing up for the waitlist!</h2>
                  <h2>
                    We would love it if you can answer a{' '}
                    <a
                      href="https://forms.gle/MACbkicicooAJedq9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 font-bold hover:text-blue-600 transition 300"
                    >
                      quick 10 min. survey{' '}
                    </a>
                    <br className="hidden md:block" /> for a chance to win a
                    $100 Amazon gift card.
                  </h2>
                </div>
              )}
            </div>
          </div>
          <div className="z-10 flex flex-row justify-center md:flex-1 md:flex-col md:h-full max-h-[calc(100vh-7em)]">
            <div>
              <img src="/tablet.png" alt="" />
            </div>
            <div>
              <img src="/mac.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Mission statement section */}
      <BleedContainer className="w-[90%] md:w-[70%] mx-auto justify-center items-center text-[0.9em] y-20 text-center">
        <div className="py-36 -mb-12 text-[1.3em] font-light">
          <p>
            As an <strong className="font-bold">artist</strong>, you&apos;re no
            stranger to the struggle of finding your place in the wide world of
            art. Many resources to help you as an artist can be confusing and
            complex, or they may even put too much pressure on you to try and
            manage the process yourself.
          </p>
        </div>
        <hr className="border-2 rounded-full border-primary-200/40" />
        <div className="py-20">
          <p className="text-[1.4em] ">
            <strong>Artscaper</strong> aims to simplify the process of
          </p>
          <div className="flex flex-col items-center justify-center gap-10 mb-10 mt-14 md:flex-row">
            <div className="flex flex-col items-center gap-6 p-4 rounded-md dark:bg-black/90 bg-white/30">
              <div className="px-10 pt-4 rounded-full">
                <IoRocketSharp className="text-[2.5em]" />
              </div>
              <p className="py-4">Growth</p>
            </div>

            <div className="flex flex-col items-center gap-6 p-4 rounded-md dark:bg-black/90 bg-white/30">
              <div className="px-10 pt-4 rounded-full">
                <MdLibraryBooks className="text-[2.5em]" />
              </div>
              <p className="px-4 py-4">
                Resource
                <br />
                Gathering
              </p>
            </div>
            <div className="flex flex-col items-center gap-6 p-4 rounded-md dark:bg-black/90 bg-white/30">
              <div className="px-10 pt-4 rounded-full">
                <GrGraphQl className="text-[2.5em]" />
              </div>
              <p className="py-4">Analysis</p>
            </div>
          </div>
          <p>
            so <strong>you</strong> can focus on your next{' '}
            <strong>masterpiece</strong>.
          </p>
        </div>
      </BleedContainer>

      <div className="space-y-48 my-48 text-center md:text-left">
        {/* Features section */}
        {/* Trend search */}
        <div className="md:grid grid-cols-[3fr_2fr] items-center gap-20 space-y-10 md:space-y-0">
          <p>
            If you’re still playing catch up with all the trends artists are
            seeing right now, we got you covered. Our{' '}
            <strong>Trend Search</strong> is a community-contributed database of
            trend and challenge calendars, character/reference sheets, and
            useful tags you can use for your next art post online.
          </p>
          <div className="w-3/4 mx-auto border-4 rounded-lg shadow-xl md:-skew-y-3 md:rotate-3 shadow-primary-400/50 border-primary-200/40 md:w-full">
            <img src="/trendsearch.png" alt="" />
          </div>
        </div>

        {/* Palette */}
        <div className="md:grid grid-cols-[2fr_3fr] items-center gap-20 space-y-10 md:space-y-0">
          <p>
            As an artist, it can be hard to discover resources and stay
            connected with other artists. <strong>Palette</strong> is a social
            network that helps artists find one another, connect, and grow their
            careers as artists.
          </p>
          <div
            className="w-3/4 mx-auto border-4 rounded-lg shadow-xl md:skew-y-3 md:-rotate-3 shadow-primary-400/50 border-primary-200/40 md:w-full"
            style={{ gridRow: 1 }}
          >
            <img src="/palette.png" alt="" />
          </div>
        </div>
        {/* Art analysis */}
        <div className="md:grid grid-cols-[3fr_2fr] items-center gap-20 space-y-10 md:space-y-0">
          <p>
            <strong>Showcase Manager AI</strong> analyzes your profile and
            content, identifying which posts and works are well-performing in
            social media. We identify what is unique about you, what your fans
            enjoy about your work, and simply how you can get better at sharing
            yourself through your social profiles.
          </p>
          <div className="w-3/4 mx-auto border-4 rounded-lg shadow-xl md:-skew-y-3 md:rotate-3 shadow-primary-400/50 border-primary-200/40 md:w-full">
            <img src="/profileanalysis.png" alt="" />
          </div>
        </div>
      </div>

      <BleedContainer className="pt-16 pb-20 flex items-center flex-col gap-6 text-[1.1em] text-center">
        <p>
          Start growing your art journey through <strong>Artscaper</strong>.
        </p>
        <GradientOutlineButton className="font-semilight border-1 text-[0.7em]">
          <a href={'#hero'}>Join the waitlist</a>
        </GradientOutlineButton>
        <Socials
          containerClassName="text-[1.3em]"
          iconClassName="text-primary-300 hover:text-secondary-100 dark:text-primary-300/70 dark:hover:text-secondary-100 transition-all"
        />
      </BleedContainer>
      {/* Add a twitter/social section, maybe in footer? */}
    </div>
  );
};

export default Landing;
