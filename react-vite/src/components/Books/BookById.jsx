import { useEffect } from "react";
import { thunkFetchBooks } from "../../redux/books";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


export default function BooksById() {
    const { bookId } = useParams();
    const dispatch = useDispatch();
    const book = useSelector(state => (state.books?.all[+bookId - 1]));


    useEffect(() => {
        dispatch(thunkFetchBooks())
    }, [dispatch]);


    return (
        <div className="book-container">
            <img src={book?.image_url} alt={`${book?.title} cover`} />
            <div className="book-details">
                <h2 className="book-title">{book?.title}</h2>
                <h4 className="book-title">By: {book?.author}</h4>
                <br></br>
                <p className="book-description">{book?.genre}</p>
                <p className="book-description">{book?.description}</p>
            </div>
        </div>
    );
}