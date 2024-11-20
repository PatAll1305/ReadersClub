from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text

books_seed_data = [
    {
        "title": "To Kill a Mockingbird",
        "genre": "Fiction",
        "author": "Harper Lee",
        "description": "A novel about the serious issues of rape and racial inequality told through the eyes of a child.",
        "image_url": "https://example.com/to-kill-a-mockingbird.jpg",
        "user_id": 1
    },
    {
        "title": "1984",
        "genre": "Dystopian",
        "author": "George Orwell",
        "description": "A chilling portrayal of a totalitarian regime and the dangers of absolute power.",
        "image_url": "https://example.com/1984.jpg",
        "user_id": 2
    },
    {
        "title": "Pride and Prejudice",
        "genre": "Romance",
        "author": "Jane Austen",
        "description": "A classic novel that explores the intricacies of love, class, and society.",
        "image_url": "https://example.com/pride-and-prejudice.jpg",
        "user_id": 3
    },
    {
        "title": "The Great Gatsby",
        "genre": "Fiction",
        "author": "F. Scott Fitzgerald",
        "description": "A story of the mysterious Jay Gatsby and his obsession with wealth and love.",
        "image_url": "https://example.com/the-great-gatsby.jpg",
        "user_id": 4
    },
    {
        "title": "Moby Dick",
        "genre": "Adventure",
        "author": "Herman Melville",
        "description": "An epic tale of the whaling ship Pequod and its captain's obsessive hunt for the white whale.",
        "image_url": "https://example.com/moby-dick.jpg",
        "user_id": 5
    },
    {
        "title": "War and Peace",
        "genre": "Historical",
        "author": "Leo Tolstoy",
        "description": "A sweeping narrative that intertwines the lives of individuals and history during the Napoleonic wars.",
        "image_url": "https://example.com/war-and-peace.jpg",
        "user_id": 10
    },
    {
        "title": "The Catcher in the Rye",
        "genre": "Fiction",
        "author": "J.D. Salinger",
        "description": "A story about the complexities of adolescence and the struggles of growing up.",
        "image_url": "https://example.com/the-catcher-in-the-rye.jpg",
        "user_id": 7
    },
    {
        "title": "Brave New World",
        "genre": "Dystopian",
        "author": "Aldous Huxley",
        "description": "A provocative exploration of a dystopian society driven by technology and control.",
        "image_url": "https://example.com/brave-new-world.jpg",
        "user_id": 8
    },
    {
        "title": "The Hobbit",
        "genre": "Fantasy",
        "author": "J.R.R. Tolkien",
        "description": "The story of Bilbo Baggins' adventurous quest in Middle-earth.",
        "image_url": "https://example.com/the-hobbit.jpg",
        "user_id": 9
    },
    {
        "title": "The Lord of the Rings",
        "genre": "Fantasy",
        "author": "J.R.R. Tolkien",
        "description": "An epic tale of the battle for Middle-earth and the journey of the One Ring.",
        "image_url": "https://example.com/the-lord-of-the-rings.jpg",
        "user_id": 10
    },
    {
        "title": "Crime and Punishment",
        "genre": "Psychological Fiction",
        "author": "Fyodor Dostoevsky",
        "description": "A philosophical novel about morality, guilt, and redemption.",
        "image_url": "https://example.com/crime-and-punishment.jpg",
        "user_id": 1
    },
    {
        "title": "The Brothers Karamazov",
        "genre": "Philosophical Fiction",
        "author": "Fyodor Dostoevsky",
        "description": "A complex narrative exploring faith, doubt, and the human condition.",
        "image_url": "https://example.com/the-brothers-karamazov.jpg",
        "user_id": 2
    },
    {
        "title": "Anna Karenina",
        "genre": "Romance",
        "author": "Leo Tolstoy",
        "description": "A tragic love story set against the backdrop of 19th-century Russian society.",
        "image_url": "https://example.com/anna-karenina.jpg",
        "user_id": 3
    },
    {
        "title": "The Divine Comedy",
        "genre": "Epic Poetry",
        "author": "Dante Alighieri",
        "description": "An allegorical journey through Hell, Purgatory, and Paradise.",
        "image_url": "https://example.com/the-divine-comedy.jpg",
        "user_id": 4
    },
    {
        "title": "Wuthering Heights",
        "genre": "Gothic Fiction",
        "author": "Emily Brontë",
        "description": "A story of love, revenge, and obsession on the Yorkshire moors.",
        "image_url": "https://example.com/wuthering-heights.jpg",
        "user_id": 5
    },
    {
        "title": "Jane Eyre",
        "genre": "Romance",
        "author": "Charlotte Brontë",
        "description": "The life and struggles of a strong, independent woman in Victorian England.",
        "image_url": "https://example.com/jane-eyre.jpg",
        "user_id": 6
    },
    {
        "title": "Great Expectations",
        "genre": "Bildungsroman",
        "author": "Charles Dickens",
        "description": "The coming-of-age story of Pip, an orphan with great expectations.",
        "image_url": "https://example.com/great-expectations.jpg",
        "user_id": 7
    },
    {
        "title": "Les Misérables",
        "genre": "Historical",
        "author": "Victor Hugo",
        "description": "A story of redemption and justice during post-revolutionary France.",
        "image_url": "https://example.com/les-miserables.jpg",
        "user_id": 8
    },
    {
        "title": "Don Quixote",
        "genre": "Classic",
        "author": "Miguel de Cervantes",
        "description": "The comedic and tragic adventures of a self-styled knight-errant.",
        "image_url": "https://example.com/don-quixote.jpg",
        "user_id": 9
    },
    {
        "title": "A Tale of Two Cities",
        "genre": "Historical",
        "author": "Charles Dickens",
        "description": "A tale of love, sacrifice, and revolution during the French Revolution.",
        "image_url": "https://example.com/a-tale-of-two-cities.jpg",
        "user_id": 10
    },
        {
        "title": "The Alchemist",
        "genre": "Fiction",
        "author": "Paulo Coelho",
        "description": "A story about following your dreams and discovering your personal legend.",
        "image_url": "https://example.com/the-alchemist.jpg",
        "user_id": 1
    },
    {
        "title": "The Road",
        "genre": "Post-Apocalyptic",
        "author": "Cormac McCarthy",
        "description": "A bleak yet beautiful tale of a father and son journeying through a desolate world.",
        "image_url": "https://example.com/the-road.jpg",
        "user_id": 2
    },
    {
        "title": "The Picture of Dorian Gray",
        "genre": "Philosophical Fiction",
        "author": "Oscar Wilde",
        "description": "A story about vanity, morality, and the pursuit of eternal youth.",
        "image_url": "https://example.com/the-picture-of-dorian-gray.jpg",
        "user_id": 3
    },
    {
        "title": "Frankenstein",
        "genre": "Science Fiction",
        "author": "Mary Shelley",
        "description": "The tale of Victor Frankenstein and his monstrous creation.",
        "image_url": "https://example.com/frankenstein.jpg",
        "user_id": 4
    },
    {
        "title": "Dracula",
        "genre": "Horror",
        "author": "Bram Stoker",
        "description": "A chilling tale of Count Dracula's quest for blood and immortality.",
        "image_url": "https://example.com/dracula.jpg",
        "user_id": 5
    },
    {
        "title": "The Handmaid's Tale",
        "genre": "Dystopian",
        "author": "Margaret Atwood",
        "description": "A harrowing look at a dystopian society that subjugates women.",
        "image_url": "https://example.com/the-handmaids-tale.jpg",
        "user_id": 6
    },
    {
        "title": "Fahrenheit 451",
        "genre": "Dystopian",
        "author": "Ray Bradbury",
        "description": "A story of a future where books are banned, and firemen burn them.",
        "image_url": "https://example.com/fahrenheit-451.jpg",
        "user_id": 7
    },
    {
        "title": "The Kite Runner",
        "genre": "Drama",
        "author": "Khaled Hosseini",
        "description": "A story of friendship, betrayal, and redemption set in Afghanistan.",
        "image_url": "https://example.com/the-kite-runner.jpg",
        "user_id": 8
    },
    {
        "title": "Life of Pi",
        "genre": "Adventure",
        "author": "Yann Martel",
        "description": "A tale of survival, faith, and self-discovery on the open sea.",
        "image_url": "https://example.com/life-of-pi.jpg",
        "user_id": 9
    },
    {
        "title": "Slaughterhouse-Five",
        "genre": "Science Fiction",
        "author": "Kurt Vonnegut",
        "description": "A satirical look at war and humanity through the lens of time travel.",
        "image_url": "https://example.com/slaughterhouse-five.jpg",
        "user_id": 10
    },
    {
        "title": "The Shining",
        "genre": "Horror",
        "author": "Stephen King",
        "description": "A chilling tale of isolation and madness at the Overlook Hotel.",
        "image_url": "https://example.com/the-shining.jpg",
        "user_id": 1
    },
    {
        "title": "The Hunger Games",
        "genre": "Dystopian",
        "author": "Suzanne Collins",
        "description": "A gripping story of survival and revolution in a totalitarian society.",
        "image_url": "https://example.com/the-hunger-games.jpg",
        "user_id": 2
    },
    {
        "title": "The Maze Runner",
        "genre": "Science Fiction",
        "author": "James Dashner",
        "description": "A group of teens navigate a deadly maze with no memory of their past.",
        "image_url": "https://example.com/the-maze-runner.jpg",
        "user_id": 3
    },
    {
        "title": "A Wrinkle in Time",
        "genre": "Science Fiction",
        "author": "Madeleine L'Engle",
        "description": "A cosmic adventure through time and space to save a lost father.",
        "image_url": "https://example.com/a-wrinkle-in-time.jpg",
        "user_id": 4
    },
    {
        "title": "The Secret Garden",
        "genre": "Children's Literature",
        "author": "Frances Hodgson Burnett",
        "description": "A heartwarming story of healing and friendship in a hidden garden.",
        "image_url": "https://example.com/the-secret-garden.jpg",
        "user_id": 5
    },
    {
        "title": "Charlotte's Web",
        "genre": "Children's Literature",
        "author": "E.B. White",
        "description": "The story of a pig, a spider, and the power of friendship.",
        "image_url": "https://example.com/charlottes-web.jpg",
        "user_id": 6
    },
    {
        "title": "The Giver",
        "genre": "Dystopian",
        "author": "Lois Lowry",
        "description": "A young boy discovers the dark truth behind his utopian society.",
        "image_url": "https://example.com/the-giver.jpg",
        "user_id": 7
    },
    {
        "title": "Dune",
        "genre": "Science Fiction",
        "author": "Frank Herbert",
        "description": "A vast epic of politics, religion, and ecology on the desert planet Arrakis.",
        "image_url": "https://example.com/dune.jpg",
        "user_id": 8
    },
    {
        "title": "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
        "genre": "Fantasy",
        "author": "C.S. Lewis",
        "description": "Four siblings discover a magical world and join the fight against evil.",
        "image_url": "https://example.com/narnia.jpg",
        "user_id": 9
    },
    {
        "title": "Percy Jackson & the Olympians: The Lightning Thief",
        "genre": "Fantasy",
        "author": "Rick Riordan",
        "description": "A modern adventure of Greek mythology starring a demigod teenager.",
        "image_url": "https://example.com/percy-jackson.jpg",
        "user_id": 10
    }
]

def seed_books():
    for book_data in books_seed_data:
        book = Book(
            title=book_data["title"],
            genre=book_data["genre"],
            author=book_data["author"],
            description=book_data["description"],
            image_url=book_data["image_url"],
            user_id=book_data["user_id"]
        )
        db.session.add(book)
    db.session.commit()

def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))
    db.session.commit()
