import React from "react";
import Lottie from "react-lottie";

const LottieController: React.FC<{
  lottie: string;
  height?: number;
  width?: number;
}> = ({ lottie, height = 400, width = 400 }) => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: lottie,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
      height={height}
      width={width}
    />
  );
};

export default LottieController;
