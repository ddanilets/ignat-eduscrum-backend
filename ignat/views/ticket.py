from ignat.models import project, user, ticket
from rest_framework import viewsets
from ignat.serializers.project import ProjectSerializer, ProjectPersonSerializer
from ignat.serializers.ticket import TicketSerializer, TicketAttachmentSerializer
from django.core.exceptions import SuspiciousOperation
from django.forms.models import model_to_dict
from rest_framework.response import Response
from rest_framework.decorators import list_route, detail_route
from ignat.utils.utils import get_user_id_by_session_id


class TicketViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = ticket.Ticket.objects.all()
    serializer_class = TicketSerializer

    def create(self, request, **kwargs):
        if request.COOKIES['sessionid'] is None:
            raise SuspiciousOperation("No auth!")
        else:
            uid = get_user_id_by_session_id(request)
            rawProjectData = {
                'creator_id': uid,
                'name': request.data['name'],
                'project_id': request.data['project_id'],
                'description': request.data['description'],
                'assignee': request.data.get('assignee_id'),
                'priority': request.data.get('priority'),
                'estimate': request.data.get('estimate'),
            }
            serializer = TicketSerializer().create(data=rawProjectData)
            return Response()

    @detail_route(methods=['post'])
    def add_attachment(self, request, pk=None):
        if request.COOKIES['sessionid'] is None:
            raise SuspiciousOperation("No auth!")
        else:
            ticket_id = request.data['ticket_id']
            for file in request.FILES:
                rawTicket = {
                    'ticket_id': pk,
                    'file': request.FILES[file],
                }
                serializer = TicketAttachmentSerializer().create(data=rawTicket)
            return Response()

    @detail_route(methods=['get'])
    def list_attachments(self, request, pk=None):
        if request.method == 'GET':
            if request.COOKIES['sessionid'] is None:
                raise SuspiciousOperation("No auth!")
            else:
                tid = pk
                queryset = ticket.TicketAttachment.objects.filter(ticket_id=tid).values()
                response = []
                for item in queryset:
                    response.append(item['file'])
                return Response(response)
