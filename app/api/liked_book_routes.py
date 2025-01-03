from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import LikedBook, db

liked_book_routes = Blueprint('liked_books', __name__)

@liked_book_routes.route('/', methods=['POST'])
def add_liked_book():
    """
    Add a book to the liked books list.
    """
    data = request.json
    liked_book = LikedBook(
        book_id=data['book_id'],
        user_id=data['user_id']
    )
    db.session.add(liked_book)
    db.session.commit()
    return liked_book.to_dict(), 201

@liked_book_routes.route('/', methods=['DELETE'])
def remove_liked_book():
    """
    Remove a book from the liked books list.
    """
    data = request.json
    liked_book = LikedBook.query.filter_by(book_id=data['book_id'], user_id=data['user_id']).first()
    
    if not liked_book:
        return {'error': 'Liked book not found'}, 404

    db.session.delete(liked_book)
    db.session.commit()
    return {'message': 'Liked book removed successfully'}

