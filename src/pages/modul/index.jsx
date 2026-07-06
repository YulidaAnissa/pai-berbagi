import ModulDetail from "./detail";
import { useModulById } from "../../hooks/useData";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBookOpen,
  FaExclamationCircle,
  FaSpinner,
} from "react-icons/fa";

const DetailPage = () => {
  const { idModul } = useParams();
  const { data: modul, isLoading } = useModulById(idModul);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f6f7f2] px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
        <section className="mx-auto grid min-h-[70vh] max-w-4xl place-items-center">
          <div className="w-full max-w-xl rounded-xl border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-emerald-950/5">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
              <FaSpinner size={26} className="animate-spin" />
            </div>
            <p className="mt-6 text-xl font-black text-slate-950">
              Memuat detail modul
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Sebentar ya, data modul sedang disiapkan untuk ditampilkan.
            </p>

            <div className="mt-8 grid gap-3">
              <div className="h-4 animate-pulse rounded-full bg-slate-100" />
              <div className="h-4 w-4/5 animate-pulse rounded-full bg-slate-100" />
              <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!modul) {
    return (
      <main className="min-h-screen bg-[#f6f7f2] px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
        <section className="mx-auto grid min-h-[70vh] max-w-4xl place-items-center">
          <div className="w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white text-center shadow-xl shadow-slate-950/5">
            <div className="h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-slate-950" />
            <div className="p-8">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-lg bg-amber-50 text-amber-700">
                <FaExclamationCircle size={28} />
              </div>
              <p className="mt-6 text-xl font-black text-slate-950">
                Modul tidak ditemukan
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Modul mungkin sudah dipindahkan, dihapus, atau tautannya tidak
                sesuai.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/list-modul"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/10 transition hover:bg-emerald-800"
                >
                  <FaBookOpen size={14} />
                  Lihat daftar modul
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <FaArrowLeft size={13} />
                  Kembali ke beranda
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return <ModulDetail modul={modul} />;
};

export default DetailPage;
