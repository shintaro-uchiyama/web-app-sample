import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/app/store";
import { decrement, increment } from "~/features/counter/counterSlice";
import { Image, Text } from "~/pages/tick/components";
import useTick from "./hooks/use-tick";

export function Tick() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  useTick();

  return (
    <>
      <div>
        <span>{count}</span>
      </div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
      </div>
      <div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <Image />
      <Text />
    </>
  );
}

export default Tick;
