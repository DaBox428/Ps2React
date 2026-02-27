import { React, forwardRef, Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useProgress, Html } from "@react-three/drei";
import ThreeDModel from "./ThreeDModel";
import ModelArray from "./ModelArray";
import circleImage from "../assets/circle.png";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const ModalDialog = forwardRef((props, ref) => {
  let modelUrl = props.modelUrl;

  let selectedModel = ModelArray.find((o) => o.url == modelUrl);

  const [selectedTab, setSelectedTab] = useState("About");

  const handleSelectedTab = (tab) => {
    setSelectedTab(tab);
  }

  return (
    <dialog
      ref={ref}
      className="backdrop:bg-blue-950/95 bg-slate-500/0 h-screen w-screen overflow-x-hidden open:animate-modalf flex items-center justify-center"
    >
      {modelUrl && (
        <div className="flex flex-col sm:flex-row w-screen mx-auto items-center justify-center ">
          <div className="flex flex-row justify-center w-screen">
              <div className="border border-slate-700 rounded-lg bg-slate-700/50 backdrop-blur-sm ">
              <Canvas className="w-full h-full" camera={{ fov: 70, position: [0, 0, 300] }}>
                <Suspense fallback={<Loader />}>
                  <OrbitControls enableZoom={false} enablePan={false} />
                  <ambientLight intensity={1} />
                  <Environment preset="studio" />

                  <ThreeDModel
                    modelUrl={selectedModel.url}
                    modelPosition={selectedModel.position}
                    modelRotation={selectedModel.rotation}
                    meshTexture={selectedModel.meshTexture}
                    modelScale={selectedModel.modelScale}
                    handleOnClickModal={null}
                    repeat={true}
                  />
                </Suspense>
              </Canvas>
            </div>
            <div className="flex flex-wrap border border-slate-700 rounded-lg mt-10 sm:mt-0 bg-slate-700/50 max-w-5xl ">
              <div className="flex-col">
                <div className="grid grid-flow-row grid-cols-2 justify-center border border-slate-700">
                  <div className={`border border-slate-700 ${selectedTab === "About" ? "bg-slate-600/50" : ""}`} onClick={() => handleSelectedTab("About")}>
                    <h2
                      className="text-yellow-400 lg:text-4xl text-3xl font-extrabold font-sans text-wrap
                    font-outline-2 tracking-[.11em] text-center sm:m-auto m-6 p-6 "
                    >
                        About
                    </h2>
                  </div>
                  
                  <div className={`border border-slate-700 ${selectedTab === "AboutThisPage" ? "bg-slate-600/50" : ""}`} onClick={() => handleSelectedTab("AboutThisPage")}>
                    <h2
                    className="text-yellow-400 lg:text-4xl text-3xl font-extrabold font-sans text-wrap
                  font-outline-2 tracking-[.11em] text-center sm:m-auto m-6 p-6"
                  >
                    About this page
                  </h2>
                  </div>
                  
                </div>
                
                
                

                <p className="text-white 2xl:text-3xl xl:text-xl font-bold font-sans font-outline-1 tracking-[.11em] text-center pt-3 mx-12 2xl:mx-0 p-6">
                  {selectedTab === "About" ? selectedModel.description : "This page was made by Michel Aycaguer as a personal project to learn React and 3D modeling. The models were made by Michel Aycaguer and are not for commercial use. The textures were made by Michel Aycaguer and are not for commercial use. The code was made by Michel Aycaguer and is not for commercial use."  }

                  <br />
                  
                </p>
              </div>
            </div>
          </div>
          
      
        </div>

        
      )}

      {modelUrl && (
        <form method="dialog" className="mb-0">
          <div className="flex flex-row p-3 absolute left-1/2 transform -translate-x-1/2 bottom-5 rounded-lg bg-slate-700/50 backdrop-blur-sm items-center">
            <img src={circleImage} className="sm:max-w-14 max-w-8" />
            <div className=" text-white text-2xl font-bold font-sans font-outline-2 tracking-[.11em] text-center">
              <button type="button" className="px-3" onClick={() => { props.handleOnClickModal(false); setSelectedTab("About"); }}>Back</button>
            </div>
          </div>
        </form>
      )}
      
    </dialog>
 
      
   
  );
});

export default ModalDialog;
