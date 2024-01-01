import {useRef, useEffect} from 'react';

export function useInterval(callback: () => void, delay: number) {
  const intervalRef = useRef<number>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // @ts-ignore
    intervalRef.current = setInterval(() => {
      callbackRef.current();
    }, delay);

    // @ts-ignore
    return () => clearInterval(intervalRef.current);
  }, [delay]);

  return intervalRef;
}
