from app.models import db, ClubMember, environment, SCHEMA
from sqlalchemy.sql import text

club_members_seed_data = [
    {
        'club_id': 2,
        'user_id': 5
    },
    {
        'club_id': 1,
        'user_id': 10
    },
    {
        'club_id': 4,
        'user_id': 13
    },
    {
        'club_id': 3,
        'user_id': 12
    },
    {
        'club_id': 6,
        'user_id': 11
    },
    {
        'club_id': 3,
        'user_id': 10
    },
    {
        'club_id': 7,
        'user_id': 9
    },
    {
        'club_id': 7,
        'user_id': 12
    },
    {
        'club_id': 7,
        'user_id': 1
    },
    {
        'club_id': 7,
        'user_id': 7
    },
    {
        'club_id': 5,
        'user_id': 10
    },
    {
        'club_id': 3,
        'user_id': 8
    },
    {
        'club_id': 3,
        'user_id': 1
    },
    {
        'club_id': 3,
        'user_id': 2
    },
]

def seed_club_members():
    for data in club_members_seed_data:
        new_member = ClubMember(
            club_id=data['club_id'],
            user_id=data['user_id'],
            status='accepted'
        )
        db.session.add(new_member)
    db.session.commit()

def undo_club_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.club_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM club_members"))
        
    db.session.commit()