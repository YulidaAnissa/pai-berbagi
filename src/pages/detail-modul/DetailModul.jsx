import {
  FaArrowRight,
  FaBookOpen,
  FaDownload,
  FaEye,
  FaGraduationCap,
  FaPlay,
  FaTags,
  FaUserAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Component({ data }) {
  const navigate = useNavigate();

  const title = data?.title || data?.judul || "Tanpa Judul";
  const author = data?.author || data?.name || "Penulis tidak diketahui";
  const jenjang = data?.namaJenjang || data?.jenjang || "-";
  const coverUrl = data?.coverUrl || data?.cover || data?.thumbnail;
  const downloadUrl = data?.downloadUrl || data?.fileUrl || data?.urlFile;
  const previewUrl = data?.previewUrl || data?.preview || data?.urlPreview;
  const views = data?.views || data?.view || data?.totalViews || 0;
  const tags = (
    Array.isArray(data?.tags)
      ? data.tags.map((tag) => tag?.label || tag?.name || tag?.kategori || tag)
      : [data?.kategori, data?.category].filter(Boolean)
  ).map(String);
  const detailId = data?.idModul || data?.id || data?.slug;

  const handleClick = () => {
    navigate(detailId ? `/modul/${detailId}` : "/list-modul");
  };

  const handlePreview = () => {
    if (previewUrl) {
      window.open(previewUrl, "_blank", "noopener,noreferrer");
      return;
    }

    handleClick();
  };

  const content = [
    {
      key: "jenjang",
      label: "Tingkat Pendidikan",
      value: jenjang,
      icon: <FaGraduationCap size={14} />,
    },
    {
      key: "publisher",
      label: "Dipublikasikan oleh",
      value: author,
      icon: <FaUserAlt size={14} />,
    },
  ];

  return (
    <article className="group relative h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-950/10">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-slate-950 transition" />
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover ${title}`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.42),transparent_34%),linear-gradient(135deg,rgba(16,185,129,0.24),rgba(245,158,11,0.14),rgba(15,23,42,0.96))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
        <div className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-lg bg-white/10 text-emerald-100 ring-1 ring-white/15 backdrop-blur transition group-hover:scale-105 group-hover:bg-white/15">
          <FaBookOpen size={18} />
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <span className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-100 ring-1 ring-white/15 backdrop-blur">
            Modul Ajar
          </span>
          <h3 className="text-xl font-black leading-snug text-white line-clamp-2">
            {title}
          </h3>
        </div>
      </div>

      <div className="grid gap-4 p-5 text-left">
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

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handlePreview}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
          >
            <FaPlay size={12} />
            Pratinjau
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              <FaDownload size={12} />
              Unduh
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 transition duration-300 hover:border-emerald-700 hover:bg-emerald-700 hover:text-white"
        >
          Simak Modul Ajar
          <FaArrowRight size={12} />
        </button>

        <div className="flex items-center gap-2 border-t border-slate-100 pt-3 text-sm font-medium text-slate-500">
          <FaEye className="text-slate-400" size={14} />
          {views} kali dilihat
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
              <FaTags size={10} />
              Tag
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default Component;
