'use client';

import GradientOutlineButton from 'components/gradient-outline-button';
import InputBox from 'components/input-box';
import { ReferenceContext, ReferenceProvider } from 'context/reference-context';
import { useContext, useEffect, useState } from 'react';
import { ImageData } from 'types/image-data';
import ImageResult from './image-result';
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

  const [images, setImages] = useState<ImageData[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => console.log(images), [images]);

  const query = async () => {
    const res = await fetch('https://knn5.laion.ai/knn-service', {
      method: 'POST',
      body: JSON.stringify({
        indice_name: 'laion5B',
        text: search,
        num_images: 200,
        modality: 'image',
        deduplicate: true,
        aesthetic_score: 8,
        aesthetic_weight: 0.5,
        use_violence_detector: true,
        use_safety_model: true,
      }),
    });
    setImages(await res.json());
  };

  return (
    <ReferenceProvider>
      <div className="w-[min(var(--content-width),var(--max-content-width))] h-full mx-auto">
        <div className="flex justify-center items-center flex-col p-4">
          <h1 className="mx-auto text-[3em] text-center font-bold">
            Reference Generator
          </h1>
          <div className="flex text-[1.5em] w-3/4 gap-4">
            <InputBox
              className=" flex-1"
              placeholder="Insert a prompt!"
              onChange={(e) => setSearch(e.target.value)}
              onEnter={query}
            />
            <GradientOutlineButton className="flex-0" onClick={query}>
              Enter
            </GradientOutlineButton>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-2 justify-center select-none">
          {images.map((img, i) => (
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
      </div>
      <div className="h-full">
        <div className="fixed top-[10%] right-[calc((100%-min(var(--content-width),var(--max-content-width)))/2)]">
          <ReferenceCart
            onImageClick={(data: ImageData) => {
              setFocusedImage(data.url);
              setFocused(true);
            }}
          />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full backdrop-blur-md transition-opacity ${
          focused ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setFocused(false)}
      >
        <div className="flex items-center justify-center h-full">
          <div className="h-3/4">
            <img
              src={focusedImage}
              className="object-cover h-full w-full select-none"
            />
          </div>
        </div>
      </div>
    </ReferenceProvider>
  );
};

export default Demo;
