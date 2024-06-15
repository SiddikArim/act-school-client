import React from 'react';
import CheckOutForm from './CheckOutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useSelectedClasses from '../../../Hooks/useSelectedClasses';

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK)
const Payment = () => {
    const [classes] = useSelectedClasses();
    const total = classes.reduce((sum, item) => sum + parseInt(item.price), 0);
    const price = parseFloat(total.toFixed(2));
    return (
        <div className='h-screen w-full'>
            <h1 className="text-xl text-gray-500 py-5 bg-gray-100 text-center ">Please Process Payment</h1>
            <div className='md:w-2/5 mx-auto bg-gray-50 mt-10 py-10'>
                <h1 className='pb-5 text-center text-2xl font-bold text-gray-400'>ACT SCHOOL</h1>
                <p className='text-center text-xl'>Total Payable: <span className='font-semibold'>$
                {total}</span></p>
                <hr className='mt-5' />
                <div className='flex justify-evenly mt-5'>
                <p><small>Refund Policy</small></p>
                <p><small>Terms</small></p>
                </div>
            </div>
            <Elements stripe={stripePromise}>
                <CheckOutForm price={price} classes={classes}></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;