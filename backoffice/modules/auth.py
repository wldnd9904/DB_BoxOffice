import jwt

from django.conf import settings


def getToken(request):
    """
    to get token from request.

    Returns:
        token: Successfully get token.
        None: No cookie or raise PyJWTError.
    """
    cookie = request.META.get('HTTP_AUTHORIZATION')
    if not cookie:
        return None
    try:
        token = jwt.decode(cookie, settings.SECRET_KEY, settings.ALGORITHM)
    except jwt.PyJWTError:
        return None
    
    return token

def getCusGradeNo(request):
    """
    to get cus_grade_no from token in request.

    Returns:
        token['cus_grade_no']: Successfully get cus_grade_no.
        None: No token.
    """
    token = getToken(request)
    if not token:
        return None
    
    return token['cus_grade_no']

def getCusno(request):
    """
    to get cus_no from token in request.

    Returns:
        token['cus_no']: Successfully get cus_no.
        None: No token.
    """
    token = getToken(request)
    if not token:
        return None

    return token['cus_no']
                