import { useEffect } from "react";
import Text from "~/pages/tick/components/Text/presentation";

const TextContainer = () => {
  useEffect(() => {
    console.log("Text component use effect");
  });

  return <Text text={"Text component"} />;
};

export default TextContainer;
