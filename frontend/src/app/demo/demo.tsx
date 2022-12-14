'use client';

import GradientOutlineButton from 'components/gradient-outline-button';
import GradientText from 'components/gradient-text';
import InputBox from 'components/input-box';
import Nav from 'components/nav';
import { ReferenceProvider } from 'context/reference-context';
import { useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import { ImageData } from 'types/image-data';
import ImageResult from './image-result';
import PhraseList from './phrase-list';
import ReferenceCart from './reference-cart';

// const images: string[] = [...Array(100)].map(
//   (_, n) =>
//     `https://picsum.photos/${(Math.floor(Math.random() * 6) + 2) * 200}/${
//       (Math.floor(Math.random() * 6) + 2) * 200
//     }`
// );

const Demo = () => {
  const [focused, setFocused] = useState<boolean>(false);
  const [focusedImage, setFocusedImage] = useState<string>('');

  const [images, setImages] = useState<Record<string, ImageData[]>>({});
  const [search, setSearch] = useState<string>('');
  const [activePhraseIndex, setActivePhraseIndex] = useState<number>(0);
  const [phrases, setPhrases] = useState<string[]>([]);

  const [error, setError] = useState<string>('');
  const [gathering, setGathering] = useState<boolean>(false);

  const processPhrase = async () => {
    setGathering(true);
    setError('');
    setPhrases([]);
    const res = await fetch('/api/query', {
      method: 'POST',
      body: JSON.stringify({ query: search }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (data.toxic) {
      setError('Toxic phrase detected. Please try again.');
      setGathering(false);
    } else {
      setPhrases(data.phrases);
    }
  };

  useEffect(() => {
    if (!phrases.length) return;

    setActivePhraseIndex(0);

    const queryPhrases = async () => {
      const dict: Record<string, ImageData[]> = {};
      for (const phrase of phrases) {
        const res = await fetch('https://knn5.laion.ai/knn-service', {
          method: 'POST',
          body: JSON.stringify({
            indice_name: 'laion5B',
            text: phrase,
            num_images: 200,
            modality: 'image',
            deduplicate: true,
            aesthetic_score: 6.5,
            aesthetic_weight: 0.5,
            use_violence_detector: true,
            use_safety_model: true,
          }),
        });
        console.log(phrase);
        if (res.ok) {
          const data = await res.json();
          dict[phrase] = data;
        } else {
          setError('Error: ' + res.statusText);
          setGathering(false);
          return;
        }
      }
      console.log(dict);
      setImages(dict);
      setGathering(false);
    };
    queryPhrases();
  }, [phrases]);

  return (
    <ReferenceProvider>
      <div className="w-[min(var(--content-width),var(--max-content-width))] mx-auto">
        <Nav />
      </div>
      <div className="w-[min(var(--content-width),var(--max-content-width))] min-h-screen mx-auto">
        <div className="flex flex-col items-center justify-center p-4">
          <GradientText className="mx-auto text-[5em] font-extrabold text-center my-[25vh]">
            Reference Generator
          </GradientText>
          <div className="flex text-[1.5em] w-3/4 gap-4">
            <InputBox
              className="flex-1"
              placeholder="Insert a prompt!"
              onChange={(e) => setSearch(e.target.value)}
              onEnter={processPhrase}
            />
            <GradientOutlineButton className="flex-0" onClick={processPhrase}>
              Enter
            </GradientOutlineButton>
          </div>
        </div>
        <div className="sticky top-0 z-10 flex justify-center">
          <PhraseList
            className="backdrop-blur-lg rounded-b-3xl min-w-[70%] overflow-x-auto"
            phrases={phrases}
            active={activePhraseIndex}
            onPhraseClick={(i) => setActivePhraseIndex(i)}
          />
        </div>
        {error && (
          <div className="flex justify-center">
            <div className="text-red-500 text-2xl font-bold">{error}</div>
          </div>
        )}
        {gathering ? (
          <div className="flex justify-center">
            <PropagateLoader className=" scale-150" color="#e63282" />
          </div>
        ) : (
          <div className="flex flex-row flex-wrap justify-center gap-2 select-none">
            {images[phrases[activePhraseIndex]]?.map((img, i) => (
              <ImageResult
                key={i}
                className="h-[10em]"
                onClick={() => {
                  setFocusedImage(img.url);
                  setFocused(true);
                }}
                data={img}
              />
            ))}
          </div>
        )}
      </div>
      <div className="h-full">
        <div className="fixed top-[10%] right-[calc((100%-min(var(--content-width),var(--max-content-width)))/2)] z-20">
          <ReferenceCart
            onImageClick={(data: ImageData) => {
              setFocusedImage(data.url);
              setFocused(true);
            }}
          />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full backdrop-blur-md transition-opacity z-30 ${
          focused ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setFocused(false)}
      >
        <div className="flex items-center justify-center h-full">
          <div className="h-3/4">
            <img
              src={focusedImage}
              className="object-cover w-full h-full select-none"
            />
          </div>
        </div>
      </div>
    </ReferenceProvider>
  );
};

export default Demo;
