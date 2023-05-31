import jwt

from django.conf import Settings

def getToken(request):
    cookie = request.COOKIES.get('jwt')
    if not cookie:
        return None
    try:
        token = jwt.decode(cookie, Settings.SECRET_KEY, Settings.ALGORITHM)
    except jwt.PyJWTError:
        return None
    
    return token

def getCusGradeNo(request):
    token = getToken(request)
    if not token:
        return None
    
    return token['cus_grade_no']