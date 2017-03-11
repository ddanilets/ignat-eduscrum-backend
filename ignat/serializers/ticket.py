from ignat.serializers import users, project
from ignat.models import ticket as model
from rest_framework import serializers


class TicketSerializer(serializers.Serializer):
    creator = users.PersonSerializer(required=True)
    assignee = users.PersonSerializer()
    project = project.ProjectSerializer()
    status = serializers.IntegerField()
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    name = serializers.CharField(max_length=30)
    description = serializers.CharField(max_length=300)
    priority = serializers.IntegerField()
    estimate = serializers.IntegerField()

    def create(self, data):
        ticketInstance = model.Ticket.create(creator_id=data['creator_id'],
                                             name=data['name'],
                                             project_id=data['project_id'],
                                             description=data['description'],
                                             assignee=data['assignee'],
                                             estimate=data['estimate'],
                                             priority=data['priority'])
        return ticketInstance

    def update(self, instance, data):
        ticketInstance = model.Ticket.update(ticket_id=instance.id, data=data)

        return ticketInstance


class TicketAttachmentSerializer(serializers.Serializer):
    ticket = TicketSerializer(required=True)
    file = serializers.FileField()

    def create(self, data):
        attachmentInstance = model.TicketAttachment.create(ticket_id=data['ticket_id'], file=data['file'])
        return attachmentInstance