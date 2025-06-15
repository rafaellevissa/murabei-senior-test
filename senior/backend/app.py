from flask import Flask, jsonify, request
from flask_cors import CORS
from db.connection import engine
from db.base import Base
from services.book_service import BookService
from services.author_service import AuthorService

Base.metadata.create_all(bind=engine)

app = Flask(__name__)
CORS(app)


book_service = BookService()
author_service = AuthorService()


@app.route("/", methods=["GET"])
def hello_world():
    return "Hello, World!"


@app.route("/api/v1/books", methods=["GET"])
def get_books():
    page = request.args.get("page", default=1, type=int)
    page_size = request.args.get("page_size", default=10, type=int)

    filters = {}
    allowed_fields = ['author', 'title', 'author_bio']
    for field in allowed_fields:
        value = request.args.get(field)
        if value:
            filters[field] = value

    books = book_service.get_books(page, page_size, filters)
    return jsonify(books)


@app.route("/api/v1/authors", methods=["GET"])
def get_authors():
    authors = author_service.get_authors()
    return jsonify(authors)


@app.route("/api/v1/books", methods=["POST"])
def create_book():
    data = request.json
    book = book_service.create_new_book(data)
    return jsonify(book)


