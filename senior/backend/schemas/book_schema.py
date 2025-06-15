from marshmallow import Schema, fields

class BookSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    author = fields.Str()
    author_bio = fields.Str()
    authors = fields.Str()
    publisher = fields.Str()
    synopsis = fields.Str()
    subjects = fields.Str()
