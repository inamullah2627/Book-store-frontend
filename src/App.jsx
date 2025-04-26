import { useState } from "react";
import BookList from "./Components/BookList";
import UploadForm from "./Components/UploadForm";
import { useRef } from "react";

function App() {
  const [books, setBooks] = useState([
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      fileUrl: "#",
      thumbnail: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      fileUrl: "#",
      thumbnail: "https://covers.openlibrary.org/b/id/11138959-L.jpg",
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      fileUrl: "#",
      thumbnail: "https://covers.openlibrary.org/b/id/10551347-L.jpg",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      fileUrl: "#",
      thumbnail: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      fileUrl: "#",
      thumbnail: "https://covers.openlibrary.org/b/id/11138959-L.jpg",
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      fileUrl: "#",
      thumbnail: "https://covers.openlibrary.org/b/id/10551347-L.jpg",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      fileUrl: "#",
      thumbnail: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      fileUrl: "#",
      thumbnail: "https://covers.openlibrary.org/b/id/11138959-L.jpg",
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      fileUrl: "#",
      thumbnail: "https://covers.openlibrary.org/b/id/10551347-L.jpg",
    },
  ]);

  const [showUpload, setShowUpload] = useState(false);
  const uploadRef = useRef(null);
  const handleUpload = ({ title, author, file }) => {
    const url = URL.createObjectURL(file);
    setBooks([...books, { title, author, fileUrl: url }]);
  };
  const handleDelete = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  return (
    <div className="min-h-screen ">
      <header className="sticky top-0 z-50 bg-black border-b-2 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center w-full">My Book App</h1>
        {/* <button
          onClick={() => setShowUpload(!showUpload)}
          className="absolute right-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showUpload ? "Close Upload" : "Upload Book"}
        </button> */}
        <button
          onClick={() => {
            setShowUpload(!showUpload);
            setTimeout(() => {
              if (!showUpload && uploadRef.current) {
                uploadRef.current.scrollIntoView({ behavior: "smooth" });
              }
            }, 100);
          }}
          className="absolute right-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showUpload ? "Close Upload" : "Upload Book"}
        </button>
      </header>

      <div className="p-8 space-y-8">
        {/* {showUpload && <UploadForm onUpload={handleUpload} />} */}
        {showUpload && (
          <div ref={uploadRef}>
            <UploadForm onUpload={handleUpload} />
          </div>
        )}
        <BookList books={books} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
