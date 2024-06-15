import { FaFacebookF, FaInstagram, FaLinkedinIn,  } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';

const Footer = () => {
    const {user} = useAuth()
    return (
        <footer className='bg-gray-700 text-white px-20 pt-32'>
            <div className='grid md:grid-cols-4 gap-10 '>
                <div>
                    <h1 className='text-3xl font-bold pb-5'>ACT SCHOOL</h1>
                    <div className='flex space-x-4'>
                        <FaFacebookF/>
                        <FaInstagram/>
                        <FaLinkedinIn/>
                    </div>
                </div>
                <div>
                    <h1 className='font-bold pb-5 text-lg text-gray-300'>Support</h1>
                    <ul>
                        <li>Contact Us</li>
                        <li>FAQ</li>
                        <li>Routine</li>
                        <li>Location</li>
                        <li>Productions</li>
                    </ul>
                </div>
                <div>
                    <h1 className='font-bold pb-5 text-lg text-gray-300'>More</h1>
                    <ul>
                        <li>About ACT SCHOOL</li>
                        <li>Careers</li>
                        <li>Newsroom</li>
                        <li>Legal Issues</li>
                        <li>Pre Booking</li>
                    </ul>
                </div>
                <div>
                    <h1 className='font-bold pb-5 text-lg text-gray-300'>Stay update from our newsletter</h1>
                    <input className='bg-transparent border-b w-full text-lg outline-none py-2' type="text" name="" id="" placeholder='Type your Email' />
                    <button className='px-5 py-2 bg-red-500 my-5'>Subscribe</button>
                </div>            
            </div>
            <p className='text-gray-400'><small>Application User: {user ? user.displayName : "Anonymous"}</small></p>
        <p className='text-center py-10 '><small>© Copyright: ACT SCHOOL</small></p>
        </footer>
    );
};

export default Footer;