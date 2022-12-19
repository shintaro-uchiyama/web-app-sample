import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "~/app/store";

interface ITestProps {
  value: string;
}

const Test = ({ value }: ITestProps) => {
  const count = useSelector((state: RootState) => state.counter.value);
  useEffect(() => {
    console.log("~~~count: ", count);
  }, [count]);
  return <div>{count}</div>;
};
export default Test;
