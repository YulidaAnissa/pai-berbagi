import React, { useState } from "react";
import {
  FaAndroid,
  FaArrowLeft,
  FaBook,
  FaCalendarPlus,
  FaChalkboardTeacher,
  FaDownload,
  FaExternalLinkAlt,
  FaFileAlt,
  FaGraduationCap,
  FaInfoCircle,
  FaLayerGroup,
  FaPlay,
  FaTiktok, // <-- 1. Import icon TikTok dari react-icons/fa
  FaUserAlt,
  FaWindows,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/elements/Breadcrumb";

export default function ModulDetailPage({ modul }) {
  const [showFullDesc, setShowFullDesc] = useState(false);

  if (!modul) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f6f7f2] px-5 text-center text-slate-800">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-950/5">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
            <FaBook size={24} />
          </div>
          <p className="mt-5 text-lg font-black text-slate-950">
            Data modul tidak ditemukan
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Modul mungkin sudah dipindahkan atau belum tersedia.
          </p>
          <Link
            to="/list-modul"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
          >
            <FaArrowLeft size={12} />
            Kembali ke daftar
          </Link>
        </div>
      </main>
    );
  }

  const title = modul?.title || modul?.judul || "Tanpa Judul";
  const author = modul?.author || modul?.name || "Penulis tidak diketahui";
  const jenjang = modul?.namaJenjang || modul?.jenjang || "-";
  const kategori = modul?.kategori || modul?.category || "Modul Ajar";
  const rawPreviewUrl = modul?.files || modul?.previewUrl || modul?.preview || modul?.urlPreview;
  const downloadUrl = modul?.downloadUrl || modul?.fileUrl || modul?.urlFile;
  const description = modul?.desc || modul?.description || "Deskripsi modul belum tersedia.";
  const shortDesc = description.slice(0, 420);
  const shouldCollapse = description.length > 420;
  const createdAt = modul?.createdAt ? new Date(modul.createdAt) : null;
  const formattedDate =
    createdAt && !Number.isNaN(createdAt.getTime())
      ? createdAt.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-";

  // 2. Fungsi deteksi dan konversi URL (Support YouTube & TikTok)
  const getEmbedUrl = (url) => {
    if (!url) return { url: null, type: null };

    // Cek apakah URL YouTube
    const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
    const ytMatch = url.match(ytRegExp);
    if (ytMatch && ytMatch[2].length === 11) {
      return {
        url: `https://www.youtube.com/embed/${ytMatch[2]}`,
        type: "youtube",
      };
    }

    // Cek apakah URL TikTok (Mengambil Video ID dari link tiktok.com/@user/video/ID)
    const ttRegExp = /tiktok\.com\/.*\/video\/(\d+)/;
    const ttMatch = url.match(ttRegExp);
    if (ttMatch && ttMatch[1]) {
      return {
        url: `https://www.tiktok.com/player/v1/${ttMatch[1]}`,
        type: "tiktok",
      };
    }

    // Jika format lain (misal langsung link embed atau lainnya)
    return { url, type: "other" };
  };

  const { url: previewUrl, type: previewType } = getEmbedUrl(rawPreviewUrl);

  const breadcrumbitems = [
    { link: "/list-modul", label: "Modul Pembelajaran" },
    { link: "", label: title },
  ];

  const detailItems = [
    {
      label: "Jenjang",
      value: jenjang,
      icon: <FaGraduationCap size={16} />,
      className: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Kategori",
      value: kategori,
      icon: <FaLayerGroup size={16} />,
      className: "bg-amber-50 text-amber-700",
    },
    {
      label: "Penerbit",
      value: author,
      icon: <FaUserAlt size={16} />,
      className: "bg-slate-100 text-slate-700",
    },
    {
      label: "Tanggal",
      value: formattedDate,
      icon: <FaCalendarPlus size={16} />,
      className: "bg-teal-50 text-teal-700",
    },
  ];

  const ActionLink = ({ href, children, icon, primary = false }) => {
    if (!href) return null;

    const isExternal = typeof href === "string" && href.startsWith("http");

    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition ${
          primary
            ? "bg-emerald-700 text-white shadow-lg shadow-emerald-950/15 hover:bg-emerald-800"
            : "border border-slate-200 bg-white text-slate-800 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
        }`}
      >
        {icon}
        {children}
      </a>
    );
  };

  return (
    <main className="min-h-screen bg-[#f6f7f2] text-slate-800">
      <header className="relative overflow-hidden bg-slate-950 px-5 pb-24 pt-6 text-white md:px-8">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=85"
            alt="Ruang belajar digital"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.98),rgba(15,23,42,0.9)_52%,rgba(6,78,59,0.68))]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f6f7f2] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <Breadcrumb className="font-medium text-slate-200" items={breadcrumbitems} />

          <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <div className="mt-7 flex flex-wrap gap-3 text-xs font-bold">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-slate-100 backdrop-blur">
                  {kategori}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-slate-100 backdrop-blur">
                  {jenjang}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-slate-100 backdrop-blur">
                  {formattedDate}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <p className="text-sm font-bold text-emerald-200">Diterbitkan oleh</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white text-emerald-700 shadow-lg shadow-black/10">
                  <FaUserAlt size={20} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-lg font-black text-white">{author}</p>
                  <p className="mt-1 text-sm font-medium text-slate-300">{jenjang}</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/10 bg-white/10 p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-200">
                    Kategori
                  </p>
                  <p className="mt-2 truncate text-sm font-black text-white">{kategori}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/10 p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">
                    Status
                  </p>
                  <p className="mt-2 text-sm font-black text-white">
                    {rawPreviewUrl || downloadUrl ? "Tersedia" : "Menunggu"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto -mt-14 grid max-w-7xl gap-6 px-4 pb-14 md:px-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/10">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-black text-slate-950">Pratinjau Modul</h2>
                <p className="mt-1 text-sm text-slate-500">{title}</p>
              </div>
              {/* 3. Dinamis Icon Berdasarkan Jenis Preview URL */}
              <div
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${
                  previewType === "youtube"
                    ? "bg-red-50 text-red-600"
                    : previewType === "tiktok"
                    ? "bg-slate-900 text-white"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {previewType === "youtube" && <FaYoutube size={20} />}
                {previewType === "tiktok" && <FaTiktok size={18} />}
                {previewType !== "youtube" && previewType !== "tiktok" && <FaFileAlt size={18} />}
              </div>
            </div>

            <div className="relative aspect-video bg-slate-950 flex items-center justify-center">
              {previewUrl ? (
                <iframe
                  title={title}
                  src={previewUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={`absolute inset-0 h-full w-full ${
                    previewType === "tiktok" ? "max-w-sm mx-auto" : ""
                  }`}
                />
              ) : (
                <div className="grid h-full place-items-center px-6 text-center">
                  <div>
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-lg bg-white/10 text-emerald-200 ring-1 ring-white/15">
                      <FaBook size={28} />
                    </div>
                    <p className="mt-4 text-base font-black text-white">
                      Pratinjau belum tersedia
                    </p>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-300">
                      File dapat dibuka melalui tombol aksi apabila pengelola sudah menambahkan tautan.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
            <div className="mb-5 flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                <FaInfoCircle size={18} />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-950">Deskripsi Modul</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Ringkasan materi dan cakupan pembelajaran.
                </p>
              </div>
            </div>

            <p className="text-sm leading-8 text-slate-600 md:text-base">
              {showFullDesc || !shouldCollapse ? description : `${shortDesc}...`}
            </p>

            {shouldCollapse && (
              <button
                type="button"
                onClick={() => setShowFullDesc((prev) => !prev)}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800 transition hover:border-emerald-700 hover:bg-emerald-700 hover:text-white"
              >
                {showFullDesc ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
              </button>
            )}
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-950/5">
            <div className="h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-slate-950" />
            <div className="p-5">
              <h2 className="text-lg font-black text-slate-950">Informasi Modul</h2>
              <div className="mt-5 grid gap-3">
                {detailItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/80 p-3"
                  >
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${item.className}`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        {item.label}
                      </p>
                      <p className="truncate text-sm font-black text-slate-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
            <h2 className="text-lg font-black text-slate-950">Akses Materi</h2>
            <div className="mt-5 grid gap-3">
              <ActionLink href={downloadUrl} icon={<FaDownload size={13} />} primary>
                Unduh Modul
              </ActionLink>
              <ActionLink href={rawPreviewUrl} icon={<FaPlay size={12} />}>
                Buka Pratinjau
              </ActionLink>
              <ActionLink href={modul?.androidUrl} icon={<FaAndroid size={14} />}>
                Buka di Android
              </ActionLink>
              <ActionLink href={modul?.windowsUrl} icon={<FaWindows size={14} />}>
                Buka di Windows
              </ActionLink>

              {!downloadUrl && !rawPreviewUrl && !modul?.androidUrl && !modul?.windowsUrl && (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-center">
                  <p className="text-sm font-black text-slate-950">Belum ada tautan</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Materi akan muncul setelah pengelola menambahkan file.
                  </p>
                </div>
              )}
            </div>
          </section>

          <Link
            to="/list-modul"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-emerald-800"
          >
            <FaExternalLinkAlt size={12} />
            Lihat modul lain
          </Link>
        </aside>
      </section>
    </main>
  );
}