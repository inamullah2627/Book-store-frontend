import { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({ title: "", author: "", file: "" });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { title: "", author: "", file: "" };
    let hasError = false;

    if (!title.trim()) {
      newErrors.title = "Title is required";
      hasError = true;
    }

    if (!author.trim()) {
      newErrors.author = "Author is required";
      hasError = true;
    }

    if (!file) {
      newErrors.file = "PDF file is required";
      hasError = true;
    } else if (file.type !== "application/pdf") {
      newErrors.file = "Only PDF files are allowed";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("title", title);
      formData.append("author", author);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response?.status === 201) {
        alert("PDF uploaded successfully ✅");
        sessionStorage.setItem("loader", Math.random());
      }

      setSuccess("");
      setErrors({ title: "", author: "", file: "" });
      setTitle("");
      setAuthor("");
      setFile(null);
      e.target.reset();
    } catch (error) {
      console.error("Upload failed:", error);
      setSuccess("");
      setErrors({ ...errors, file: "Upload failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[50%] m-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Upload PDF</h2>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      <input
        type="text"
        placeholder="Author"
        className="border p-2 w-full rounded"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
      <input
        type="file"
        accept=".pdf"
        className="cursor-pointer border p-2 w-full rounded "
        onChange={(e) => setFile(e.target.files[0])}
      />
      {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload PDF"}
      </button>
      {success && (
        <p className="text-green-600 text-center text-sm mt-4">{success}</p>
      )}
    </form>
  );
};

export default UploadForm;
