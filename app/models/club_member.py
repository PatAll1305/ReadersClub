from .db import db, SCHEMA, environment, add_prefix_for_prod

class ClubMember(db.Model):
    __tablename__ = 'club_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    club_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('clubs.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    status = db.Column(db.String(25), default='pending')

    club = db.relationship('Club', back_populates='members')
    users = db.relationship('User', back_populates='club_memberships')  

    def to_dict(self):
        return {
            "id": self.id,
            "club_id": self.club_id,
            "user_id": self.user_id,
            "status": self.status
        }