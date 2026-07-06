import { FaBookOpen } from "react-icons/fa";

export function Component() {
  return (
    <div className="flex min-h-[320px] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-emerald-100 bg-white text-center shadow-xl shadow-emerald-950/5">
        <div className="h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-slate-900" />

        <div className="p-8">
          <div className="relative mx-auto grid h-20 w-20 place-items-center">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 border-r-amber-400 animate-spin" />
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
              <FaBookOpen size={22} />
            </div>
          </div>

          <p className="mt-6 text-lg font-black text-slate-950">
            Memuat modul
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Mohon tunggu sebentar, daftar modul sedang disiapkan.
          </p>

          <div className="mt-7 space-y-3">
            <div className="mx-auto h-3 w-full max-w-xs animate-pulse rounded-full bg-slate-100" />
            <div className="mx-auto h-3 w-4/5 animate-pulse rounded-full bg-slate-100" />
            <div className="mx-auto h-3 w-2/3 animate-pulse rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;