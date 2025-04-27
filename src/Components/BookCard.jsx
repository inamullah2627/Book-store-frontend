import axios from "axios";

const BookCard = ({ id, title, author, onDelete }) => {
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
      <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-red-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M6 2C4.897 2 4 2.897 4 4v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V8l-6-6H6zm7 1.414L18.586 9H14c-.553 0-1-.447-1-1V3.414zM6 20V4h6v5c0 1.103.897 2 2 2h5v9H6z" />
          <text x="7" y="17" fontSize="6" fill="currentColor" fontWeight="bold">
            PDF
          </text>
        </svg>
      </div>
      <h2 className="font-bold text-lg mt-2">{title}</h2>
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
