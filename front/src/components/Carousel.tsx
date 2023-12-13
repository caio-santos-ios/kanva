"use client"



import React, { useState } from "react";
import Slider from "react-slick";
import foto1 from "@/assets/foto1.png"
import foto2 from "@/assets/foto2.jpg"
import foto3 from "@/assets/foto3.jpg"
import Image from "next/image";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const back = () => {
    if(currentIndex > 0 && currentIndex <= 2){
      return setCurrentIndex(currentIndex - 1)
    }
    setCurrentIndex(2)
  }

  const next = () => {
    if(currentIndex >= 0 && currentIndex < 2){
      return setCurrentIndex(currentIndex + 1)
    }
    setCurrentIndex(0)
  }

  setTimeout(() => {
    next()
  }, 4000)

  const myPhotos = [foto1, foto2, foto3]

  return (
    <div className="xl:w-[60vw] xl:h-[25rem] m-auto h-[11rem] sm:h-[20rem] flex justify-center items-center relative">
      <button onClick={back} className="p-4 bg-black rounded-full text-white absolute left-4">
        <SlArrowLeft />
      </button>
      <div className="h-full w-full bg-blue-500 transition-transform duration-1000 ease-in-out	delay-1000">
        <Image className="max-w-full w-full h-full" width={0} height={0} alt="foto de anuncio" src={myPhotos[currentIndex]} /> 
      </div>
      <button onClick={next} className="p-4 bg-black rounded-full text-white absolute right-4">
        <SlArrowRight />
      </button>
    </div>
  )
}

export default Carousel;
/*
*/