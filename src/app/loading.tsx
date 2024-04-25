export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-200"></div>
      </div>
    </div>
  );
}
