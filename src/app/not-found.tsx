export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        {/* <img
          src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Page Not Found"
          className="w-64 h-64 mb-8"
        /> */}
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-700">
          Oops! The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
