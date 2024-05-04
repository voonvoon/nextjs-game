"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch } from "@/hooks/storeHook";
import { removeAllItemsFromCart } from "@/redux/features/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: {};
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, cartItems }) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    state: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  //console.log("formData=====>>>>", formData);

  const checkoutHandler = async () => {
    setLoading(true);
    const { data } = await axios.post("/api/chip", {
      cartItems,
      userEmail: session?.user?.email,
      formData,
    });
    if (!data) return;
    console.log("let see sessions yoy===>", data);
    window.location.href = data.checkout_url;
    //remove all from cart after clicked checkout
    dispatch(removeAllItemsFromCart());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkoutHandler();
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto  ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white w-96 rounded-lg p-4">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-2 p-2 text-gray-500 hover:text-gray-700"
          >
            X
          </button>
          <h2 className="text-2xl mb-1">Shipping Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              {/* htmlFor="name" links the label to the input element with the corresponding id */}
              <label className="block" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                //className="border border-gray-300 p-2 w-full focus:border-blue-300 focus:outline-none"
                className="border-b border-gray-300 focus:border-blue-300 focus:outline-none transition-colors duration-300 ease-in-out px-2 w-full"
                required
              />
              <span></span>
            </div>
            {session?.user?.email ? (
              ""
            ) : (
              <div className="mb-1">
                <label className="block" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  //className="border border-gray-300 p-2 w-full focus:border-blue-300 focus:outline-none"
                  className="border-b border-gray-300 focus:border-blue-300 focus:outline-none transition-colors duration-300 ease-in-out px-2 w-full"
                  required
                />
                <span></span>
              </div>
            )}

            <div className="mb-1">
              <label className="block" htmlFor="address">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                //className="border border-gray-300 p-2 w-full focus:border-blue-300 focus:outline-none"
                className="border-b border-gray-300 focus:border-blue-300 focus:outline-none transition-colors duration-300 ease-in-out px-2 w-full"
                required
              />
              <span></span>
            </div>
            <div className="mb-1">
              <label className="block" htmlFor="city">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                //className="border border-gray-300 p-2 w-full focus:border-blue-300 focus:outline-none"
                className="border-b border-gray-300 focus:border-blue-300 focus:outline-none transition-colors duration-300 ease-in-out px-2 w-full"
                required
              />
              <span></span>
            </div>
            <div className="mb-1">
              <label className="block" htmlFor="postcode">
                Postcode:
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                //className="border border-gray-300 p-2 w-full focus:border-blue-300 focus:outline-none"
                className="border-b border-gray-300 focus:border-blue-300 focus:outline-none transition-colors duration-300 ease-in-out px-2 w-full"
                required
              />
              <span></span>
            </div>
            <div className="mb-1">
              <label className="block" htmlFor="city">
                State:
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                //className="border border-gray-300 p-2 w-full focus:border-blue-300 focus:outline-none"
                className="border-b border-gray-300 focus:border-blue-300 focus:outline-none transition-colors duration-300 ease-in-out px-2 w-full"
                required
              />
              <span></span>
            </div>
            <div className="mb-1">
              <label className="block" htmlFor="phone">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                //className="border border-gray-300 p-2 w-full focus:border-blue-300 focus:outline-none"
                className="border-b border-gray-300 focus:border-blue-300 focus:outline-none transition-colors duration-300 ease-in-out px-2 w-full"
                required
              />
              <span></span>
            </div>
            <button
              type="submit"
              //onClick={checkoutHandler}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
              //   disabled={!formValid}
            >
              {/* {loading ? "Please Wait..." : "Pay Now"} */}
              {loading ? (
                <div className="flex items-center">
                  <span className="mr-2">Please Wait...</span>
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-200"></div>
                </div>
              ) : (
                <span>Pay Now</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
