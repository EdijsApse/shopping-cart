const Spinner = () => {
  return (
    <div className="absolute min-h-20 w-full flex justify-center items-center rounded -z-1">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-cyan-400"></div>
    </div>
  );
};

export default Spinner;
