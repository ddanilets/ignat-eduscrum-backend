from ignat.serializers import users
from ignat.models import project
from rest_framework import serializers


class ProjectSerializer(serializers.Serializer):
    user = users.PersonSerializer(required=True)
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    name = serializers.CharField(max_length=30)
    deadline = serializers.DateField()
    description = serializers.CharField(max_length=300)


    def create(self, data):
        projectInstance = project.Project.create(user_id=data['user_id'],
                                                 name=data['name'],
                                                 deadline=data['deadline'],
                                                 description=data['description'])
        return projectInstance


class ProjectPersonSerializer(serializers.Serializer):
    user = users.PersonSerializer(required=True)
    project = ProjectSerializer(required=True)

    def create(self, data):
        projectMemberInstance = project.ProjectMember.create(user_id=data['user_id'], project_id=data['project_id'])
        return projectMemberInstance
