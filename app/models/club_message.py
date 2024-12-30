from .db import db, SCHEMA, environment, add_prefix_for_prod
from datetime import datetime

class ClubMessage(db.Model):
    __tablename__ = 'club_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    club_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('clubs.id')), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='messages')
    club = db.relationship('Club', back_populates='messages')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "club_id": self.club_id,
            "message": self.message,
            "created_at": self.created_at
        }
