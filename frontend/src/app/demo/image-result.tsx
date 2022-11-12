import { ImageData } from 'types/image-data';
import { MouseEventHandler, MouseEvent, useContext } from 'react';
import { ReferenceContext } from 'context/reference-context';

type Props = {
  className?: string;
  data: ImageData;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const ImageResult = ({ data, onClick, className }: Props) => {
  const { selectedImages, setSelectedImages } = useContext(ReferenceContext);

  const toggleSelectedReference = (e: MouseEvent<HTMLDivElement>) => {
    if (data.id in selectedImages)
      setSelectedImages((prev) => {
        delete prev[data.id];
        return { ...prev };
      });
    else
      setSelectedImages((prev) => {
        return { ...prev, [data.id]: data };
      });
  };

  return (
    <div className={`relative group rounded-md overflow-hidden ${className || ''}`}>
      <div
        className={`absolute right-0 w-6 h-6 m-2 rounded-full ${
          data.id in selectedImages
            ? 'opacity-100 bg-green-500'
            : 'opacity-0 group-hover:opacity-100 bg-white'
        }`}
        onClick={toggleSelectedReference}
      />
      <img
        className="object-contain w-full h-full"
        src={data.url}
        alt={data.caption}
        onError={(e) => (e.currentTarget.style.display = 'none')}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageResult;
