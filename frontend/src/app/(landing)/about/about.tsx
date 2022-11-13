'use client';

import Head from 'next/head';
import React from 'react';
import BleedContainer from 'components/bleed-container';
import GradientOutlineButton from 'components/gradient-outline-button';
import GradientText from 'components/gradient-text';
import Nav from 'components/nav';
import Socials from 'components/socials';

const About = () => {
  return (
    <div className="h-full w-[min(var(--content-width),var(--max-content-width))] mx-auto text-[max(min(min(2vw,calc(var(--max-content-width)*0.02)),1.7em),1.5em)]">
      <Head>
        <title>Artscaper</title>
        <meta name="description" content="A web suite for artists." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="min-h-full">
        <div className="flex flex-col items-center justify-center min-h-full gap-16 py-20 md:gap-5 md:flex-row">
          <div className="space-y-12 md:flex-2 md:max-w-[70%]">
            {/* TODO: Make Text Responsive */}
            <GradientText className="text-[2.9em] leading-[1.3em] font-bold">
              About Us
              <br className="hidden md:block" />& Our Mission
            </GradientText>
          </div>
          <div className="z-10 flex flex-row md:flex-1 md:flex-col md:h-full max-h-[calc(100vh-7em)] ml-20">
            <div className=" text-right py-10">
              <h2 className="text-[1.3em] text-sky-400">
                Artscaper is created by Artists, for Artists.
              </h2>
              <br />
              <p>
                We believe that art is an intrinsic human gift, one that should
                be created and enjoyed by anyone and everyone.
              </p>
              <br />
              <p>
                However, we&apos;ve found that with the expansion of the
                internet, digital resources, and new techologies, the art world
                has become more and more difficult to navigate. Consistently, we
                have heard our artist friends asking:
                <br />
              </p>
              <ul className="list-disc list-inside py-10 leading-relaxed">
                <p className="text-green-500">
                  &quot;What art resource is the best?&quot;
                </p>

                <p className="text-blue-400">
                  &quot;How do I get my art noticed?&quot;
                </p>

                <p className="text-sky-400">
                  &quot;Why can&apos;t I find a good reference?&quot;
                </p>

                <p className="text-violet-400 text-[2em]">
                  &quot;How do I start?&quot;
                </p>
              </ul>
              <p>
                We hope Artscaper can become a central hub of art tools for you
                to find tailored resources, build your brand presence, and find
                community networks to help you grow as an artist.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-24" />
      <div className="my-24 text-center md:text-left h-full">
        {/* Features section */}
        {/* Trend search */}
        <div className="items-center text-center">
          <h2 className="text-[1.5em] text-violet-400">Meet the Team</h2>
        </div>
        <div className="md:grid grid-cols-[3fr_2fr] items-center gap-20 space-y-10 md:space-y-0 mt-10">
          <p>
            <h2 className="text-[1.3em] text-sky-400">F. Meng (孟天同)</h2>
            <br />
            {/* <p>Founder of Artscaper</p>
                        <br /> */}
            <p className="italic">
              &quot;Hi, I am an engineering student and a self-taught
              photographer and&nbsp;
              <a
                className="text-blue-400 hover:text-blue-700 transition 300"
                href="https://twitter.com/fmeng__"
                target="_blank"
                rel="noopener noreferrer"
              >
                digital artist
              </a>
              .
              <br />I have been visualizing Artscaper for the past year, and
              hope realize it soon to help other artists solve the same problems
              I faced while navigating the digital art world.&quot;
            </p>
          </p>
          {/* <div className="w-3/4 mx-auto border-4 rounded-lg shadow-xl md:-skew-y-3 md:rotate-3 shadow-primary-400/50 border-primary-200/40 md:w-full">
                                    <img src="/trendsearch.png" alt="" />
                                </div> */}
        </div>

        {/* Palette */}
        <div className="md:grid  grid-cols-[3fr_2fr] justify-end items-center space-y-10 md:space-y-0 text-right  mt-10">
          <div className="w-3/6 mx-auto md:w-full">
            {/* <img src="/palette.png" alt="" /> */}
          </div>
          <h2 className="text-[1.3em] text-sky-400">Coolerblast</h2>
          <br />
          {/* <p></p>
                        <br /> */}
          <p className="italic">
            &quot;Hey there, I&apos;m a full-stack developer and friend of
            @fmeng__. I&apos;m excited to be working on this project with him,
            and I hope to help make Artscaper a reality!&quot;
          </p>
        </div>

        <div className="md:grid grid-cols-[3fr_2fr] items-center space-y-10 md:space-y-0  mt-10">
          <h2 className="text-[1.3em] text-sky-400">Ixorus (ந்யா)</h2>
          <br />
          {/* <p></p>
                        <br /> */}
          <p className="italic">
            Hi, I&apos;m a software/machine learning dev and compsci student.
            When @fmeng__ told me about Artscaper, I found that there were tons
            of interesting engineering challenges I was interested in tackling.
            As someone who wants to improve at art at some point, I hope this
            project will be able to support beginners such as myself. Looking
            forward to seeing what we can do!
          </p>
          <div className="w-3/6 mx-auto md:w-full">
            {/* <img src="/palette.png" alt="" /> */}
          </div>
        </div>

        <div className="md:grid items-center gap-10 space-y-10 md:space-y-0 text-center mt-20">
          <h2 className="text-[1.3em] text-sky-400">
            Interested in joining the team?
          </h2>

          <p>
            Send us an email at{' '}
            <a
              className="text-blue-400 hover:text-blue-700 transition 300"
              href="mailto:contact@artscaper.net"
            >
              contact@artscaper.net{' '}
            </a>
            and we&apos;ll get back to you as soon as possible!
          </p>
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
    </div>
  );
};

export default About;
