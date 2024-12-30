from .db import db, SCHEMA, environment, add_prefix_for_prod

class Club(db.Model):
    __tablename__ = 'clubs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    club_name = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    owner = db.relationship('User', back_populates='clubs')
    members = db.relationship('ClubMember', back_populates='club', cascade="all, delete-orphan")
    user = db.relationship('User', backref='memberships')
    messages = db.relationship('ClubMessage', back_populates='club', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "club_name": self.club_name,
            "owner_id": self.owner_id
        }