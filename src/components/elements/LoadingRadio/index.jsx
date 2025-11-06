
export function Component() {

  return (
    <div className="space-y-4 animate-pulse">
      {[1,2,3,4].map((_, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="h-5 w-5 bg-gray-300 rounded-full" /> {/* Radio circle */}
          <div className="h-4 w-32 bg-gray-300 rounded" /> {/* Label text */}
        </div>
      ))}
    </div>
  );
}

export default Component;