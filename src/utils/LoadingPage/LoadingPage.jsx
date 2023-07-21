import React from "react";

const LoadingPage = () => {
  return (
    <div className="absolute w-full h-screen bg-slate-900 bg-opacity-90 z-50 text-amber-600 flex items-center justify-center">
      <div className="loading loading-bars loading-lg"></div>
    </div>
  );
};

export default LoadingPage;
