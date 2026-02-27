import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faEject } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function PreLoader({ onClick }) {
  const [changeIconAnim, setchangeIconAnim] = useState(false);

  const [isBig, setIsBig] = useState(false);


  const [fadeOut, setfadeOut] = useState(false);

  const divRef = useRef();
  function handleAnimation() {
    setchangeIconAnim(true)
    setfadeOut(true);

    setTimeout(() => {
      onClick();
    }, 2000 /* 9000 */);
  }

  return (
    <div
      ref={divRef}
      className={`bg-black h-screen w-screen overflow-hidden 
        transition-all duration-[1500ms]    ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
    >
      <div
        className="flex  flex-col min-h-screen min-w-screen justify-center items-center overflow-hidden place-content-evenly"
        onClick={handleAnimation}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon
          icon={faCompactDisc}
          size={"7x"}
          style={{ color: "#FFFFFF", cursor: "pointer" }}
          spin={changeIconAnim}
          onMouseEnter={() => setIsBig(true)}
          onMouseLeave={() => setIsBig(false)}
          className=""
          
        />
        <p className="m-8 text-white text-2xl font-extrabold font-sans flex flex-col animate-pulse tracking-[.20em]">
          Please Insert Disk. . .
        </p>
      </div>
    </div>
  );
}

export default PreLoader;
