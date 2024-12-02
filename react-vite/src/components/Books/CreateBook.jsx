import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateBook } from "../../redux/books";
import "./Books.css";
import { useNavigate } from "react-router-dom";

export default function CreateBook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);

    useEffect(() => {

        if (!user) navigate('/login')
    }, [user])

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {
            user_id: user.id,
            title,
            description,
            genre,
            author,
            image_url: imageUrl,
        };

        dispatch(thunkCreateBook(newBook));
        navigate(`/users/${user.id}`);

    };

    return (
        <div className="create-book-container">
            <h2>Create a New Book</h2>
            <form className="create-book-form" onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={100}
                    />
                </label>
                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </label>
                <label>
                    Genre
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Author
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image URL
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label>
                <button type="submit">Create Book</button>
            </form>
        </div>
    );
}
