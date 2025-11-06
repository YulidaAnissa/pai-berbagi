import React from 'react';

export default function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-fade-in-up">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">✅ Modul Terkirim!</h2>
          <p className="text-gray-600 mb-4">
            Terima kasih telah berkontribusi. Modul kamu sudah berhasil diunggah 🎉
          </p>
          <button
            onClick={onClose}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
