from django.contrib.sessions.models import Session


def get_user_id_by_session_id(request):
    session_id = request.COOKIES['sessionid']
    session = Session.objects.get(session_key=session_id)
    session_data = session.get_decoded()
    return session_data.get('_auth_user_id')
