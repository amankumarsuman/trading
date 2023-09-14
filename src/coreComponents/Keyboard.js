import { useEffect, useRef } from "react";

function Usekey(key, callback, isCrtl = false) {
  const callbackRef = useRef(callback);
  function handleEnterKey(event) {
    if (event.isComposing || event.keyCode === 229) {
      return () => document.removeEventListener("keydown", handleEnterKey);
    }
    if (event.code === key && !isCrtl) {
      callbackRef.current(event);
    }
    else if (event.code === key && isCrtl && event.ctrlKey) {
      callbackRef.current(event);
    }
    event.stopPropagation();
  }
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("keydown", handleEnterKey);
    return () => document.removeEventListener("keydown", handleEnterKey);
  }, [key]);
}

export { Usekey };
