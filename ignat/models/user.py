from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save


class Person(models.Model):
    user = models.ForeignKey(User, unique=True)
    last_name = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)

    @classmethod
    def create(cls, username, last_name, first_name, email, password):
        user = User(username=username, email=email, password=password)
        user.save()
        person = cls(user=user, last_name=last_name, first_name=first_name)
        person.save()
        return person

