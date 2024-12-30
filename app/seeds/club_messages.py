from app.models import db, ClubMessage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

club_messages_seed_data = [
    {
        'club_id': 1,
        'user_id': 10,
        'message': "Excited for our next book club meeting!"
    },
    {
        'club_id': 2,
        'user_id': 5,
        'message': "Has anyone finished this month's book yet?"
    },
    {
        'club_id': 3,
        'user_id': 12,
        'message': "I really enjoyed the last discussion we had."
    },
    {
        'club_id': 3,
        'user_id': 10,
        'message': "Looking forward to our next pick!"
    },
    {
        'club_id': 4,
        'user_id': 13,
        'message': "Great book suggestion, thanks for sharing!"
    },
    {
        'club_id': 5,
        'user_id': 10,
        'message': "Should we consider meeting in person this time?"
    },
    {
        'club_id': 6,
        'user_id': 11,
        'message': "I can't wait to dive into this new book!"
    },
    {
        'club_id': 7,
        'user_id': 9,
        'message': "Any recommendations for next month's read?"
    },
    {
        'club_id': 7,
        'user_id': 12,
        'message': "I love being part of this club, great suggestions!"
    },
    {
        'club_id': 7,
        'user_id': 1,
        'message': "Let's pick a classic novel next."
    },
    {
        'club_id': 3,
        'user_id': 8,
        'message': "I found a great article related to our last book, sharing it now!"
    },
    {
        'club_id': 3,
        'user_id': 1,
        'message': "Next meeting agenda is set. See you all there!"
    },
    {
        'club_id': 3,
        'user_id': 2,
        'message': "This month's book is a bit challenging but fun!"
    }
]

def seed_club_messages():
    for data in club_messages_seed_data:
        new_message = ClubMessage(
            club_id=data['club_id'],
            user_id=data['user_id'],
            message=data['message'],
            created_at=datetime.now() - timedelta(days=club_messages_seed_data.index(data))
        )
        db.session.add(new_message)
    db.session.commit()

def undo_club_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.club_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM club_messages"))
        
    db.session.commit()
