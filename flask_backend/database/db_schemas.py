from flask_backend import ma
from flask_backend.database.db_models import Accident, Car

class CarSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Car
    
    velocity = ma.auto_field()
    n_people = ma.auto_field()
    temperature = ma.auto_field()
    airbag = ma.auto_field()
    ABS = ma.auto_field()
    overturned = ma.auto_field()
    damage = ma.auto_field()

class AccidentSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Accident

    id = ma.auto_field()
    location = ma.auto_field()
    n_cars_involved = ma.auto_field()
    n_people = ma.auto_field()
    n_people_injured = ma.auto_field()
    damage = ma.auto_field()
    video_location = ma.auto_field()
    date = ma.auto_field()
    cars = ma.Nested(CarSchema, many=True)


# init schema
accident_schema = AccidentSchema()
accidents_schema = AccidentSchema(many=True)

car_schema = CarSchema()
car_schemas = CarSchema(many=True)
