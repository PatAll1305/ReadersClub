from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import ClubMember, Club, db
from sqlalchemy.orm import joinedload

club_member_routes = Blueprint('club_members', __name__)

# @club_member_routes.route('/', methods=['GET'])
# def get_memberships():
#     """
#     Query for all club memberships and return them as a list of dictionaries.
#     """
#     data = request.json
#     club_id = data[club_id]
#     club = Club.quesry.get_or_404(club_id)

#     members = ClubMember.query.filter_by(club_id = club.id).options(joinedload(ClubMember.users)).all()
#     return jsonify({'members': [member.to_dict() for member in members]}), 200

@club_member_routes.route('/', methods=['POST'])
@login_required
def add_membership():
    """
    Add a user to a club.
    """
    data = request.json
    membership = ClubMember(
        club_id=data['club_id'],
        user_id=data['user_id']
    )
    db.session.add(membership)
    db.session.commit()
    return jsonify(membership.to_dict()), 201

@club_member_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_membership(id):
    """
    Remove a user from a club.
    """
    membership = ClubMember.query.get_or_404(id)
    db.session.delete(membership)
    db.session.commit()
    return jsonify({'message': 'Membership removed successfully'}), 200
