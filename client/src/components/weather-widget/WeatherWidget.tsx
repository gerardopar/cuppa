import React from "react";

import WeatherCloudyNightLottie from "../lotties/weather-cloudy-night.json";
import LottieController from "../lotties/LottieController";

export const WeatherWidget: React.FC = () => {
  return (
    <div className="w-[25%] h-full flex items-center justify-center">
      <LottieController
        lottie={WeatherCloudyNightLottie}
        height={100}
        width={100}
      />
    </div>
  );
};

export default WeatherWidget;
