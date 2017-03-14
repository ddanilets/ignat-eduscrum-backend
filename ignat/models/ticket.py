from django.db import models
from ignat.models.user import Person
from ignat.models.project import Project


class Ticket(models.Model):
    creator = models.ForeignKey(Person)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=300)
    priority = models.IntegerField(null=True)
    estimate = models.IntegerField(null=True)
    status = models.IntegerField(null=True)
    assignee = models.ForeignKey(Person, null=True)
    project = models.ForeignKey(Project)

    @classmethod
    def create(cls, creator_id, name, description, project_id, priority=None, estimate=None, assignee=None):
        creator = Person.objects.get(user_id=creator_id)
        project = Project.objects.get(id=project_id)
        if assignee is not None and assignee != '':
            assignee = Person.objects.get(id=assignee)
        else:
            assignee = None
        ticket = cls(creator=creator, name=name, description=description, project=project, priority=priority,
                     assignee=assignee, estimate=estimate)
        ticket.save()
        return ticket

    @classmethod
    def update(cls, ticket_id, data):
        ticket = Ticket.objects.filter(id=ticket_id)[0]
        project_id = ticket.project.id
        assignee = ticket.assignee
        print(data)
        if data.get('project_id'):
            project_id = Project.objects.get(id=data.get('project_id')).id
        if data.get('assignee_id'):
            assignee = Person.objects.get(id=data.get('assignee_id'))
        Ticket.objects.filter(id=ticket_id).update(**data)
        print(assignee)
        if assignee is not None and assignee != ticket.assignee and assignee != '':
            Ticket.objects.filter(id=ticket_id).update(assignee=assignee)

        if project_id is not None and project_id != ticket.project.id and project_id != '':
            Ticket.objects.filter(id=ticket_id).update(project=Project.objects.get(id=project_id))

        return Ticket.objects.filter(id=ticket_id)[0]


class TicketAttachment(models.Model):
    ticket = models.ForeignKey(Ticket)
    file = models.FileField()

    @classmethod
    def create(cls, ticket_id, file):
        ticket = Ticket.objects.get(id=ticket_id)
        attachement = cls(ticket=ticket, file=file)
        attachement.save()
        return attachement