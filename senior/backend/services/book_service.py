from db.connection import SessionLocal
from models.book import Book
from sqlalchemy.orm import Session
from schemas.book_schema import BookSchema

class BookService:
    def __init__(self):
        self.session: Session = SessionLocal()
        self.book_schema = BookSchema()
        self.books_schema = BookSchema(many=True)

    def get_books(self, page=1, page_size=10, filters=None):
        query = self.session.query(Book)

        if filters:
            for field, value in filters.items():
                if hasattr(Book, field):
                    query = query.filter(getattr(Book, field).like(f"%{value}%"))

        total = query.count()

        books = query.offset((page - 1) * page_size).limit(page_size).all()

        data = self.books_schema.dump(books)

        return {
            "data": data,
            "total": total,
            "page": page,
            "page_size": page_size,
    }


    def create_new_book(self, data):
        book = Book(
            title=data["title"],
            author=data["author"],
            author_slug=data["author_slug"],
            author_bio=data["author_bio"],
            authors=data["authors"],
            publisher=data["publisher"],
            synopsis=data["synopsis"],
            subjects=data.get("subjects")
        )
        self.session.add(book)
        self.session.commit()
        return self.book_schema.dump(book)
