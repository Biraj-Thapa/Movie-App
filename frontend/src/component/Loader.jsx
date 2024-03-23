import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
    <div className="animate-pulse rounded-full h-16 w-16 border-4 border-teal-500 border-opacity-50">
      <div className="h-12 w-12 border-4 border-teal-500 border-opacity-50 rounded-full"></div>
    </div>
  </div>
);
}

export default Loader