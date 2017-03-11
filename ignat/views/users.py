from ignat.models import user
from rest_framework import viewsets
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import SuspiciousOperation
from ignat.serializers.users import PersonSerializer
from rest_framework.decorators import list_route
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = user.Person.objects.all()
    serializer_class = PersonSerializer

    def create(self, request):
        serializer = PersonSerializer().create(request.data)
        return Response(PersonSerializer(serializer).data)

    @list_route(methods=['post'])
    def login(self, request):
        """
        POST - login by user
        """
        username = request.POST['user.username']
        password = request.POST['user.password']
        loggedUser = authenticate(username=username, password=password)
        if loggedUser is not None:
            token = login(request, loggedUser)
            return Response(token)
        else:
            raise SuspiciousOperation("Wrong credentials provided!")

    @list_route(methods=['get'])
    def logout(self, request):
        response = logout(request)
        return Response(response)

