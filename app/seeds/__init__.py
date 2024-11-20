from flask.cli import AppGroup
from .users import seed_users, undo_users
from .clubs import seed_clubs, undo_clubs
from .club_members import seed_club_members, undo_club_members
from .books import seed_books, undo_books
from .liked_books import seed_liked_books, undo_liked_books
from .disliked_books import seed_disliked_books, undo_disliked_books
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_clubs()
        undo_club_members()
        undo_books()
        undo_liked_books()
        undo_disliked_books()
    seed_users()
    seed_books()
    seed_liked_books()
    seed_disliked_books()
    seed_clubs()
    seed_club_members()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_books()
    undo_liked_books()
    undo_disliked_books()
    undo_clubs()
    undo_club_members()
    # Add other undo functions here
