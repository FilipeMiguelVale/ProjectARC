from flask_backend import ma


class AccidentSchema(ma.Schema):
    class Meta:
        fields = ('id','location', 'n_cars_involved', 'n_people', 'n_people_injured','video_location')


class CarSchema(ma.Schema):
    class Meta:
        fields = ('id', 'velocity', 'n_people', 'temperature', 'ABS', 'overturned', 'damage', 'accident_id')


# init schema
accident_schema = AccidentSchema()
accidents_schema = AccidentSchema(many=True)

car_schema = CarSchema()
car_schemas = CarSchema(many=True)
