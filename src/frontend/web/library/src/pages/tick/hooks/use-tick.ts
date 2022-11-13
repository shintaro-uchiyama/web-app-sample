import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "~/app/store";

type Presentation = {
  id: string;
};

type App<T = any> = {
  id: string;
  key: string;
  value: T;
};

type Domain<T = any> = {
  referenceKey: string;
  value: T;
};

type Pattern = {
  presentations: Presentation[];
  apps: App[];
  domains: Domain[];
};

const intervalSecond = 5;
const useTick = () => {
  const presentations = useSelector(
    (state: RootState) => state.render.presentations
  );

  useEffect(() => {
    setInterval(() => {
      // console.log("tick");
      // console.log(render.presentations);
      // console.log("tick");
      // const testPattern: Pattern = {
      //   presentations: [
      //     {
      //       id: "test1",
      //     },
      //   ],
      //   apps: [
      //     {
      //       id: "test1",
      //       key: "key1",
      //       value: "ref:reference1",
      //     },
      //   ],
      //   domains: [
      //     {
      //       referenceKey: "reference1",
      //       value: 10,
      //     },
      //   ],
      // };
      // console.log("testPattern: ", testPattern);
    }, intervalSecond * 1000);
  }, []);

  useEffect(() => {
    console.log("--rendered at--");
    console.log(presentations);
  }, [presentations]);
};

export default useTick;
