from flask import Blueprint, request, jsonify
from ..models import db, Book, User
from datetime import datetime
from functools import wraps
from flask_login import login_required

book_routes = Blueprint('books', __name__)

def check_book_ownership(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        book_id = kwargs.get('id')
        user_id = request.headers.get('user_id')
        if user_id == None:
            user_id = request.cookies.get('user_id')
        if book_id == None:
            book_id = request.headers.get('book_id')

        if not user_id:
            return jsonify({"error": "User ID is required in headers or as a cookie"}), 401

        book = Book.query.get(book_id)
        if book == None:
            return jsonify({"error": "Book not found"}), 404

        if str(book.user_id) != user_id:
            return jsonify({"error": "Unauthorized access"}), 403

        return func(*args, **kwargs)
    return wrapper

@book_routes.route('/', methods=['POST'])
def create_book():
    data = request.get_json()
    book = Book(
        user_id=data['user_id'],
        title=data['title'],
        description=data['description'],
        genre=data['genre'],
        author=data['author'],
        image_url=data["image_url"],
    )
    db.session.add(book)
    db.session.commit()
    return jsonify(book.to_dict()), 201

@book_routes.route('/', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books])

@book_routes.route('/<int:id>', methods=['GET'])
def get_book(id):
    book = Book.query.get_or_404(id)
    return jsonify(book.to_dict())

@book_routes.route('/<int:id>', methods=['PUT'])
@check_book_ownership
def update_book(id):
    book = Book.query.get_or_404(id)
    data = request.get_json()

    book.author = data.get('author', book.author)
    book.genre = data.get('genre', book.genre)
    book.title = data.get('title', book.title)
    book.description = data.get('description', book.description)
    book.image_url = data.get('image_url', book.image_url)

    db.session.commit()

    return jsonify(book.to_dict())

@book_routes.route('/<int:id>', methods=['DELETE'])
@check_book_ownership
def delete_project(id):
    book = Book.query.get_or_404(id)
    db.session.delete(book)
    db.session.commit()
    return jsonify({"message": "Project deleted"}), 204
