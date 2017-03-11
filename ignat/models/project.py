from django.db import models
from ignat.models.user import Person


class Project(models.Model):
    user = models.ForeignKey(Person)
    name = models.CharField(max_length=30)
    deadline = models.DateField()
    description = models.CharField(max_length=300)

    @classmethod
    def create(cls, user_id, name, description, deadline):
        user = Person.objects.get(user_id=user_id)
        project = cls(user=user, name=name, description=description, deadline=deadline)
        project.save()
        return project


class ProjectMember(models.Model):
    user = models.ForeignKey(Person)
    project = models.ForeignKey(Project)

    @classmethod
    def create(cls, user_id, project_id):
        user = Person.objects.get(id=user_id)
        project = Project.objects.get(id=project_id)
        project_person = cls(user=user, project=project)
        project_person.save()
        return project_person
