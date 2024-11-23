from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Book, LikedBook, DislikedBook
from sqlalchemy.orm import joinedload

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/liked-books', methods=['GET'])
def get_liked_books(id):
    """
    Query for all liked books of a user and return detailed info about each book
    """
    if current_user.id != id:
        return jsonify({"error": "Unauthorized access"}), 403

    liked_books = LikedBook.query.filter_by(user_id=id).options(joinedload(LikedBook.book)).all()

    if not liked_books:
        return jsonify({"message": "No liked books found"}), 404

    liked_books_details = [
        {
            "liked_book_id": book.id,
            "book_id": book.book_id,
            "user_id": book.user_id,
            "book": book.book.to_dict()  
        }
        for book in liked_books
    ]

    return jsonify(liked_books_details), 200

@user_routes.route('/<int:id>/disliked-books', methods=['GET'])
def get_disliked_books(id):
    """
    Query for all liked books of a user and return detailed info about each book
    """
    if current_user.id != id:
        return jsonify({"error": "Unauthorized access"}), 403

    disliked_books = DislikedBook.query.filter_by(user_id=id).options(joinedload(DislikedBook.book)).all()

    if not disliked_books:
        return jsonify({"message": "No disliked books found"}), 404

    disliked_books_details = [
        {
            "disliked_book_id": book.id,
            "book_id": book.book_id,
            "user_id": book.user_id,
            "book": book.book.to_dict()  
        }
        for book in disliked_books
    ]

    return jsonify(disliked_books_details), 200
