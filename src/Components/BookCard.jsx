// components/BookCard.jsx
const BookCard = ({ title, author, fileUrl, onDelete, thumbnail }) => {
  return (
    <div className=" p-1 rounded shadow-sm shadow-white ">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-auto max-h-80 object-contain rounded"
      />
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-600">{author}</p>
      <a
        href={fileUrl}
        download
        className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Download
      </a>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-3 ml-2 py-1 rounded cursor-pointer hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default BookCard;
