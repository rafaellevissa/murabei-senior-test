from sqlalchemy import Column, Integer, String, Text
from db.base import Base

class Author(Base):
    __tablename__ = "author"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    slug = Column(String, index=True)
    biography = Column(Text)
