const gameCardClassNames = {
    container: "relative mx-auto w-[251px] h-[277px] rounded-2xl overflow-hidden transition duration-300 transform focus:scale-105 hover:shadow-lg hover:border-white-500",
    image: "w-full h-full object-cover hover:scale-110 transition-all duration-150 ",
    price:
      "absolute rounded-bl-2xl top-0 right-0 bg-primary p-3 text-lg font-semibold z-10 ",
    gameName:
      "absolute bottom-0 left-0 right-0 py-3 px-4 text-white font-bold text-lg bg-gray-900 bg-opacity-75  transition duration-300 transform hover:scale-110",
  };
  
  export default gameCardClassNames;