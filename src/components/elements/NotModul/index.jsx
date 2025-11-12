import clsx from "clsx";
export function Component({ className = '', children = '' }) {

  return (
    <div className={clsx(className, "flex flex-col items-center justify-center text-center py-12 text-gray-500 animate-fade-in")}>
      <svg
        className="w-24 h-24 mb-4 animate-bounce"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75h4.5m-4.5 4.5h4.5M3 6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6z"
        />
      </svg>
      <p className="text-lg font-semibold">Tidak ada modul ditemukan</p>
      <p className="text-sm mt-1">{children}</p>
    </div>
  );
}

export default Component;