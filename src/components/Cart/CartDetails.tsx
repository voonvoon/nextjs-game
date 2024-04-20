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
  //   checkoutHandler: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, cartItems }) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const checkoutHandler = async () => {
    const { data } = await axios.post("/api/chip", {
      cartItems,
      userEmail: session?.user?.email,
      formData
    });
    if (!data) return;
    console.log("let see sessions yoy===>", data);
    window.location.href = data.checkout_url;

    //remove all from cart after clicked checkout
    dispatch(removeAllItemsFromCart());
  };

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postcode: "",
    state:"",
    phone: "",
  });

  console.log("formData=====>>>>", formData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white w-96 rounded-lg p-8">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-2 p-2 text-gray-500 hover:text-gray-700"
          >
            X
          </button>
          <h2 className="text-2xl mb-4">Modal Title</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="address">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="city">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="postcode">
                Postcode:
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="city">
                State:
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="phone">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              onClick={checkoutHandler}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Proceed to pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
