import { useEffect, useRef, useState } from "react";

function OtpData() {
  const [list, setlist] = useState(new Array(6).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const Ref = useRef(null);

  const changeHandler = (value, index) => {
    if (value) {
      if (value.length > 1 && index !== 5) {
        const splitArr = value.split("");
        const newList = list.map((e, i) =>
          splitArr[i] === undefined ? e : splitArr[i]
        );
        setlist(newList);
        setActiveInput(splitArr.length);

      } else {
        let newArr = [...list];
        newArr[index] = value.substring(value.length - 1);
        setActiveInput(index + 1);
        setlist(newArr);
      }
    }
  };

  useEffect(() => {
    Ref.current?.focus();
  }, [activeInput]);

  const backwardHandler = (e, index) => {
    if (e === "Backspace") {
      let newArr = [...list];
      newArr[index] = "".substring("".length - 1);
      setlist(newArr);
      setActiveInput(index - 1);
    }
  };

  const clearHandler = () => {
    setlist(new Array(6).fill(""));
  };

  return (
    <section className="top">
      <div className="main">
        <h1 className="text">Enter verification code</h1>
        <div className="otp">
          {list.map((item, index) => (
            <div className="OtpInput" key={index}>
              <input
                ref={activeInput === index ? Ref : null}
                type="number"
                value={list[index]}
                onChange={(e) => changeHandler(e.target.value, index)}
                onKeyDown={(e) => backwardHandler(e.key, index)}
                className="spin-none"
              />
            </div>
          ))}
        </div>
        <div className="btn-icon">
          <button type="" onClick={clearHandler}>
            clear
          </button>
          <button type="">Get OTP</button>
        </div>
      </div>
    </section>
  );
}

export default OtpData;
