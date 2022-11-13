'use client';

import { ReferenceContext } from 'context/reference-context';
import { useEffect, useRef, useState, MouseEvent } from 'react';
import { ImageData } from 'types/image-data';

type Props = {
  onImageClick: (data: ImageData) => void;
};

const ReferenceCart = ({ onImageClick }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside as any);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside as any);
    };
  }, [ref]);

  return (
    <div className={`flex flex-col border-[1px] items-end ${open ? 'bg-white dark:bg-black rounded-lg border-black dark:border-white -m-4 p-4' : 'border-transparent'}`} ref={ref}>
      <div
        className="py-2 px-4 rounded-md bg-white dark:bg-black border-dark dark:border-white border-[1px] cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        Images
      </div>
      <div
        className={`p-4 ${
          open ? 'block' : 'hidden'
        }`}
      >
        <div className="grid grid-cols-3 select-none max-h-[70vh] overflow-y-auto gap-1">
          <ReferenceContext.Consumer>
            {({ selectedImages, setSelectedImages }) =>
              Object.keys(selectedImages).length ? (
                Object.values(selectedImages).map((img, i) => (
                  <div key={i} className="w-20 h-20 relative rounded-md overflow-hidden border-2 border-black">
                    <div
                      className="absolute right-0 top-0 p-2 bg-black w-4 h-4 m-1 hover:bg-red-500 cursor-pointer"
                      onClick={() => {
                        setSelectedImages((prev) => {
                          delete prev[img.id];
                          return { ...prev };
                        });
                      }}
                    />
                    <img
                      className="object-cover w-full h-full"
                      src={img.url}
                      alt={img.caption}
                      //   onClick={() => onImageClick(img)}
                    />
                  </div>
                ))
              ) : (
                <div>No images selected.</div>
              )
            }
          </ReferenceContext.Consumer>
        </div>
      </div>
    </div>
  );
};

export default ReferenceCart;
