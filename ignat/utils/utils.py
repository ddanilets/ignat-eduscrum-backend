from django.contrib.sessions.models import Session


def get_user_id_by_session_id(request):
    session_id = request.COOKIES['sessionid']
    session = Session.objects.get(session_key=session_id)
    session_data = session.get_decoded()
    return session_data.get('_auth_user_id')


def get_user_id_by_auth_token(token):
    session = Session.objects.get(session_key=token)
    session_data = session.get_decoded()
    return session_data.get('_auth_user_id')


def get_auth_token_by_user_id(user_id):
    session = Session.objects.all()
    result = ''
    for sessionInstance in session:
        session_data = sessionInstance.get_decoded()
        if session_data.get('_auth_user_id') == str(user_id):
            result = sessionInstance.session_key

    return result
