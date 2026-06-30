import { PDFDocument } from "pdf-lib";

const compressPdf = async (file) => {
  // Baca file PDF dari input <input type="file">
  const arrayBuffer = await file.arrayBuffer();

  // Load PDF
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // Hapus metadata (judul, author, subject, dll)
  pdfDoc.setTitle("");
  pdfDoc.setAuthor("");
  pdfDoc.setSubject("");
  pdfDoc.setKeywords([]);
  pdfDoc.setProducer("");
  pdfDoc.setCreator("");

  // Simpan ulang PDF
  const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });

  // Buat Blob untuk upload
  const compressedFile = new File([compressedPdfBytes], file.name, {
    type: "application/pdf",
  });

  return compressedFile;
};

export default compressPdf;