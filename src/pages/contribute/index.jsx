import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useJenjang, usePostModul } from '../../hooks/useData';
import { SuccessModal } from '../../components/elements';
import { useNavigate } from 'react-router-dom';

export default function ContributeForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [fileName, setFileName] = useState('');
  const [previewURL, setPreviewURL] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { data: jenjangList } = useJenjang();

  const { postModul, isLoading, responseData } = usePostModul();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('idJenjang', data.idJenjang);
    formData.append('title', data.title);
    formData.append('desc', data.desc);
    formData.append('name', data.name);
    formData.append('file', data.file[0]);

    const result = await postModul(formData);

    if (result) {
      setShowModal(true);
    } else {
      alert('Gagal mengirim modul.');
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      setPreviewURL(URL.createObjectURL(file));
    } else {
      setFileName('');
      setPreviewURL(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (responseData?.idModul) {
      navigate(`/modul/${responseData.idModul}`);
    }

  }

  console.log('responeData', responseData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 relative overflow-hidden">
      {/* Background */}
      {showModal && <SuccessModal onClose={handleCloseModal}/>}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1614728894745-0f2c5f3d8f4f?auto=format&fit=crop&w=1920&q=80"
          alt="Background edukasi"
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
      </div>

      {/* Form */}
      <div className="relative z-10 w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-10 border border-white/30">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">📚 Ayoo Ikut Berkontribusi!</h1>
          <p className="text-gray-600 mt-2">Tambahkan <strong>modul ajar</strong> untuk memperkaya pembelajaran bersama 💡</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Judul */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Modul</label>
            <input
              {...register('title', { required: 'Judul wajib diisi' })}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            {errors.judul && <p className="text-red-500 text-sm mt-1">{errors.judul.message}</p>}
          </div>

          {/* Penulis */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Penulis</label>
            <input
              {...register('name', { required: 'Nama penulis wajib diisi' })}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            {errors.penulis && <p className="text-red-500 text-sm mt-1">{errors.penulis.message}</p>}
          </div>

          {/* Jenjang */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Jenjang Pendidikan</label>
            <select
              {...register('idJenjang', { required: 'Jenjang wajib dipilih' })}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">-- Pilih Jenjang --</option>
              {jenjangList.map((item) => (
                <option key={item.idJenjang} value={item.idJenjang}>{item.jenjang}</option>
              ))}
            </select>
            {errors.jenjang && <p className="text-red-500 text-sm mt-1">{errors.jenjang.message}</p>}
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi Modul</label>
            <textarea
              {...register('desc')}
              rows="4"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Unggah File (PDF saja)</label>
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
              className="mt-2 w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
            />
            {fileName && <p className="text-sm text-gray-600 mt-1">📎 {fileName}</p>}
            {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>}
          </div>

          {/* Preview */}
          {previewURL && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-1">📷 Pratinjau:</p>
              <iframe src={previewURL} className="w-full h-80 border rounded-md" title="Preview PDF" />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            🚀 Simpan Modul Ajar
          </button>
        </form>
      </div>
    </div>
  );
}