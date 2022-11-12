import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "~/features/counter/counterSlice";
import type { RootState } from "../../app/store";

export function Tick() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
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
      </div>
    </div>
  );
}

export default Tick;
