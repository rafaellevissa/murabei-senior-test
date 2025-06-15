from sqlalchemy import Column, Integer, String, Text
from db.base import Base

class Book(Base):
    __tablename__ = "book"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String, index=True)
    author_slug = Column(String, index=True)
    author_bio = Column(Text)
    authors = Column(String)
    publisher = Column(String)
    synopsis = Column(Text)
    subjects = Column(String, index=True)
