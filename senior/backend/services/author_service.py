from db.connection import SessionLocal
from models.author import Author
from sqlalchemy.orm import Session
from schemas.author_schema import AuthorSchema

class AuthorService:
    def __init__(self):
        self.session: Session = SessionLocal()
        self.authors_schema = AuthorSchema(many=True)

    def get_authors(self):
        authors = self.session.query(Author).all()
        return self.authors_schema.dump(authors)
