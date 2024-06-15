import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import './CheckOutForm.css'


const CheckOutForm = ({price, classes}) => {
    const {user} = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', {price})
        .then(res => {
            console.log(res.data.clientSecret);
            setClientClientSecret(res.data.clientSecret);
        })
    }, [price, axiosSecure])

    const handleSubmit = async event => {
        event.preventDefault();

        if(!stripe || !elements){
            
            return
        }

        const card = elements.getElement(CardElement);
        if(card === null){            
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card', 
            card
        })

        if(error){
            // console.log('error', error.message);
            setCardError(error.message)
        }
        else{
            // console.log('method', paymentMethod);
            setCardError('')
        }

        setProcessing(true)

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.displayName || 'unknown',
                  email: user?.email || 'annonymous'
                },
              },
            },
          );

        if(confirmError){
            setCardError(confirmError)
        }

        setProcessing(false)
        
        if(paymentIntent.status === 'succeeded'){
            setTransactionId(paymentIntent.id)
            //save payment info to server
            const payment = {
                email: user?.email, 
                transactionId: paymentIntent.id, 
                price, data: new Date(),
                quantity: classes.length,
                selectedItemId: classes.map(cls => cls._id),
                classId: classes.map(cls => cls.courseId),
                status: 'service pending',
                className: classes.map(cls => cls.course)
            }
            axiosSecure.post('/payments', payment)
            .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
                    //displayconfirm
                }
            })
        }
        
        
    }
    return (
        <>
            <form className="md:w-2/3 mx-auto p-10 rounded-lg bg-gray-50 my-10 text-center" onSubmit={handleSubmit}>
            <CardElement
                options={{
                style: {
                    base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    },
                    invalid: {
                    color: '#9e2146',
                    },
                },
                }}
            />
            <button className="px-5 mt-10 bg-gray-800 text-white py-1 rounded-lg" type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay
            </button>
            </form>
            {cardError && <p className="text-center text-red-500"><small>{cardError}</small></p>}
            {transactionId && <p className="text-center text-red-500"><small>Suceess! Transaction ID - <span className="font-bold text-gray-500 border p-2 px-5 rounded-md">{transactionId}</span></small></p>}
        </>
    );
};

export default CheckOutForm;