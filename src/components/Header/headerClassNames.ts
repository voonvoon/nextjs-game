const headerClassNames = {
  header: "fixed w-full top-0 left-0 z-20 bg-black text-white",
  container: "container mx-auto py-4 px-1 flex items-center justify-between",
  logoContainer: "flex items-center",
  logo: "font-bold  md:text-xl hover:text-primary-light",
  nav: "",
  ul: "flex space-x-6",
  li: "",
  link: "hover:text-primary-light relative",
  cart: "absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-primary border-2 border-white rounded-full -top-2 -right-2",
  contactUs: "px-6 py-2 rounded-md bg-primary hover:bg-primary-dark",
  orders:
    "px-3 py-2 rounded-md bg-primary hover:bg-primary-dark  text-xs sm:text-base",
  signupBtn:
    "bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded sm:text-base",
  signinBtn:
    "bg-blue-500 flex items-center justify-center hover:bg-blue-700 text-white font-bold py-2 px-2 rounded m-1 text-xs sm:text-base",
  logoutBtn:
    "bg-blue-500 ml-4 flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  text-xs sm:text-base",
};

export default headerClassNames;
