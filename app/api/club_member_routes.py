from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import ClubMember, Club, db
from sqlalchemy.orm import joinedload

club_member_routes = Blueprint('club_members', __name__)

@club_member_routes.route('/', methods=['POST'])
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
