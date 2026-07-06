import React from "react";
import { useNavigate } from "react-router-dom";
import { useJenjang, useModul, useCategories } from "../../hooks/useData";
import {
  Button,
  CardJenjang,
  CardModul,
  NotModul,
} from "../../components/elements";

function App() {
  const navigate = useNavigate();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();
  const { data: jenjang = [], isLoading: isLoadingJenjang } = useJenjang();
  const { data: modul, isLoading: isLoadingModul } = useModul({
    sort: "desc",
    limit: 4,
  });

  const latestModules = modul?.data || [];

  const handleClickModul = (type, id) => {
    if (!type || !id) {
      navigate("/list-modul");
      return;
    }

    navigate(`/list-modul?${type}=${id}`);
  };

  const renderLoading = (type, value = 4) =>
    [...Array(value)].map((_, index) => (
      <div
        key={index}
        className="animate-pulse rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="mb-5 h-24 rounded-md bg-slate-100" />
        {type === "modul" && (
          <>
            <div className="mb-3 h-4 w-4/5 rounded bg-slate-100" />
            <div className="h-4 w-1/2 rounded bg-slate-100" />
          </>
        )}
      </div>
    ));

  return (
    <div className="min-h-screen bg-[#f6f7f2] text-slate-800">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-left text-2xl font-black tracking-normal text-slate-950"
          >
            PAI Berbagi
          </button>

          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a className="transition hover:text-emerald-700" href="#kategori">
              Kategori
            </a>
            <a className="transition hover:text-emerald-700" href="#jenjang">
              Jenjang
            </a>
            <a className="transition hover:text-emerald-700" href="#modul">
              Modul
            </a>
            <button
              type="button"
              onClick={() => navigate("/contribute")}
              className="rounded-lg bg-slate-950 px-4 py-2.5 text-white shadow-lg shadow-slate-900/10 transition hover:bg-emerald-800"
            >
              Kontribusi
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative min-h-[720px] overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=85"
              alt="Kegiatan belajar bersama"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.95)_0%,rgba(15,23,42,0.82)_48%,rgba(15,23,42,0.42)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f6f7f2] to-transparent" />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl pb-4 text-white">
              <p className="mb-5 inline-flex rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
                Ruang berbagi modul Guru PAI
              </p>

              <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal md:text-6xl">
                Platform modul PAI yang rapi, hangat, dan siap dipakai.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                Temukan modul pembelajaran PAI berdasarkan kategori dan jenjang
                pendidikan untuk mendukung proses belajar mengajar yang lebih
                terarah.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#kategori"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-500"
                >
                  Jelajahi Kategori
                </a>
                <button
                  type="button"
                  onClick={() => navigate("/list-modul")}
                  className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Lihat Semua Modul
                </button>
              </div>
            </div>

            <div className="border border-white/20 bg-white/95 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
              <div className="grid gap-4 sm:grid-cols-[1fr_0.75fr]">
                <div className="rounded-lg bg-slate-950 p-6 text-white">
                  <p className="text-sm font-semibold text-emerald-200">
                    Ringkasan koleksi
                  </p>
                  <p className="mt-4 text-5xl font-black">{latestModules.length}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    modul terbaru siap dijelajahi dan digunakan untuk bahan ajar.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                    <p className="text-3xl font-black text-emerald-800">
                      {categories.length}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      Kategori
                    </p>
                  </div>
                  <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                    <p className="text-3xl font-black text-amber-700">
                      {jenjang.length}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      Jenjang
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5">
                <p className="text-sm font-bold text-slate-950">
                  Alur cepat pembelajaran
                </p>
                <div className="mt-4 grid gap-3 text-sm text-slate-600">
                  <p className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Pilih kategori materi yang dibutuhkan.
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Sesuaikan dengan jenjang pendidikan.
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-slate-500" />
                    Gunakan modul terbaru atau ikut berkontribusi.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/contribute")}
                className="mt-4 w-full rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                Bagikan Modul Ajar
              </button>
            </div>
          </div>
        </section>

        <section
          id="kategori"
          className="relative overflow-hidden bg-white px-5 py-16 md:px-8 md:py-20"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-50/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-amber-50/60 to-transparent" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="inline-flex rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                  Kategori
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
                  Pilih kategori edukasi
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-500">
                Materi dikelompokkan supaya guru lebih cepat menemukan modul
                yang sesuai dengan kebutuhan pembelajaran.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {isLoadingCategories
                ? renderLoading("category", 3)
                : categories.map((cat, index) => (
                    <button
                      key={cat.idKategori}
                      type="button"
                      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-950/10"
                      onClick={() =>
                        handleClickModul("kategori", cat.idKategori)
                      }
                    >
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-slate-900 opacity-0 transition group-hover:opacity-100" />
                      <span className="absolute right-5 top-5 text-4xl font-black text-slate-100 transition group-hover:text-emerald-100">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div
                        className={`relative mb-6 flex h-20 w-20 items-center justify-center rounded-xl ring-1 ring-black/5 transition group-hover:scale-105 ${
                          cat.color || "bg-emerald-50"
                        }`}
                      >
                        <img
                          src={cat.icon}
                          alt={cat.kategori}
                          className="h-12 w-12 object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-black text-slate-950 transition group-hover:text-emerald-800">
                        {cat.kategori}
                      </h3>
                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-sm font-semibold text-slate-500">
                          Lihat modul
                        </span>
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-white transition group-hover:bg-emerald-700 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </div>
                    </button>
                  ))}
            </div>
          </div>
        </section>

        <section
          id="jenjang"
          className="relative overflow-hidden bg-[#f6f7f2] px-5 py-16 md:px-8 md:py-20"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="inline-flex rounded-lg border border-amber-100 bg-amber-50 px-3 py-1.5 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
                Jenjang
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
                Temukan modul sesuai tingkat belajar
              </h2>
              <p className="mt-4 leading-7 text-slate-500">
                Pilih jenjang pendidikan agar materi yang ditampilkan lebih
                relevan, terarah, dan siap digunakan di kelas.
              </p>
            </div>

            <div className="mb-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {isLoadingJenjang
                ? renderLoading("jenjang", 4)
                : jenjang.map((item, index) => (
                    <div
                      key={item.idJenjang || item.id || item.jenjang}
                      className="group relative rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-950/10"
                    >
                      <span className="absolute -top-3 left-5 z-10 rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white shadow-lg shadow-slate-950/15">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-amber-400 via-emerald-500 to-slate-900 opacity-0 transition group-hover:opacity-100" />
                      <CardJenjang data={item} onClick={handleClickModul} />
                    </div>
                  ))}
            </div>

            <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm md:flex-row md:text-left">
              <div>
                <p className="text-sm font-bold text-slate-950">
                  Ingin melihat semua materi?
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Buka daftar lengkap untuk menjelajahi modul dari semua
                  jenjang pendidikan.
                </p>
              </div>
              <Button
                className="w-fit shrink-0"
                color="primary"
                onClick={() => handleClickModul()}
              >
                Lihat Semua
              </Button>
            </div>
          </div>
        </section>

        <section
          id="modul"
          className="relative overflow-hidden bg-slate-950 px-5 py-16 text-white md:px-8 md:py-20"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-emerald-950/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 to-transparent" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="inline-flex rounded-lg border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-sm font-bold uppercase tracking-[0.18em] text-emerald-200">
                  Terbaru
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-white md:text-4xl">
                  Modul pembelajaran terbaru
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  Koleksi terbaru yang bisa langsung dibuka untuk memperkaya
                  bahan ajar dan aktivitas belajar di kelas.
                </p>
              </div>

              {latestModules.length >= 1 && (
                <button
                  type="button"
                  className="w-fit rounded-lg border border-white/15 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-black/20 transition hover:bg-emerald-50"
                  onClick={() => navigate("/list-modul?sort=desc")}
                >
                  Lihat Semua
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {isLoadingModul ? (
                renderLoading("modul", 4)
              ) : latestModules.length === 0 ? (
                <div className="col-span-full rounded-xl border border-dashed border-emerald-300/40 bg-white/10 px-6 py-12 text-center shadow-2xl shadow-black/20 backdrop-blur">
                  <NotModul>
                    <p className="mb-4 text-sm text-slate-200">
                      Yuk jadi yang pertama berbagi modul ajar untuk Guru PAI!
                    </p>
                    <Button
                      onClick={() => navigate("/contribute")}
                      className="mx-auto rounded-lg px-4 py-2 font-medium transition duration-200"
                    >
                      Kontribusi Sekarang
                    </Button>
                  </NotModul>
                </div>
              ) : (
                latestModules.map((item, index) => (
                  <div
                    key={item.idModul || item.id || item.slug}
                    className="group relative rounded-xl border border-white/10 bg-white/95 p-2 text-slate-900 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/60 hover:shadow-2xl hover:shadow-emerald-950/30"
                  >
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-slate-950/90 px-3 py-1 text-xs font-black text-white shadow-lg shadow-black/20">
                      Baru {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-emerald-400 via-amber-300 to-white opacity-0 transition group-hover:opacity-100" />
                    <CardModul data={item} />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-emerald-100 bg-white px-5 py-6 text-center text-sm font-medium text-slate-500">
        <p>2026 PAI Berbagi. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
