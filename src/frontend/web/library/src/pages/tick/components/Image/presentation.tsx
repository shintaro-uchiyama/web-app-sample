import { useEffect } from "react";

interface ImageProps {
  src: string;
}

const Image = ({ src }: ImageProps) => {
  useEffect(() => {
    console.log("Image component use effect");
  });

  return <img src={src} />;
};

export default Image;
