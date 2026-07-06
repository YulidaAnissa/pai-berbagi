import clsx from "clsx";
import { FaBook, FaFilter, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Component({ className = "", children = "" }) {
  return (
    <div
      className={clsx(
        className,
        "relative overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/40 to-amber-50/50 px-6 py-14 text-center shadow-xl shadow-emerald-950/5"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-slate-900" />
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {children || "Coba sesuaikan kata kunci, ubah filter, atau lihat semua modul yang tersedia."}
      </p>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/list-modul"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/10 transition hover:bg-emerald-800"
        >
          <FaFilter size={13} />
          Reset pencarian
        </Link>

        <Link
          to="/contribute"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-200 bg-white px-5 py-3 text-sm font-bold text-amber-700 transition hover:bg-amber-50"
        >
          <FaPlus size={12} />
          Kontribusi modul
        </Link>
      </div>
    </div>
  );
}

export default Component;