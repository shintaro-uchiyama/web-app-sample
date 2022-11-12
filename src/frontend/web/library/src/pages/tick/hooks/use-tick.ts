import { useEffect } from "react";

const intervalSecond = 5;
const useTick = () => {
  useEffect(() => {
    setInterval(() => {
      console.log("tick");
    }, intervalSecond * 1000);
  }, []);
};

export default useTick;
