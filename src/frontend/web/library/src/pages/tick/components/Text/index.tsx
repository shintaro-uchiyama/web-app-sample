import { useSelector } from "react-redux";
import type { RootState } from "~/app/store";
import Text from "~/pages/tick/components/Text/presentation";

const TextContainer = () => {
  const count = useSelector((state: RootState) => state.counter.value);

  return <Text text={count.toString()} />;
};

export default TextContainer;
