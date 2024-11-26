from app.models import db, LikedBook, environment, SCHEMA
from sqlalchemy.sql import text

likes_seed_data = [
    {
        'book_id': 2,
        'user_id': 5
    },
    {
        'book_id': 1,
        'user_id': 10
    },
    {
        'book_id': 4,
        'user_id': 13
    },
    {
        'book_id': 3,
        'user_id': 12
    },
    {
        'book_id': 6,
        'user_id': 11
    },
    {
        'book_id': 3,
        'user_id': 10
    },
    {
        'book_id': 7,
        'user_id': 9
    },
    {
        'book_id': 7,
        'user_id': 12
    },
    {
        'book_id': 7,
        'user_id': 1
    },
    {
        'book_id': 7,
        'user_id': 7
    },
    {
        'book_id': 9,
        'user_id': 10
    },
    {
        'book_id': 3,
        'user_id': 10
    },
    {
        'book_id': 3,
        'user_id': 1
    },
    {
        'book_id': 3,
        'user_id': 4
    },
    {
        'book_id': 23,
        'user_id': 5
    },
    {
        'book_id': 12,
        'user_id': 10
    },
    {
        'book_id': 10,
        'user_id': 13
    },
    {
        'book_id': 12,
        'user_id': 12
    },
    {
        'book_id': 15,
        'user_id': 11
    },
    {
        'book_id': 19,
        'user_id': 10
    },
    {
        'book_id': 32,
        'user_id': 9
    },
    {
        'book_id': 30,
        'user_id': 12
    },
    {
        'book_id': 31,
        'user_id': 1
    },
    {
        'book_id': 40,
        'user_id': 7
    },
    {
        'book_id': 37,
        'user_id': 10
    },
    {
        'book_id': 39,
        'user_id': 10
    },
    {
        'book_id': 20,
        'user_id': 1
    },
    {
        'book_id': 35,
        'user_id': 4
    },
    {
        'book_id': 21,
        'user_id': 12
    },
    {
        'book_id': 11,
        'user_id': 1
    },
    {
        'book_id': 4,
        'user_id': 7
    },
    {
        'book_id': 20,
        'user_id': 10
    },
    {
        'book_id': 19,
        'user_id': 10
    },
    {
        'book_id': 23,
        'user_id': 1
    },
    {
        'book_id': 25,
        'user_id': 4
    },
]

def seed_liked_books():
    for data in likes_seed_data:
        likes = LikedBook(
            book_id=data['book_id'],
            user_id=data['user_id']
        )
        db.session.add(likes)
    db.session.commit()

def undo_liked_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.liked_books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM liked_books"))
        
    db.session.commit()