import Link from "next/link";

const PaymentFailed = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-green-900 to-blue-900 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Payment Failed!
        </h2>
        <p className="text-lg text-gray-700">
          Sorry your payment was unsuccessful 😞. please try again.
        </p>
        <Link href="/">
          <div className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Continue Shopping
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;
