from ignat.models import project, user, ticket
from rest_framework import viewsets
from ignat.serializers.project import ProjectSerializer, ProjectPersonSerializer
from django.core.exceptions import SuspiciousOperation
from django.forms.models import model_to_dict
from rest_framework.response import Response
from rest_framework.decorators import list_route, detail_route
from ignat.utils.utils import get_user_id_by_session_id


class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = project.Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'project_id'


    def create(self, request, **kwargs):
        print(request.data)
        uid = request.data['data']['id']
        rawProjectData = {
            'user_id': uid,
            'name': request.data['data']['name'],
            'deadline': request.data['data']['deadline'],
            'description': request.data['data']['description'],
        }
        serializer = ProjectSerializer().create(data=rawProjectData)
        return Response()

    @list_route(methods=['post'])
    def add_member(self, request, **kwargs):
        if request.method == 'POST':

            if request.COOKIES['sessionid'] is None:
                raise SuspiciousOperation("No auth!")
            else:
                rawProjectData = {
                    'project_id': request.data['project_id'],
                    'user_id': request.data['user_id'],
                }
                serializer = ProjectPersonSerializer().create(data=rawProjectData)
                return Response()

    @list_route(methods=['post'])
    def remove_member(self, request, **kwargs):
        if request.method == 'POST':

            if request.COOKIES['sessionid'] is None:
                raise SuspiciousOperation("No auth!")
            else:
                project_id = request.data['project_id']
                user_id = request.data['user_id']
                project.ProjectMember.objects.filter(project_id=project_id, user_id=user_id).delete()
                return Response()

    @detail_route(methods=['get'])
    def list_members(self, request, project_id=None):
        if request.method == 'GET':
            pid = project_id
            queryset = project.ProjectMember.objects.all().filter(project_id=pid).values()
            response = []
            for item in queryset:
                response.append(model_to_dict(user.Person.objects.get(id=item['user_id'])))
            return Response(response)

    @detail_route(methods=['get'])
    def list_project(self, request, project_id=None):
        if request.method == 'GET':

            proj = project.Project.objects.get(id=project_id)
            response = {
                'tickets': [],
                'project': model_to_dict(proj),
            }
            queryset = ticket.Ticket.objects.filter(project_id=project_id).values()
            for item in queryset:
                response['tickets'].append(item)
            return Response(response)
