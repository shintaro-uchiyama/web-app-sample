import { useDispatch } from "react-redux";
import { decrement } from "~/features/counter/counterSlice";
import { render } from "~/features/render/renderSlice";
import { Image, Text } from "~/pages/tick/components";
import useTick from "./hooks/use-tick";

export function Tick() {
  // const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  useTick();

  return (
    <>
      <div></div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(render("ee"))}
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
      <div>
        <button aria-label="render " onClick={() => dispatch(render("aaa"))}>
          render
        </button>
      </div>
      <Image />
      <Text />
    </>
  );
}

export default Tick;
