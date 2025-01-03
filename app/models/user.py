from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    club_memberships = db.relationship('ClubMember', back_populates='users', cascade="all, delete-orphan")
    books_added = db.relationship('Book', backref='added_by', lazy=True, cascade="all, delete-orphan")
    liked_books = db.relationship('LikedBook', backref='user', lazy=True, cascade="all, delete-orphan")
    disliked_books = db.relationship('DislikedBook', backref='user', lazy=True, cascade="all, delete-orphan")
    clubs = db.relationship('Club', back_populates='owner', cascade="all, delete-orphan")
    books = db.relationship('Book', back_populates='user', cascade="all, delete-orphan")
    messages = db.relationship('ClubMessage', back_populates='user', cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "created_at": self.created_at
        }
