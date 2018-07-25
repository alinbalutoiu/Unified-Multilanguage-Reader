import functools
import flask
from flask import request
from umr.constants import ZEEGUU_COOKIE_SESSION_KEY, ZEEGUU_WEB_URL


def with_session(view):
    """
    Decorator checks whether a session is available.
    If not user is redirected to login
    """

    @functools.wraps(view)
    def wrapped_view(*args, **kwargs):
        request.sessionID = None

        if ZEEGUU_COOKIE_SESSION_KEY in request.cookies:
            request.sessionID = request.cookies.get(ZEEGUU_COOKIE_SESSION_KEY)
        else:
            url_to_redirect = ZEEGUU_WEB_URL + "/login" + '?next=' + request.url
            return flask.redirect(url_to_redirect)
        return view(*args, **kwargs)

    return wrapped_view
