import React from 'react';
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const referenceNum = searchParams.get("reference");

    return (
        <div className="min-h-screen flex justify-center items-center bg-transparent">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">Order Successful</h1>
                <p className="text-gray-600">Reference No. {referenceNum}</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
