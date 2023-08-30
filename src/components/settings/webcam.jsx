import React, { useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const WebcamCapture = ({ setWebcamShowing }) => {
  
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState("");
  const {uploadProfilePic,profilePicLoading } = useContext(UserContext)
 


  const handleBrowse = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };


  const handleUpload = async () => {
    const payload = {
      image: image,
    };
    uploadProfilePic(payload)
    
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);
  return (

      <div className=" p-4  mb-4 flex items-center flex-col rounded-[20px] w-full justify-center ">
        
          <img
            onClick={() => {
              setWebcamShowing(false);
            }}
            className="w-[30px] flex self-end cursor-pointer h-[30px]"
            src="../close.svg"
            alt=""
          />
      
        {image ? (
          
            <img className="w-[300px] aspect-square rounded-[20px] h-full" src={image} alt="" />
          
        ) : (
          <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            style={{borderRadius:"20px"}}
            videoConstraints={videoConstraints}
          />
        )}

        <div className="flex flex-row items-center mt-4 justify-evenly space-x-4">
          { profilePicLoading? (
            <div className="loader"></div>
          ) : (
            <div className="flex flex-row items-center mt-4 justify-evenly space-x-4">
              {image ? (
                <button
                  onClick={() => setImage(null)}
                  className="bg-white rounded-[20px] p-2"
                >
                  Retake
                </button>
              ) : (
                <button
                  className=" border-2 rounded-full  border-white w-[50px] flex justify-center items-center  h-[50px]"
                  onClick={capture}
                >
                  <div className="w-[40px] h-[40px] bg-white rounded-full"></div>
                </button>
              )}
              {image ? (
                <button
                  onClick={() => handleUpload()}
                  className="bg-white rounded-[20px] p-2"
                >
                  Upload
                </button>
              ) : (
                <div>
                  <label className="bg-white rounded-[20px] p-2" htmlFor="file">
                    Browse
                  </label>
                  <input
                    onChange={(e) => {
                      handleBrowse(e.currentTarget.files[0]);
                    }}
                    id="file"
                    className="hidden"
                    type="file"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    
  );
};

export default WebcamCapture;