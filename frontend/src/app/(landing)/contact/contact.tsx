'use client';

import Head from 'next/head';
import React from 'react';
import BleedContainer from '@components/bleed-container';
import GradientOutlineButton from '@components/gradient-outline-button';
import Nav from '@components/nav';
import Socials from '@components/socials';

const Contact = () => {
    return (
        <div className="h-full w-[min(var(--content-width),var(--max-content-width))] mx-auto text-[max(min(min(2vw,calc(var(--max-content-width)*0.02)),1.7em),1.5em)]">

            <Head>
                <title>Artscaper</title>
                <meta name="description" content="A web suite for artists." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <div className="min-h-full" >
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

}
export default Contact;