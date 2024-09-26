import { React, useState, Suspense, forwardRef, useRef } from "react";
import "../App.css";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import { Html, useProgress } from "@react-three/drei";

import ps2CardImage from "../assets/PS2_Memory_Card.png";

import ModalDialog from "./ModalDialog";

import ThreeDModel from "./ThreeDModel";

import ModelArray from "./ModelArray";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html
      center
      className="text-yellow-400 text-3xl font-extrabold font-sans font-outline-2 tracking-[.11em] "
    >
      {progress} % loaded
    </Html>
  );
}

function MemoryCard() {
  const dialogRef = useRef(null);

  const [selectedModelUrl, setSelectedModelUrl] = useState("");

  function handleOnClickModal(modelUrl) {
    if (modelUrl) {
      setSelectedModelUrl(modelUrl);
    }

    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  return (
    <div
      className={`flex sm:h-screen sm:w-screen sm:max-h-screen sm:max-w-screen bg-gradient-to-br from-slate-300 to-black
       h-lvh}`}
      style={{ animation: "fadeIn 5s" }}
    >
      <div className="md:mt-16 md:ml-20 absolute flex ml-8 sm:ml-auto mt-12">
        <img src={ps2CardImage} className=" mt-0 m-7 max-w-14" />
        <h1 className=" text-white md:text-3xl text-lg font-extrabold font-sans font-outline-2 tracking-[.11em] text-left  align-text-bottom">
          Memory Card (ps2)/1 <br />
          428 KB free
        </h1>
      </div>

      <div className="mt-16 ml-20 absolute flex right-20">
        <h1 className=" text-yellow-400 text-3xl font-extrabold font-sans font-outline-2 tracking-[.11em] invisible lg:visible">
          Your System <br /> Configuration
        </h1>
      </div>

      <ModalDialog
        ref={dialogRef}
        modelUrl={selectedModelUrl}
        handleOnClickModal={handleOnClickModal}
      />
      <div className="flex justify-center sm:items-center w-screen md:pt-24 sm:mt-0 ">
        <div className="flex  flex-wrap justify-center mt-28 sm:mt-0 md:m-40 ">
          {ModelArray.map((item) => {
            return (
              <div
                key={Math.random(1, 100)}
                /*   className="border border-slate-700" */
                className=" min-h-36 min-w-36 max-h-80 max-w-80 md:min-h-52 md:min-w-52 lg:min-h-60 lg:min-w-60 "
              >
                <Canvas camera={{ fov: 50, position: [0, 0, 350] }}>
                  <Suspense fallback={<Loader />}>
                    {/* {<OrbitControls></OrbitControls>} */}
                    <ambientLight intensity={1.5} />
                    <Environment preset="studio" />

                    <ThreeDModel
                      modelUrl={item.url}
                      modelPosition={item.position}
                      modelRotation={item.rotation}
                      meshTexture={item.meshTexture}
                      modelScale={item.modelScale}
                      handleOnClickModal={handleOnClickModal}
                    />
                  </Suspense>
                </Canvas>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MemoryCard;
