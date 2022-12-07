import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import bgVideo from "../assets/BgVideo.mp4";
import logo from "../assets/loogo.jpeg";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  function responseGoogle(response) {
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
    console.log(JSON.stringify(response.profileObj));
  }

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={bgVideo}
          loop
          type="video/mp4"
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p -5">
            <image src={logo} width="130px" alt="logo" className="" />
          </div>
          <div id="signInDiv" className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-white flex justify-center items-center rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" />
                  signin with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
