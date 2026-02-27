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
      {progress.toFixed(2)} % loaded
    </Html>
  );
}

function MemoryCard() {
  const dialogRef = useRef(null);

  const [selectedModelUrl, setSelectedModelUrl] = useState("");

  function handleOnClickModal(modelUrl) {
    if (!dialogRef.current) return;

    // If caller explicitly passes false, close the dialog and clear selection
    if (modelUrl === false) {
      dialogRef.current.close();
      setSelectedModelUrl("");
      return;
    }

    // If a model URL is provided, set it and open the dialog
    if (modelUrl) {
      setSelectedModelUrl(modelUrl);
      dialogRef.current.showModal();
      return;
    }

    // Otherwise toggle the dialog
    if (dialogRef.current.hasAttribute("open")) {
      dialogRef.current.close();
      setSelectedModelUrl("");
    } else {
      dialogRef.current.showModal();
    }
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
      <div className="flex justify-center  w-screen">
        <div className="flex  flex-wrap justify-center  ">
          {ModelArray.map((item) => {
            return (
              <div
                key={1}
                   className="" 
                
              >
                <Canvas camera={{ fov: 50, position: [0, 0, 700] }} className="min-w-full min-h-36">
                  <Suspense fallback={<Loader />}>
                    <ambientLight intensity={1.5} />
                    <Environment preset="warehouse" />

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
