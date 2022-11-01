import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Memo = () => {
  const [value, setValue] = useState('');

  const usePrevious = (value: string) => {
    const ref = useRef('');
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const [date, setDate] = useState('');
  const prev = usePrevious(date)
  const callback = ()=>{
     const now = new Date();
     const today = `${now.getFullYear()}.${(now.getMonth()+1).toString().padStart(2,"0")}.${now.getDate().toString().padStart(2,"0")} ${now.getSeconds()}`
     console.log('prev: ', prev)
     console.log('date: ', date)
     setDate(today)
  }
  const callbackRef = useRef<() => void>(callback);
  useEffect(() => {
    callbackRef.current = callback; // 新しいcallbackをrefに格納！
  }, [callback]);

  useEffect(()=>{
    const tick = () => { callbackRef.current() } 
    const id = setInterval(tick, 1000);
    return () => {
      clearInterval(id);
    };
  }, [])


  return <ReactQuill theme="snow" value={value} onChange={setValue} >
    <div style={{height: '600px'}}>{date}</div>
  </ReactQuill>;

};


export default Memo;
