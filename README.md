# ReadersClub

ReadersClub is a web application where users can join or create clubs, engage in discussions through club messages, and explore books by genre. The app also allows users to like or dislike books and manage the books they have uploaded.

## Features

- **Clubs:**
  - Users can join or leave existing clubs.
  - Users can create new clubs.
  - Clubs have members, and each member can participate in discussions through messages.

- **Books:**
  - Browse books by genre.
  - Like or dislike books, with personalized book recommendations appearing on user profiles.
  - Add, edit, or delete books uploaded by the user.
  - Manage books pending approval for publishing.

- **Club Messages:**
  - Fetch messages for a specific club, ordered by creation date.
  - Add new messages, edit existing messages, or delete messages.

## Tech Stack

- **Frontend:** React, Redux (with Thunks), TailwindCSS.
- **Backend:** Flask, SQLAlchemy.
- **Database:** SQLite (Development) / PostgreSQL (Production).

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd ReadersClub
   ```

2. Set up the virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables in a `.env` file:

   ```env
   FLASK_APP=app
   FLASK_ENV=development
   DATABASE_URL=<your_database_url>
   SECRET_KEY=<your_secret_key>
   ```

5. Run database migrations:

   ```bash
   flask db upgrade
   ```

6. Seed the database:

   ```bash
   flask seed all
   ```

7. Start the Flask server:

   ```bash
   flask run
   ```

8. Start the React development server:

   ```bash
   cd frontend
   npm install
   npm start
   ```

## API Endpoints

### Club Routes

- `GET /api/clubs/`: Fetch all clubs.
- `POST /api/clubs/`: Create a new club.
- `POST /api/clubs/:clubId/join`: Join a club.
- `POST /api/clubs/:clubId/leave`: Leave a club.

### Club Messages Routes

- `GET /api/clubs/:clubId/messages`: Fetch messages for a club, ordered by `created_at`.
- `POST /api/clubs/:clubId/messages`: Add a new message to a club.
- `PUT /api/clubs/:clubId/messages/:messageId`: Edit an existing message.
- `DELETE /api/clubs/:clubId/messages/:messageId`: Delete a message.

### Book Routes

- `GET /api/books/`: Fetch all books.
- `POST /api/books/`: Add a new book.
- `PUT /api/books/:bookId`: Edit an existing book.
- `DELETE /api/books/:bookId`: Delete a book.

## Redux Store

### Actions (examples)

- **Clubs:**
  - `LOAD_CLUBS`
  - `ADD_CLUB`
  - `JOIN_CLUB`
  - `LEAVE_CLUB`

- **Club Messages:**
  - `LOAD_CLUB_MESSAGES`
  - `ADD_CLUB_MESSAGE`
  - `EDIT_CLUB_MESSAGE`
  - `DELETE_CLUB_MESSAGE`

### Thunks (examples)

- **Clubs:**
  - `thunkFetchClubs`
  - `thunkCreateClub`
  - `thunkJoinClub`
  - `thunkLeaveClub`

- **Club Messages:**
  - `thunkFetchClubMessages`
  - `thunkAddClubMessage`
  - `thunkEditClubMessage`
  - `thunkDeleteClubMessage`

## Database Models

### Club
- `id`: Primary key.
- `name`: Name of the club.
- `description`: Description of the club.
- `created_at`: Timestamp.

### ClubMember
- `id`: Primary key.
- `club_id`: Foreign key to `Club`.
- `user_id`: Foreign key to `User`.
- `status`: Membership status (e.g., accepted).

### ClubMessage
- `id`: Primary key.
- `club_id`: Foreign key to `Club`.
- `user_id`: Foreign key to `User`.
- `message`: Message content.
- `created_at`: Timestamp.

### Book
- `id`: Primary key.
- `title`: Title of the book.
- `genre`: Genre of the book.
- `uploaded_by`: Foreign key to `User`.
- `status`: Upload status (e.g., pending, approved).

## Deployment

- **Backend:** Hosted on Render with PostgreSQL.
- **Frontend:** Deployed on Render.

## Future Enhancements

- Add real-time messaging for club discussions.
- Implement a notification system for club activity.
- Add OAuth for social logins.

---

Enjoy exploring and connecting through ReadersClub!

