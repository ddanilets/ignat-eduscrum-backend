from ignat.models import user
from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=30)
    username = serializers.CharField(max_length=30)
    password = serializers.CharField(max_length=30)


class PersonSerializer(serializers.Serializer):
    user = UserSerializer(required=True)
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)

    def create(self, data):
        # Create the user instance
        data = data['data']
        person = user.Person.create(username=data['username'],
                                    first_name=data['first_name'],
                                    last_name=data['last_name'],
                                    email=data['email'],
                                    password=data['password'])
        return person
