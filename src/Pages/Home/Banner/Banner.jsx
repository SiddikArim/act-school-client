import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <Carousel>
                <div>
                    <div>
                        <h1 className="text-white top-20 left-12 md:text-3xl text-left font-bold absolute z-1 md:left-40 md:top-48">Choices is yours! <br /> <span className="font-normal">Teaching students for over 11 years!!!</span> <br /> <br /> <Link to='/register' className="px-10 border hover:bg-gray-800 hover:text-white transition-shadow py-2">Join Us</Link></h1>
                        <img className="rounded-lg" src="https://i.ibb.co/LRqxf1r/banner1.jpg" />
                        {/* <p className="legend">Stage Show - 12-4-2023</p> */}
                    </div>
                </div>

                <div>
                    <div>
                        <img className="rounded-lg" src="https://i.ibb.co/517tHXS/banner1.jpg" />
                        {/* <p className="legend">Stage Show - 12-4-2023</p> */}
                    </div>
                </div>

                <div className="h-full">
                    <div className="bg-red-600 py-2 w-full h-full flex justify-center items-center">
                        <h1 className="text-3xl font-bold uppercase text-white">Come <Link className="border px-2 hover:bg-white hover:text-red-600 py-1 " to='/register'>Join Us</Link> Today</h1>     
                    </div>                                 
                </div>
            </Carousel>
    );
};

export default Banner;