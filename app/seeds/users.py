from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    admin = User(
        username='ADMIN', email='admin@aa.io', password='ADMIN123')
    alice = User(
        username='Alice', email='alice@aa.io', password='password')
    charlie = User(
        username='Charlie', email='charlie@aa.io', password='password')
    eve = User(
        username='Eve', email='eve@aa.io', password='password')
    frank = User(
        username='Frank', email='frank@aa.io', password='password')
    grace = User(
        username='Grace', email='grace@aa.io', password='password')
    hank = User(
        username='Hank', email='hank@aa.io', password='password')
    ivy = User(
        username='Ivy', email='ivy@aa.io', password='password')
    jack = User(
        username='Jack', email='jack@aa.io', password='password')
    kate = User(
        username='Kate', email='kate@aa.io', password='password')
    leo = User(
        username='Leo', email='leo@aa.io', password='password')

    db.session.add_all([demo, marnie, bobbie, admin, alice, charlie, eve, frank, grace, hank, ivy, jack, kate, leo])
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
