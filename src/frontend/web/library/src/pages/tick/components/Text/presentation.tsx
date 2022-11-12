import { useEffect } from "react";

interface TextPropr {
  text: string;
}

export const TextPresentation = ({ text }: TextPropr) => {
  useEffect(() => {
    console.log("Text component use effect");
  });

  return <div>{text}</div>;
};
