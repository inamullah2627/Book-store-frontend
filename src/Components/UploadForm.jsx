// components/UploadForm.jsx
import { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    file: "",
  });
  const [success, setSuccess] = useState("");

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
      const formData = new FormData();
      formData.append("size", 10);
      formData.append("pdf", file);
      formData.append("filename", title);
      formData.append("originalName", author);

      const response = await axios.post(
        "https://book-chem-store.vercel.app/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("PDF uploaded successfully!");
      setErrors({ title: "", author: "", file: "" });
      setTitle("");
      setAuthor("");
      setFile(null);
      e.target.reset();
    } catch (error) {
      setSuccess("");
      console.error("Upload failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[50%] m-auto mt-10">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && (
        <p className="text-red-500 text-sm mb-2">{errors.title}</p>
      )}
      <input
        type="text"
        placeholder="Author"
        className="border p-2 w-full"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      {errors.author && (
        <p className="text-red-500 text-sm mb-2">{errors.author}</p>
      )}
      <input
        className="cursor-pointer"
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {errors.file && (
        <p className="text-red-500 text-sm mb-2">{errors.file}</p>
      )}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Upload
      </button>
      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
    </form>
  );
};

export default UploadForm;
