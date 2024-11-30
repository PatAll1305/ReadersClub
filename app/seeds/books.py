from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text

books_seed_data = [
    {
        "title": "To Kill a Mockingbird",
        "genre": "Fiction",
        "author": "Harper Lee",
        "description": "A novel about the serious issues of rape and racial inequality told through the eyes of a child.",
        "image_url": "https://www.dramaticpublishing.com/media/catalog/product/cache/1/image/300x436/9df78eab33525d08d6e5fb8d27136e95/t/o/to_kill_a_mockingbird_cover-t34.jpg",
        "user_id": 1
    },
    {
        "title": "1984",
        "genre": "Dystopian",
        "author": "George Orwell",
        "description": "A chilling portrayal of a totalitarian regime and the dangers of absolute power.",
        "image_url": "https://s3.amazonaws.com/adg-bucket/1984-george-orwell/3423-medium.jpg",
        "user_id": 2
    },
    {
        "title": "Pride and Prejudice",
        "genre": "Romance",
        "author": "Jane Austen",
        "description": "A classic novel that explores the intricacies of love, class, and society.",
        "image_url": "https://m.media-amazon.com/images/I/812wzoJvRLL._AC_UF1000,1000_QL80_.jpg",
        "user_id": 3
    },
    {
        "title": "The Great Gatsby",
        "genre": "Fiction",
        "author": "F. Scott Fitzgerald",
        "description": "A story of the mysterious Jay Gatsby and his obsession with wealth and love.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
        "user_id": 4
    },
    {
        "title": "Moby Dick",
        "genre": "Adventure",
        "author": "Herman Melville",
        "description": "An epic tale of the whaling ship Pequod and its captain's obsessive hunt for the white whale.",
        "image_url": "https://sterling-us.imgix.net/covers/9781454959809.jpg?auto=format&h=648",
        "user_id": 5
    },
    {
        "title": "War and Peace",
        "genre": "Historical",
        "author": "Leo Tolstoy",
        "description": "A sweeping narrative that intertwines the lives of individuals and history during the Napoleonic wars.",
        "image_url": "https://m.media-amazon.com/images/I/71lPZpwz0HL._AC_UF1000,1000_QL80_.jpg",
        "user_id": 10
    },
    {
        "title": "The Catcher in the Rye",
        "genre": "Fiction",
        "author": "J.D. Salinger",
        "description": "A story about the complexities of adolescence and the struggles of growing up.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/640px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
        "user_id": 7
    },
    {
        "title": "Brave New World",
        "genre": "Dystopian",
        "author": "Aldous Huxley",
        "description": "A provocative exploration of a dystopian society driven by technology and control.",
        "image_url": "https://upload.wikimedia.org/wikipedia/en/thumb/6/62/BraveNewWorld_FirstEdition.jpg/220px-BraveNewWorld_FirstEdition.jpg",
        "user_id": 8
    },
    {
        "title": "The Hobbit",
        "genre": "Fantasy",
        "author": "J.R.R. Tolkien",
        "description": "The story of Bilbo Baggins' adventurous quest in Middle-earth.",
        "image_url": "https://images.penguinrandomhouse.com/cover/9780345534835",
        "user_id": 9
    },
    {
        "title": "The Lord of the Rings",
        "genre": "Fantasy",
        "author": "J.R.R. Tolkien",
        "description": "An epic tale of the battle for Middle-earth and the journey of the One Ring.",
        "image_url": "https://m.media-amazon.com/images/I/913sMwNHsBL._AC_UF1000,1000_QL80_.jpg",
        "user_id": 10
    },
    {
        "title": "Crime and Punishment",
        "genre": "Psychological Fiction",
        "author": "Fyodor Dostoevsky",
        "description": "A philosophical novel about morality, guilt, and redemption.",
        "image_url": "https://upload.wikimedia.org/wikipedia/en/4/4b/Crimeandpunishmentcover.png",
        "user_id": 1
    },
    {
        "title": "The Brothers Karamazov",
        "genre": "Philosophical Fiction",
        "author": "Fyodor Dostoevsky",
        "description": "A complex narrative exploring faith, doubt, and the human condition.",
        "image_url": "https://m.media-amazon.com/images/I/81Q2+mMrj0L._AC_UF1000,1000_QL80_.jpg",
        "user_id": 2
    },
    {
        "title": "Anna Karenina",
        "genre": "Romance",
        "author": "Leo Tolstoy",
        "description": "A tragic love story set against the backdrop of 19th-century Russian society.",
        "image_url": "https://images.booksense.com/images/196/718/9781528718196.jpg",
        "user_id": 3
    },
    {
        "title": "The Divine Comedy",
        "genre": "Epic Poetry",
        "author": "Dante Alighieri",
        "description": "An allegorical journey through Hell, Purgatory, and Paradise.",
        "image_url": "https://images.penguinrandomhouse.com/cover/9780679433132",
        "user_id": 4
    },
    {
        "title": "Wuthering Heights",
        "genre": "Gothic Fiction",
        "author": "Emily Brontë",
        "description": "A story of love, revenge, and obsession on the Yorkshire moors.",
        "image_url": "https://cloud.firebrandtech.com/api/v2/image/111/9780785839842/CoverArtHigh/XL",
        "user_id": 5
    },
    {
        "title": "Jane Eyre",
        "genre": "Romance",
        "author": "Charlotte Brontë",
        "description": "The life and struggles of a strong, independent woman in Victorian England.",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSw2ovTEPW1QErjdS6H7iN6A5fLY_rTT-NRg&s",
        "user_id": 6
    },
    {
        "title": "Great Expectations",
        "genre": "Bildungsroman",
        "author": "Charles Dickens",
        "description": "The coming-of-age story of Pip, an orphan with great expectations.",
        "image_url": "https://sterling-us.imgix.net/covers/9781454945642.jpg?auto=format&h=648",
        "user_id": 7
    },
    {
        "title": "Les Misérables",
        "genre": "Historical",
        "author": "Victor Hugo",
        "description": "A story of redemption and justice during post-revolutionary France.",
        "image_url": "https://marissasbooks.com/cdn/shop/products/marissasbooksandgifts-9781784286224-les-miserables-30553774522567.jpg?v=1628361089",
        "user_id": 8
    },
    {
        "title": "Don Quixote",
        "genre": "Classic",
        "author": "Miguel de Cervantes",
        "description": "The comedic and tragic adventures of a self-styled knight-errant.",
        "image_url": "https://i.etsystatic.com/5965919/r/il/5daf08/5533055967/il_fullxfull.5533055967_8h3y.jpg",
        "user_id": 9
    },
    {
        "title": "A Tale of Two Cities",
        "genre": "Historical",
        "author": "Charles Dickens",
        "description": "A tale of love, sacrifice, and revolution during the French Revolution.",
        "image_url": "https://www.eastonpress.com/dw/image/v2/BDZH_PRD/on/demandware.static/-/Sites-full-catalog/default/dwdc96f25e/images/hi-res/A-Tale-Of-Two-Cities_3998029_a_main.jpg?sw=1000&sh=1000&q=70",
        "user_id": 10
    },
        {
        "title": "The Alchemist",
        "genre": "Fiction",
        "author": "Paulo Coelho",
        "description": "A story about following your dreams and discovering your personal legend.",
        "image_url": "https://thesciencesurvey.com/wp-content/uploads/2023/02/IMG-20230210-WA0000.jpeg",
        "user_id": 1
    },
    {
        "title": "The Road",
        "genre": "Post-Apocalyptic",
        "author": "Cormac McCarthy",
        "description": "A bleak yet beautiful tale of a father and son journeying through a desolate world.",
        "image_url": "https://m.media-amazon.com/images/I/81cAuYAq7pL._AC_UF1000,1000_QL80_.jpg",
        "user_id": 2
    },
    {
        "title": "The Picture of Dorian Gray",
        "genre": "Philosophical Fiction",
        "author": "Oscar Wilde",
        "description": "A story about vanity, morality, and the pursuit of eternal youth.",
        "image_url": "https://m.media-amazon.com/images/I/91uns-1GnQL._AC_UF1000,1000_QL80_.jpg",
        "user_id": 3
    },
    {
        "title": "Frankenstein",
        "genre": "Science Fiction",
        "author": "Mary Shelley",
        "description": "The tale of Victor Frankenstein and his monstrous creation.",
        "image_url": "https://mpd-biblio-covers.imgix.net/9780812551501.jpg",
        "user_id": 4
    },
    {
        "title": "Dracula",
        "genre": "Horror",
        "author": "Bram Stoker",
        "description": "A chilling tale of Count Dracula's quest for blood and immortality.",
        "image_url": "https://images.squarespace-cdn.com/content/v1/54ef4a93e4b01b969d320540/1694191962531-4IDU2WDB9HDHG4JDJ3MP/Dracula+by+Bram+Stoker_9781632060655.jpg?format=1000w",
        "user_id": 5
    },
    {
        "title": "The Handmaid's Tale",
        "genre": "Dystopian",
        "author": "Margaret Atwood",
        "description": "A harrowing look at a dystopian society that subjugates women.",
        "image_url": "https://m.media-amazon.com/images/I/910sXn07MwL._AC_UF1000,1000_QL80_.jpg",
        "user_id": 6
    },
    {
        "title": "Fahrenheit 451",
        "genre": "Dystopian",
        "author": "Ray Bradbury",
        "description": "A story of a future where books are banned, and firemen burn them.",
        "image_url": "https://ih1.redbubble.net/image.1963389332.4830/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
        "user_id": 7
    },
    {
        "title": "The Kite Runner",
        "genre": "Drama",
        "author": "Khaled Hosseini",
        "description": "A story of friendship, betrayal, and redemption set in Afghanistan.",
        "image_url": "https://postcardsfrompurgatory.com/wp-content/uploads/2012/11/img_34381.jpg",
        "user_id": 8
    },
    {
        "title": "Life of Pi",
        "genre": "Adventure",
        "author": "Yann Martel",
        "description": "A tale of survival, faith, and self-discovery on the open sea.",
        "image_url": "https://m.media-amazon.com/images/I/91QaIM2JMRL._AC_UF1000,1000_QL80_.jpg",
        "user_id": 9
    },
    {
        "title": "Slaughterhouse-Five",
        "genre": "Science Fiction",
        "author": "Kurt Vonnegut",
        "description": "A satirical look at war and humanity through the lens of time travel.",
        "image_url": "https://m.media-amazon.com/images/I/91lyuiqQXYL._AC_UF1000,1000_QL80_.jpg",
        "user_id": 10
    },
    {
        "title": "The Shining",
        "genre": "Horror",
        "author": "Stephen King",
        "description": "A chilling tale of isolation and madness at the Overlook Hotel.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/09/The_Shining_%281977%29_front_cover%2C_first_edition.jpg",
        "user_id": 1
    },
    {
        "title": "The Hunger Games",
        "genre": "Dystopian",
        "author": "Suzanne Collins",
        "description": "A gripping story of survival and revolution in a totalitarian society.",
        "image_url": "https://target.scene7.com/is/image/Target/GUEST_71cc8c16-6e6f-47c1-8c4d-be72ab0ee6c5?wid=488&hei=488&fmt=pjpeg",
        "user_id": 2
    },
    {
        "title": "The Maze Runner",
        "genre": "Science Fiction",
        "author": "James Dashner",
        "description": "A group of teens navigate a deadly maze with no memory of their past.",
        "image_url": "https://m.media-amazon.com/images/I/71un2hI4mcL._AC_UF1000,1000_QL80_.jpg",
        "user_id": 3
    },
    {
        "title": "A Wrinkle in Time",
        "genre": "Science Fiction",
        "author": "Madeleine L'Engle",
        "description": "A cosmic adventure through time and space to save a lost father.",
        "image_url": "https://m.media-amazon.com/images/I/81IBa0EgyOL._AC_UF1000,1000_QL80_.jpg",
        "user_id": 4
    },
    {
        "title": "The Secret Garden",
        "genre": "Children's Literature",
        "author": "Frances Hodgson Burnett",
        "description": "A heartwarming story of healing and friendship in a hidden garden.",
        "image_url": "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781665916868/the-secret-garden-9781665916868_hr.jpg",
        "user_id": 5
    },
    {
        "title": "Charlotte's Web",
        "genre": "Children's Literature",
        "author": "E.B. White",
        "description": "The story of a pig, a spider, and the power of friendship.",
        "image_url": "https://m.media-amazon.com/images/I/91NOcoxRkUL._AC_UF1000,1000_QL80_.jpg",
        "user_id": 6
    },
    {
        "title": "The Giver",
        "genre": "Dystopian",
        "author": "Lois Lowry",
        "description": "A young boy discovers the dark truth behind his utopian society.",
        "image_url": "https://m.media-amazon.com/images/I/81Yq5WKWfSL._AC_UF1000,1000_QL80_.jpg",
        "user_id": 7
    },
    {
        "title": "Dune",
        "genre": "Science Fiction",
        "author": "Frank Herbert",
        "description": "A vast epic of politics, religion, and ecology on the desert planet Arrakis.",
        "image_url": "https://target.scene7.com/is/image/Target/GUEST_94eae2da-c153-42ed-8e00-6516138dd7b5?wid=488&hei=488&fmt=pjpeg",
        "user_id": 8
    },
    {
        "title": "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
        "genre": "Fantasy",
        "author": "C.S. Lewis",
        "description": "Four siblings discover a magical world and join the fight against evil.",
        "image_url": "https://i.ebayimg.com/images/g/JSoAAOSw-29ZWl1b/s-l1200.jpg",
        "user_id": 9
    },
    {
        "title": "Percy Jackson & the Olympians: The Lightning Thief",
        "genre": "Fantasy",
        "author": "Rick Riordan",
        "description": "A modern adventure of Greek mythology starring a demigod teenager.",
        "image_url": "https://m.media-amazon.com/images/I/81kdYsdAPCL._AC_UF1000,1000_QL80_.jpg",
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
            status='uploaded',
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
