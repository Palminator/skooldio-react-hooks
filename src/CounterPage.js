import { Wrapper, CounterText, Button, Label } from "./Components";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useApi } from "./hooks";

export const CounterPage = () => {
  const [counter, setCounter] = useState(0);
  const inputRef = useRef(null);
  const { loading, initialCounter, setInitialCounter } = useApi();

  useEffect(() => {
    if (!loading) {
      inputRef.current.focus();
    }
  }, [loading]);

  useEffect(() => {
    setCounter(initialCounter);
    const id = setInterval(() => {
      setCounter((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
    }, 1000);

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [initialCounter]);

  // =============================== useMemo ===============================
  // const decrement = useMemo(()=> {
  //   console.log("decrement")
  //   return ()=> {
  //     setCounter((preventState) => preventState - 1)
  //   }
  // }, [setCounter])

  // =============================== useCallback ===============================
  const decrement = useCallback(() => {
    console.log("decrement");
    setCounter((preventState) => preventState - 1);
  }, [setCounter]);

  if (loading) return <Wrapper>Loading...</Wrapper>;

  return (
    <Wrapper>
      <CounterText>{counter}</CounterText>
      <div>
        <Button
          // ===================== Set Counter with counter-1 =====================
          // onClick={() => {
          //   setCounter(counter - 1);
          // }}

          // ===================== Set Counter with prevent data in function =====================
          onClick={decrement}
        >
          -1
        </Button>{" "}
        <Button
          onClick={() => {
            setCounter((preventState) => preventState + 1);
          }}
        >
          +1
        </Button>
      </div>
      <Label htmlFor="counter">
        <span>Initial Counter</span>
        <input
          ref={inputRef}
          value={initialCounter}
          onChange={(event) => {
            setInitialCounter(event.target.value);
          }}
          type="number"
          name="counter"
          id="counter"
        />
      </Label>
    </Wrapper>
  );
};

export default CounterPage;
