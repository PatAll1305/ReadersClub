from .db import db, environment, SCHEMA, add_prefix_for_prod


class Book(db.Model):
    __tablename__ = 'books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)
    status = db.Column(db.String(25), default='pending')

    likes = db.relationship('LikedBook', backref='book', lazy=True)
    dislikes = db.relationship('DislikedBook', backref='book', lazy=True)
    user = db.relationship('User', back_populates='books')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "genre": self.genre,
            'author': self.author,
            'description': self.description,
            'image_url': self.image_url,
            "status": self.status,
            'user_id': self.user_id
        }