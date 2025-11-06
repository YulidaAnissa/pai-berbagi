import clsx from "clsx";
export function Component({ className = '' }) {

  return (
    <div className="animate-pulse">
      <div className={clsx(className, 'h-4 bg-gray-300 rounded')}/>
    </div>

  );
}

export default Component;