from flask import Blueprint, request, jsonify
from app.models import db, ClubMessage
from flask_login import login_required

club_messages_routes = Blueprint('club_messages', __name__)

@club_messages_routes.route('/<int:club_id>', methods=['GET'])
@login_required
def get_club_messages(club_id):
    messages = ClubMessage.query.filter_by(club_id=club_id).order_by(ClubMessage.created_at.asc()).all()
    return jsonify([message.to_dict() for message in messages])

@club_messages_routes.route('/<int:club_id>', methods=['POST'])
@login_required
def post_club_message(club_id):
    data = request.get_json()
    new_message = ClubMessage(
        user_id=data['user_id'],
        club_id=club_id,
        message=data['message']
    )
    db.session.add(new_message)
    db.session.commit()
    return jsonify(new_message.to_dict()), 201

@club_messages_routes.route('/message/<int:message_id>', methods=['PUT'])
@login_required
def update_club_message(message_id):
    data = request.get_json()
    message = ClubMessage.query.get(message_id)
    if message:
        message.message = data['message']
        db.session.commit()
        return jsonify(message.to_dict())
    return jsonify({"error": "Message not found"}), 404

@club_messages_routes.route('/message/<int:message_id>', methods=['DELETE'])
@login_required
def delete_club_message(message_id):
    message = ClubMessage.query.get(message_id)
    if message:
        db.session.delete(message)
        db.session.commit()
        return jsonify({"message": "Deleted successfully"})
    return jsonify({"error": "Message not found"}), 404
