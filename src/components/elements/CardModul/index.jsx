import Button from "../Button";
import {
  FaArrowRight,
  FaBookOpen,
  FaGraduationCap,
  FaUserAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Component({ data }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/modul/${data?.idModul}`);
  };

  const content = [
    {
      key: "jenjang",
      label: "Tingkat Pendidikan",
      value: data?.jenjang || "-",
      icon: <FaGraduationCap size={14} />,
    },
    {
      key: "publisher",
      label: "Dipublikasikan oleh",
      value: data?.name || "Penulis tidak diketahui",
      icon: <FaUserAlt size={14} />,
    },
  ];

  return (
    <article className="group relative h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-950/10">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-slate-950 transition" />

      <div className="relative hidden h-44 w-full overflow-hidden bg-slate-950 md:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.42),transparent_34%),linear-gradient(135deg,rgba(16,185,129,0.24),rgba(245,158,11,0.14),rgba(15,23,42,0.96))]" />
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/10" />
        <div className="absolute -bottom-12 left-8 h-28 w-28 rounded-full border border-emerald-300/20" />
        <div className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-lg bg-white/10 text-emerald-100 ring-1 ring-white/15 backdrop-blur transition group-hover:scale-105 group-hover:bg-white/15">
          <FaBookOpen size={20} />
        </div>

        <div className="relative flex h-full flex-col justify-end p-6">
          <span className="mb-3 w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-100 ring-1 ring-white/15 backdrop-blur">
            Modul Ajar
          </span>
          <p className="font-bungee text-lg font-semibold uppercase tracking-normal text-white line-clamp-2">
            {data?.title || "Tanpa Judul"}
          </p>
        </div>
      </div>

      <div className="grid gap-4 p-5 text-left">
        <div className="md:hidden">
          <span className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
            Modul Ajar
          </span>
        </div>

        <div>
          <h3 className="text-lg font-black leading-snug text-slate-950 line-clamp-2">
            {data?.title || "Tanpa Judul"}
          </h3>
          <div className="mt-3 h-px w-full bg-gradient-to-r from-emerald-100 via-slate-100 to-transparent" />
        </div>

        <div className="space-y-3">
          {content.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/80 p-3 text-sm text-slate-600 transition group-hover:border-emerald-100 group-hover:bg-emerald-50/40"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-emerald-700 shadow-sm ring-1 ring-slate-100 transition group-hover:text-emerald-800">
                {item.icon}
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-medium text-slate-400">
                  {item.label}
                </span>
                <span className="block truncate font-semibold text-slate-700">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleClick}
          size="small"
          variant="ghost"
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-2.5 font-bold text-emerald-800 transition duration-300 hover:border-emerald-700 hover:bg-emerald-700 hover:text-white"
        >
          Lihat Selengkapnya
          <FaArrowRight size={12} />
        </Button>
      </div>
    </article>
  );
}

export default Component;
