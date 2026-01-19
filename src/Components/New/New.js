import React from "react";
import Image from "next/image";

export default function New() {
  return (
    <div className="w-full mt-4 min-h-screen bg-white flex items-center justify-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl">

        <Image
          src="/img/2.jpeg"
          alt="Big Image 1"
          width={1200}
          height={800}
          className="w-full h-[400px] md:h-[600px] object-cover rounded-md"
          priority
        />

        <Image
          src="/img/4.jpeg"
          alt="Big Image 2"
          width={1078}
          height={712}
          className="w-full h-[400px] md:h-[600px] object-cover rounded-md"
        />

      </div>
    </div>
  );
}
