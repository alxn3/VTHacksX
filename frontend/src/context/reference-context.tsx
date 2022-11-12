import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { ImageData } from 'types/image-data';

type Props = {
  children: ReactNode;
};

const ReferenceContext = createContext<{
  selectedImages: Record<number, ImageData>;
  setSelectedImages: Dispatch<SetStateAction<Record<number, ImageData>>>;
}>({ selectedImages: [], setSelectedImages: () => {} });

const ReferenceProvider = ({ children }: Props) => {
  const [selectedImages, setSelectedImages] = useState<
    Record<number, ImageData>
  >({});
  return (
    <ReferenceContext.Provider value={{ selectedImages, setSelectedImages }}>
      {children}
    </ReferenceContext.Provider>
  );
};

export { ReferenceContext, ReferenceProvider };
