import axios from "axios";

const BookCard = ({ id, title, author, fileUrl, onDelete, thumbnail }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/download/${id}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`http://localhost:5000/pdfs/${id}`);
      alert("Book deleted successfully ✅");
      onDelete(); // call parent function to update frontend list
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <div className="p-1 rounded shadow-sm shadow-white">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-auto max-h-80 object-contain rounded"
      />
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-600">{author}</p>
      <button
        onClick={handleDownload}
        className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Download
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-3 ml-2 py-1 rounded cursor-pointer hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default BookCard;
