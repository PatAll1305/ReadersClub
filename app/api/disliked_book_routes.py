from flask import Blueprint, jsonify, request
from app.models import DislikedBook, db

disliked_book_routes = Blueprint('disliked_books', __name__)

@disliked_book_routes.route('/', methods=['GET'])
def get_disliked_books():
    """
    Query for all liked books and return them as a list of dictionaries.
    """
    disliked_books = DislikedBook.query.all()
    return jsonify([disliked_book.to_dict() for disliked_book in disliked_books]), 200

@disliked_book_routes.route('/', methods=['POST'])
def add_disliked_book():
    """
    Add a book to the liked books list.
    """
    data = request.json
    disliked_book = DislikedBook(
        book_id=data['book_id'],
        user_id=data['user_id']
    )
    db.session.add(disliked_book)
    db.session.commit()
    return jsonify(disliked_book.to_dict()), 201

@disliked_book_routes.route('/', methods=['DELETE'])
def remove_disliked_book():
    """
    Remove a book from the disliked books list.
    """
    data = request.json
    disliked_book = DislikedBook.query.filter_by(book_id=data['book_id'], user_id=data['user_id']).first()

    if not disliked_book:
        return {'error': 'Disliked book not found'}, 404
    
    db.session.delete(disliked_book)
    db.session.commit()
    return {'message': 'Disliked book removed successfully'}
