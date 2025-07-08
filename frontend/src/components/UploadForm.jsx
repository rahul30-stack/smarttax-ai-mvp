import React, { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf_file", file);

    setLoading(true);
    try {
      const response = await fetch("https://smarttax-api.onrender.com/api/extract", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Failed to extract data." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded bg-white shadow mb-4">
      <h2 className="font-bold mb-2">Upload Tax PDF (e.g., Form 16)</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-green-600 text-white px-4 py-1 rounded"
      >
        {loading ? "Uploading..." : "Upload & Extract"}
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-2 rounded">
          <h3 className="font-se
