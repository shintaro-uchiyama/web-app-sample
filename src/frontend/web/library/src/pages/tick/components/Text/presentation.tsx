import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/app/store";
import { render } from "~/features/render/renderSlice";

interface TextPropr {
  text: string;
}

const Text = ({ text }: TextPropr) => {
  const presentations = useSelector(
    (state: RootState) => state.render.presentations
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Text component use effect");
    if (presentations.length >= 1) return;
    dispatch(render("1"));
  });

  return (
    <div>
      <span>{text}</span>
      {/*presentations.length >= 1 && (
        <div>
          {presentations[0].renderedAts.map((r, index) => (
            <div key={index}>{r}</div>
          ))}
        </div>
          )*/}
    </div>
  );
};

export default Text;
