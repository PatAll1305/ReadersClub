from flask import Blueprint, jsonify, request
from flask_login import login_required
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
def add_liked_book():
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

@disliked_book_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_disliked_book(id):
    """
    Remove a book from the liked books list.
    """
    liked_book = DislikedBook.query.get_or_404(id)
    db.session.delete(liked_book)
    db.session.commit()
    return jsonify({'message': 'Liked book removed successfully'}), 200
