import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "~/app/store";
import Text from "~/pages/tick/components/Text/presentation";

const TextContainer = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  useEffect(() => {
    console.log("---count更新---");
    console.log("count: ", count);
  }, [count]);

  return <Text text={count.toString()} />;
};

export default TextContainer;
