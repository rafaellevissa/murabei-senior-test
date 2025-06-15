from marshmallow import Schema, fields

class AuthorSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    slug = fields.Str()
    biography = fields.Str()
