from flask import Blueprint, request, jsonify
from app.models import db, Club, ClubMember, User
from sqlalchemy.orm import joinedload

club_routes = Blueprint('clubs', __name__)

@club_routes.route('/', methods=['GET'])
def get_clubs():
    clubs = Club.query.options(
        joinedload(Club.members).joinedload(ClubMember.users)
    ).all()

    club_data = []
    for club in clubs:
        club_dict = club.to_dict()
        club_dict['members'] = [
            {
                "club_id": member.club_id,
                "id": member.id,
                "user": member.users.to_dict(),
                "user_id": member.user_id
            }
            for member in club.members
        ]
        club_data.append(club_dict)

    return jsonify(club_data), 200

@club_routes.route('/', methods=['POST'])
def create_club():
    data = request.json
    new_club = Club(
        club_name=data.get('club_name'),
        owner_id=data.get('owner_id')
    )
    db.session.add(new_club)
    db.session.commit()
    return jsonify(new_club.to_dict()), 201

@club_routes.route('/<int:club_id>/join', methods=['POST'])
def join_club(club_id):
    data = request.json
    user_id = data.get('user_id')
    existing_member = ClubMember.query.filter_by(club_id=club_id, user_id=user_id).first()
    if existing_member:
        return jsonify({"error": "User is already a member of this club"}), 400
    new_member = ClubMember(club_id=club_id, user_id=user_id)
    db.session.add(new_member)
    db.session.commit()
    return jsonify({"message": "User added to club"}), 201

@club_routes.route('/<int:club_id>/leave', methods=['POST'])
def leave_club(club_id):
    data = request.json
    user_id = data.get('user_id')
    club_member = ClubMember.query.filter_by(club_id=club_id, user_id=user_id).first()
    if not club_member:
        club = Club.query.get_or_404(club_id)
        if club.owner_id == user_id:
            db.session.delete(club)
            db.session.commit()
            return jsonify({"message": "Club deleted and user removed from club"})

    db.session.delete(club_member)
    db.session.commit()
    return jsonify({"message": "User removed from club"}), 200
