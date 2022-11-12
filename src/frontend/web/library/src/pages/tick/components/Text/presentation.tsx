import { useEffect } from "react";

interface TextPropr {
  text: string;
}

const Text = ({ text }: TextPropr) => {
  useEffect(() => {
    console.log("Text component use effect");
  });

  return <div>{text}</div>;
};

export default Text;
