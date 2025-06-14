import React from 'react'
import { useState, useRef } from 'react'
import Button from '@/components/ui/button'
import { TiLocationArrow } from 'react-icons/ti'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
const Hero = () => {
const [currentIndex, setCurrentIndex] = useState <number>(1)
const [hasClicked, setHasClicked] = useState<boolean>(false)
const [isLoading, setIsLoading] = useState<boolean>(true)
const [loadedVideos, setLoadedVideos] = useState<number>(0)
const nextVRef = useRef<HTMLVideoElement | null>(null);
const totalVideos = 4
const upComingVideoIndex = (currentIndex % totalVideos) + 1;
const handMiniVClick = () =>{
    setHasClicked(true)
    setCurrentIndex(upComingVideoIndex)
}
const getVideos = (index: number) => `/videos/hero-${index}.mp4`
const handleVideoLoad =()=>{
    setLoadedVideos(prev => prev + 1)
}

useGSAP(()=>{
    if(hasClicked){
        gsap.set('#next-video', {
            visibility: 'visible'
        });
        gsap.to('#next-video',{
        transformOrigin: "center center",
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => {
            nextVRef.current?.play();
          }
        })
        gsap.from('#current-video',{
            transformOrigin: 'center center'
        })
    }
}, {dependencies: [currentIndex], revertOnUpdate: true})

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
        <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
            <div className='mask-clip-path absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 size-64 overflow-hidden rounded-lg'>
                <div onClick={handMiniVClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                    <video ref={nextVRef} src={getVideos(upComingVideoIndex)} loop id='current-video' className='size-64 origin-center scale-150' onLoadedData={handleVideoLoad}/>
                </div>
            </div>
            <video ref={nextVRef} src={getVideos(currentIndex)} loop muted id="next-video" className='absolute-center invisible absolute z-20 size-64 object-cover object-center' onLoad={handleVideoLoad}/>
            <video src={getVideos(currentIndex === totalVideos-1 ? 1 : currentIndex)} autoPlay loop muted className='absolute left-0 top-0 size-full object-cover object-center'/>
        </div>
        <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'><b>Gaming</b></h1>
        <div className='absolute left-0 top-0 z-40 size-fit '>
            <div className='mt-24 px-5 sm:px-10'>
                <h1 className='spcial-font hero-heading text-blue-100'>redefi<b>n</b>e</h1>
                <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>Enter the Metagame Layer <br /> Unleash the Play Economy</p>
                <Button
                id = "watch-trailer"
                title='Watch Trailer'
                icon={TiLocationArrow}
                container='!bg-yellow-300 flex-center gap-1'
                />
            </div>

        </div>
    </div>
  )
}

export default Hero