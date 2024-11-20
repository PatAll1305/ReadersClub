from app.models import db, DislikedBook, environment, SCHEMA
from sqlalchemy.sql import text

dislikes_seed_data = [
    {
        'book_id': 10,
        'user_id': 5
    },
    {
        'book_id': 11,
        'user_id': 10
    },
    {
        'book_id': 14,
        'user_id': 13
    },
    {
        'book_id': 31,
        'user_id': 12
    },
    {
        'book_id': 26,
        'user_id': 11
    },
    {
        'book_id': 23,
        'user_id': 10
    },
    {
        'book_id': 37,
        'user_id': 9
    },
    {
        'book_id': 27,
        'user_id': 12
    },
    {
        'book_id': 17,
        'user_id': 1
    },
    {
        'book_id': 27,
        'user_id': 7
    },
    {
        'book_id': 19,
        'user_id': 10
    },
    {
        'book_id': 23,
        'user_id': 10
    },
    {
        'book_id': 33,
        'user_id': 1
    },
    {
        'book_id': 23,
        'user_id': 4
    },
    {
        'book_id': 21,
        'user_id': 5
    },
    {
        'book_id': 2,
        'user_id': 10
    },
    {
        'book_id': 1,
        'user_id': 13
    },
    {
        'book_id': 10,
        'user_id': 12
    },
    {
        'book_id': 19,
        'user_id': 11
    },
    {
        'book_id': 1,
        'user_id': 10
    },
    {
        'book_id': 15,
        'user_id': 9
    },
    {
        'book_id': 9,
        'user_id': 12
    },
    {
        'book_id': 8,
        'user_id': 1
    },
    {
        'book_id': 9,
        'user_id': 7
    },
    {
        'book_id': 3,
        'user_id': 10
    },
    {
        'book_id': 2,
        'user_id': 10
    },
    {
        'book_id': 9,
        'user_id': 1
    },
    {
        'book_id': 3,
        'user_id': 4
    },
    {
        'book_id': 2,
        'user_id': 12
    },
    {
        'book_id': 10,
        'user_id': 1
    },
    {
        'book_id': 20,
        'user_id': 7
    },
    {
        'book_id': 21,
        'user_id': 10
    },
    {
        'book_id': 8,
        'user_id': 10
    },
    {
        'book_id': 35,
        'user_id': 1
    },
    {
        'book_id': 5,
        'user_id': 4
    },
]

def seed_disliked_books():
    for data in dislikes_seed_data:
        likes = DislikedBook(
            book_id=data['book_id'],
            user_id=data['user_id']
        )
        db.session.add(likes)
    db.session.commit()

def undo_disliked_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.disliked_books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM disliked_books"))
        
    db.session.commit()