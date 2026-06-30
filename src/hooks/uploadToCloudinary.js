import { CLOUD_KEY, CLOUD_NAME } from "./../configs/cloud-config";
import { BASE_URL } from '../configs';

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload-modul`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload gagal");
  }

  return res.json(); // hasilnya ada secure_url

};

// const uploadToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "unsigned_modul"); // preset dari dashboard
//   formData.append("folder", "modul_files");           // folder sama seperti backend
//   formData.append("resource_type", "raw");            // wajib untuk PDF/DOCX

//   const res = await fetch(
//     `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Upload ke Cloudinary gagal");
//   }

//   return res.json(); // hasilnya ada secure_url
// };


export default uploadToCloudinary;
