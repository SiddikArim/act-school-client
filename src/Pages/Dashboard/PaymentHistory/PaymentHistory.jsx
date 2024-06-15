import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {

    const [axiosSecure] = useAxiosSecure();
    const [paymentHistory, setPaymentHistory] = useState([]);

    useEffect(() => {
        axiosSecure.get('/payments')
        .then(res => {            
            // const response = res.data.paymentsHistory.map(item => item.className)
            setPaymentHistory(res.data?.paymentsHistory)            
        })
    }, [axiosSecure])

    return (
        <div className='h-screen w-full'>
            <h1 className="text-xl text-gray-500 py-5 bg-gray-100 text-center ">Payment History</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Transaction ID</th>
                        <th>Paid Amount</th>
                        <th>Email</th>

                    </tr>
                    </thead>
                    <tbody>
                    
                    {
                        paymentHistory.map((payment, index) => <tr
                        key={payment._id}
                        >
                            <th>{index + 1}</th>
                            <td>{payment?.className}</td>
                            <td>{payment?.transactionId}</td>
                            <td className='text-right'>$ {payment?.price}</td>
                            <td>{payment?.email}</td>
                        </tr>
                            
                            )
                    }
                    
                    </tbody>
                </table>
                </div>
            
        </div>
    );
};

export default PaymentHistory;