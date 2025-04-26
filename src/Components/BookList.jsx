// components/BookList.jsx
import BookCard from "./BookCard";

const BookList = ({ books, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
      {books.map((book, index) => (
        <BookCard key={index} {...book} onDelete={() => onDelete(index)} />
      ))}
    </div>
  );
};

export default BookList;
