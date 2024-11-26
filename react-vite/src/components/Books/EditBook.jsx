import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './Books.css';
import { thunkFetchBooks, thunkUpdateBook } from '../../redux/books';

export default function EditBook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bookId } = useParams();
    const user = useSelector(state => state.session.user)
    const book = useSelector(state => state.books.all[+bookId])

    const [author, setAuthor] = useState(book?.author);
    const [genre, setGenre] = useState(book?.genre);
    const [title, setTitle] = useState(book?.title);
    const [description, setDescription] = useState(book?.description);
    const [imageUrl, setImageUrl] = useState(book?.image_url);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedBook = {
            author,
            genre,
            title,
            'image_url': imageUrl,
            description
        }

        dispatch(thunkUpdateBook(bookId, user?.id, updatedBook))
        navigate(`/users/${user?.id}`)
    };

    useEffect(() => {
        dispatch(thunkFetchBooks())
    }, [dispatch])

    return (
        <div className="edit-book-container">
            <h1>Edit Book</h1>
            <form className="edit-book-form" onSubmit={handleSubmit}>

                <label >Author</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <label >Genre</label>
                <input
                    type="text"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />

                <label>Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                />

                <label >Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <label >Image URL</label>
                <input
                    type="text"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <button type="submit" className="submit-button">Save Changes</button>
            </form>
        </div>
    );
}