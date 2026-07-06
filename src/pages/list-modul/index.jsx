import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  CardModul,
  FilterRadio,
  LoadingModul,
  NotModul,
} from "../../components/elements";
import InputSearch from "../../components/forms/InputSearch";
import { SORTING } from "../../constants";
import { useCategories, useJenjang, useModul } from "../../hooks/useData";
import { useSearchParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import {
  FaBookOpen,
  FaBook,
  FaFilter,
  FaGraduationCap,
  FaLayerGroup,
  FaMagic,
  FaSortAmountDown,
} from "react-icons/fa";

function App() {
  const [search, setSearch] = useState(null);
  const [selectedJenjang, setSelectedJenjang] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState("asc");
  const [searchParams, setSearchParams] = useSearchParams();

  const { data = [], isLoading } = useJenjang();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();

  const { data: modul, isLoading: isLoadingModul } = useModul({
    id: selectedJenjang,
    search: search ?? "",
    sort: selectedSort ?? "",
    kategori: selectedCategory,
  });

  useEffect(() => {
    const jenjangParam = searchParams.get("jenjang");
    const sortParam = searchParams.get("sort");
    const kategoriParam = searchParams.get("kategori");
    const searchParam = searchParams.get("search");

    setSelectedJenjang(Number(jenjangParam) || null);
    setSelectedCategory(Number(kategoriParam) || null);
    setSelectedSort(sortParam || "");
    setSearch(searchParam || null);
  }, [searchParams]);

  const updateSearchParams = (newParams = {}, removeKeys = []) => {
    const currentParams = Object.fromEntries([...searchParams.entries()]);

    removeKeys.forEach((key) => {
      delete currentParams[key];
    });

    const mergedParams = { ...currentParams, ...newParams };
    const cleanedParams = Object.fromEntries(
      Object.entries(mergedParams).filter(([key, value]) => {
        if (value === null || value === undefined || value === "") return false;
        if (key === "jenjang") return !Number.isNaN(Number(value));
        return true;
      })
    );

    setSearchParams(cleanedParams);
  };

  const handleSearch = () => {
    updateSearchParams({ search });
  };

  const hasActiveFilter =
    searchParams.get("jenjang") || searchParams.get("sort") || searchParams.get("kategori");
  const activeFilterCount = ["jenjang", "kategori", "sort", "search"].filter((key) =>
    searchParams.get(key)
  ).length;

  const breadcrumbitems = [{ link: "", label: "Modul Pembelajaran" }];

  const resetFilters = () => {
    updateSearchParams({}, ["jenjang", "sort", "kategori"]);
    setSelectedJenjang(null);
    setSelectedSort(null);
    setSelectedCategory(null);
  };

  const renderFilter = () => {
    return (
      <aside className="col-span-5 text-left md:col-span-2">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-950/5 md:sticky md:top-24">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-5 text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-bold text-emerald-200">
                  <FaFilter size={13} />
                  Filter Pencarian
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-300">
                  Persempit hasil berdasarkan jenjang, kategori, dan urutan.
                </p>
              </div>

              {hasActiveFilter && (
                <button
                  onClick={resetFilters}
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-3 md:block md:space-y-6">
            <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-4 md:border-0 md:bg-transparent md:p-0">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-black text-slate-800">
                <FaGraduationCap className="text-emerald-700" />
                Jenjang
              </h4>
              <FilterRadio
                data={data}
                isLoading={isLoading}
                selected={searchParams.get("jenjang") ? Number(searchParams.get("jenjang")) : null}
                setSelected={setSelectedJenjang}
                queryKey="jenjang"
                valueKey="idJenjang"
                labelKey="jenjang"
                updateSearchParams={updateSearchParams}
              />
            </div>

            <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-4 md:border-t md:border-x-0 md:border-b-0 md:bg-transparent md:p-0 md:pt-6">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-black text-slate-800">
                <BiCategory className="text-amber-600" />
                Kategori
              </h4>
              <FilterRadio
                data={categories}
                isLoading={isLoadingCategories}
                selected={searchParams.get("kategori") ? Number(searchParams.get("kategori")) : null}
                setSelected={setSelectedCategory}
                queryKey="kategori"
                valueKey="idKategori"
                labelKey="kategori"
                updateSearchParams={updateSearchParams}
              />
            </div>

            <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-4 md:border-t md:border-x-0 md:border-b-0 md:bg-transparent md:p-0 md:pt-6">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-black text-slate-800">
                <FaSortAmountDown className="text-slate-700" />
                Urutkan
              </h4>
              <FilterRadio
                data={SORTING}
                isLoading={false}
                selected={searchParams.get("sort")}
                setSelected={setSelectedSort}
                queryKey="sort"
                valueKey="value"
                labelKey="label"
                updateSearchParams={updateSearchParams}
              />
            </div>

            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4 sm:col-span-3 md:col-span-1">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                Tips
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Gabungkan filter jenjang dan kategori untuk hasil yang lebih
                tepat.
              </p>
            </div>
          </div>
        </div>
      </aside>
    );
  };

  const Tag = ({ label, onRemove }) => (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
      {label}
      <button
        type="button"
        className="grid h-5 w-5 place-items-center rounded-full bg-white text-emerald-800 transition hover:bg-red-50 hover:text-red-600"
        onClick={onRemove}
      >
        &times;
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f6f7f2] text-slate-800">
      <header className="relative overflow-hidden bg-slate-950 px-5 pb-16 pt-12 text-white md:px-8 md:pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=85"
            alt="Belajar dengan modul digital"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.96),rgba(15,23,42,0.82),rgba(15,23,42,0.52))]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f6f7f2] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl space-y-8">
          <Breadcrumb className="font-medium text-slate-200" items={breadcrumbitems} />

          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h1 className="mt-4 max-w-3xl text-left text-4xl font-black leading-tight tracking-normal md:text-5xl">
                Temukan modul pembelajaran dengan tampilan yang lebih nyaman.
              </h1>
              <p className="text-left mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                Gunakan pencarian dan filter untuk menemukan materi PAI sesuai
                jenjang, kategori, serta urutan yang Anda butuhkan.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-xs font-bold text-slate-200">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur">
                  Filter cepat
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur">
                  Koleksi terkurasi
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur">
                  Siap digunakan
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <InputSearch
                className="h-12 rounded-lg bg-white shadow-lg text-black shadow-black/10"
                placeholder="Cari Modul Pembelajaran..."
                onSearch={handleSearch}
                onChange={(e) => setSearch(e.target.value)}
                value={search ?? ""}
              />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">
                    <FaLayerGroup />
                    Kategori
                  </p>
                  <p className="mt-2 text-3xl font-black text-white">
                    {categories.length}
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-200">
                    <FaGraduationCap />
                    Jenjang
                  </p>
                  <p className="mt-2 text-3xl font-black text-white">
                    {data.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="-mt-6 mx-auto grid max-w-7xl grid-cols-5 gap-6 px-4 pb-12 md:grid-cols-7 md:px-8">
        {renderFilter()}

        <div className="col-span-5 space-y-5 md:sticky">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5">
            <div className="h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-slate-950" />
            <div className="p-5">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="flex items-center gap-2 text-sm font-black text-slate-950">
                    <FaBookOpen className="text-emerald-700" />
                    Hasil pencarian
                  </p>
                  {!isLoadingModul && modul?.count > 0 && (
                    <p className="mt-1 text-sm text-slate-500">
                      Menampilkan{" "}
                      <span className="font-bold text-slate-900">{modul.count}</span> modul
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {activeFilterCount > 0 && (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                      {activeFilterCount} filter aktif
                    </span>
                  )}
                  {/* {search && (
                    <Tag
                      label={search}
                      onRemove={() => {
                        setSearch(null);
                        updateSearchParams({}, ["search"]);
                      }}
                    />
                  )} */}
                </div>
              </div>
            </div>
          </div>

          {isLoadingModul ? (
            <LoadingModul />
          ) : modul && modul.count > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {modul?.data?.map((item) => (
                <CardModul key={item.idModul || item.id || item.slug || item.title} data={item} />
              ))}
            </div>
          ) : (
            <NotModul className="rounded-xl border border-dashed border-emerald-200 bg-white p-8 text-center shadow-sm shadow-slate-950/5">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                <FaBookOpen size={50} />
              </div>
              <p className="text-base font-black text-slate-900">Tidak ada hasil</p>
              <p className="mb-5 mt-2 text-sm text-slate-500">
                Coba ubah kata kunci pencarian atau pilih filter lain.
              </p>
            </NotModul>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
