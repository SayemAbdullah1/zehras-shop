// import video from '@assets/video.mp4'
import pic from './../assets/1.png'
export default function Slider() {
    return (
        <div className="my-12 mx-6  rounded-md bg-purple-100 border-green-700 border-4 flex justify-between ">
            <div className=" sm:flex-col lg:flex py-12 mx-auto my-auto align-center justify-center">
                <div>
                    <p>
                        <span className="text-xl">SHOP THE</span><br />
                        <span className="text-3xl">ESSENTIAL COLLECTION</span>
                    </p>
                    <button className="px-24 mt-4 text-white bg-green-500 py-4 hover:bg-green-900">SHOP APPAREL</button>
                </div>
                {/* <div className="w-0 h-48 
                border-l-[50px] border-l-transparent
                border-t-[175px] border-t-sky-300
                border-r-[350px] border-r-transparent">
                    
                </div> */}
            </div>

            <div className='lg:w-[800px] sm:w-full'>
                {/* <video src={video} loop autoPlay muted></video> */}
                <img src={pic} alt="" />
            </div>
        </div>
    );
}
