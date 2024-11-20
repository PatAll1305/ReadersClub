from app.models import db, Club, environment, SCHEMA
from sqlalchemy.sql import text

clubs_seed_data = [
    {
        'club_name': 'Fantasy Lovers',
        'owner_id': 1
    },
    {
        'club_name': 'Romance Lovers',
        'owner_id': 2
    },
    {
        'club_name': 'Drama Lovers',
        'owner_id': 3
    },
    {
        'club_name': 'Fiction Lovers',
        'owner_id': 5
    },
    {
        'club_name': 'Greek Mythology Lovers',
        'owner_id': 6
    },
    {
        'club_name': 'Mystery Lovers',
        'owner_id': 7
    },
    {
        'club_name': 'Thriller Lovers',
        'owner_id': 8
    },
]

def seed_clubs():
    for data in clubs_seed_data:
        new_club = Club(
            club_name=data['club_name'],
            owner_id=data['owner_id']
        )
        db.session.add(new_club)
    db.session.commit()

def undo_clubs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.clubs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM clubs"))
        
    db.session.commit()