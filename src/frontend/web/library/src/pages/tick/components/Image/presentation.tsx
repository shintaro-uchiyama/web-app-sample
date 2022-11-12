import { useEffect } from "react";

interface ImageProps {
  src: string;
}

export const ImagePresentation = ({ src }: ImageProps) => {
  useEffect(() => {
    console.log("Image component use effect");
  });

  return <img src={src} />;
};
