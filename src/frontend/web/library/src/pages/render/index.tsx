import "quill/dist/quill.bubble.css";
import { useState } from "react";
import { flushSync } from "react-dom";
import { useDispatch } from "react-redux";
import { decrement, increment } from "~/features/counter/counterSlice";
import Test from "~/pages/render/components/test";

const Render = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");

  return (
    <>
      <Test value={value} />
      <div>
        <input
          type="text"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <button
          style={{
            color: "white",
          }}
          onClick={() => {
            dispatch(decrement());
          }}
        >
          decrement
        </button>
        <button
          style={{
            color: "white",
            marginLeft: "8px",
          }}
          onClick={() => {
            flushSync(() => {
              dispatch(increment());
            });

            flushSync(() => {
              dispatch(increment());
            });
          }}
        >
          increment
        </button>
      </div>
    </>
  );
};

export default Render;
