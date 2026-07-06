import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useJenjang, usePostModul, useCategories } from '../../hooks/useData';
import {
  Breadcrumb,
  ModalDetailModul,
  ModalLoading,
  SuccessModal,
} from '../../components/elements';

export default function ContributeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [fileName, setFileName] = useState('');
  const [previewURL, setPreviewURL] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModul, setShowModul] = useState(false);
  const [kategori, setKategori] = useState(3);
  const navigate = useNavigate();

  const { data: jenjangList = [] } = useJenjang();
  const { postModul, isLoading, responseData } = usePostModul();
  const { data: categories = [] } = useCategories();

  const selectedCategory = categories.find((item) => item.idKategori === kategori);
  const isPdfCategory = kategori === 3;
  const breadcrumbItems = [{ link: '', label: 'Kontribusi Modul' }];

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('idJenjang', data.idJenjang);
    formData.append('title', data.title);
    formData.append('desc', data.desc);
    formData.append('name', data.name);
    formData.append('idKategori', kategori);

    if (isPdfCategory) {
      formData.append('file', data.file[0]);
    } else {
      formData.append('link', data.link);
    }

    const result = await postModul(formData);

    if (result) {
      setShowModal(true);
      reset();
      setFileName('');
      setPreviewURL(null);
    } else {
      alert('Gagal mengirim modul.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      setPreviewURL(URL.createObjectURL(file));
      return;
    }

    setFileName('');
    setPreviewURL(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowModul(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      {showModal && <SuccessModal onClose={handleCloseModal} />}
      {isLoading && <ModalLoading />}
      {showModul && (
        <ModalDetailModul modul={responseData?.data} onClose={() => setShowModul(false)} />
      )}

      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=85"
          alt="Ruang belajar"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.35),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.94),rgba(30,41,59,0.84)_48%,rgba(15,23,42,0.96))]" />
      </div>

      <section className="relative z-10 mx-auto w-full max-w-6xl">
        <Breadcrumb
          className="mb-8 w-fit rounded-full border border-white/15 bg-white/10 px-3 py-2 text-white shadow-lg shadow-slate-950/10 backdrop-blur"
          items={breadcrumbItems}
          labelHome="Beranda"
          divider=">"
        />

        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="pt-4 text-white lg:sticky lg:top-10">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-sky-100 backdrop-blur">
            Kontribusi Modul Ajar
          </span>
          <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
            Bagikan materi belajar dengan tampilan yang lebih rapi.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-200">
            Lengkapi informasi modul, pilih kategori, lalu unggah PDF atau tautan materi agar mudah
            ditemukan oleh pengguna lain.
          </p>

          <div className="mt-8 grid max-w-md gap-3 text-sm text-slate-100">
            <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="font-semibold">Kategori aktif</p>
              <p className="mt-1 text-slate-300">{selectedCategory?.kategori || 'Pilih kategori modul'}</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="font-semibold">Format unggahan</p>
              <p className="mt-1 text-slate-300">
                {isPdfCategory ? 'File PDF dengan pratinjau otomatis' : 'Tautan materi digital'}
              </p>
            </div>
          </div>
        </aside>

        <div className="rounded-2xl border border-white/20 bg-white/95 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-8">
          <div className="border-b border-slate-200 pb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              Formulir Modul
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Detail kontribusi</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Pastikan judul, penulis, jenjang, dan sumber materi sudah sesuai sebelum dikirim.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Judul Modul</label>
                <input
                  {...register('title', { required: 'Judul wajib diisi' })}
                  placeholder="Contoh: Matematika Dasar Kelas 7"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
                {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Nama Penulis</label>
                <input
                  {...register('name', { required: 'Nama penulis wajib diisi' })}
                  placeholder="Nama lengkap"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Jenjang Pendidikan</label>
                <select
                  {...register('idJenjang', { required: 'Jenjang wajib dipilih' })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                >
                  <option value="">Pilih jenjang</option>
                  {jenjangList.map((item) => (
                    <option key={item.idJenjang} value={item.idJenjang}>
                      {item.jenjang}
                    </option>
                  ))}
                </select>
                {errors.idJenjang && (
                  <p className="mt-2 text-sm text-red-600">{errors.idJenjang.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Deskripsi Modul</label>
              <textarea
                {...register('desc')}
                rows="4"
                placeholder="Tuliskan ringkasan singkat isi modul"
                className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Kategori Modul</label>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {categories.map((tab) => {
                  const isActive = kategori === tab.idKategori;

                  return (
                    <button
                      key={tab.idKategori}
                      type="button"
                      onClick={() => setKategori(tab.idKategori)}
                      className={`flex min-h-28 flex-col items-center justify-center rounded-xl border px-3 py-4 text-center text-sm font-semibold transition ${
                        isActive
                          ? 'border-sky-500 bg-sky-50 text-sky-800 shadow-lg shadow-sky-100'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-slate-50'
                      }`}
                    >
                      <img src={tab.icon} alt={tab.kategori} className="mb-3 h-10 w-10 object-contain" />
                      <span>{tab.kategori}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {isPdfCategory ? (
              <div className="rounded-2xl border border-dashed border-sky-300 bg-sky-50/70 p-5">
                <label className="text-sm font-semibold text-slate-700">Unggah File PDF</label>
                <input
                  type="file"
                  accept="application/pdf"
                  {...register('file', {
                    required: 'File wajib diunggah',
                    validate: {
                      isPdf: (value) =>
                        value[0]?.type === 'application/pdf' || 'File harus berformat PDF',
                    },
                  })}
                  onChange={handleFileChange}
                  className="mt-3 w-full text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-sky-600 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-sky-700"
                />
                {fileName && <p className="mt-3 text-sm text-slate-600">File terpilih: {fileName}</p>}
                {errors.file && <p className="mt-2 text-sm text-red-600">{errors.file.message}</p>}

                {previewURL && (
                  <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <div className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                      Pratinjau PDF
                    </div>
                    <iframe src={previewURL} className="h-80 w-full" title="Preview PDF" />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="text-sm font-semibold text-slate-700">Link Materi</label>
                <input
                  type="url"
                  {...register('link', { required: 'Link wajib diisi' })}
                  placeholder="https://contoh.com/materi"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
                {errors.link && <p className="mt-2 text-sm text-red-600">{errors.link.message}</p>}
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-100"
              >
                Simpan Modul Ajar
              </button>
            </div>
          </form>
          </div>
        </div>
      </section>
    </main>
  );
}
