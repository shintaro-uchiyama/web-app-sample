import { useEffect } from "react";
import { TextPresentation } from "~/pages/tick/components/Text/presentation";

export const Text = () => {
  useEffect(() => {
    console.log("Text component use effect");
  });

  return <TextPresentation text={"Text component"} />;
};
