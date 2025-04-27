// components/BookListWrapper.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const BookListWrapper = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/pdfs");
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  useEffect(() => {
    fetchBooks();
  }, [sessionStorage.getItem("loader")]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
      {loading ? (
        <p className="col-span-full text-center">Loading books...</p>
      ) : (
        books.map((val, index) => (
          <BookCard
            key={index}
            id={val._id}
            title={val.title}
            author={val.author}
            fileUrl={""}
            onDelete={() => handleDelete(index)}
            thumbnail={"https://covers.openlibrary.org/b/id/8231856-L.jpg"}
          />
        ))
      )}
    </div>
  );
};

export default BookListWrapper;
