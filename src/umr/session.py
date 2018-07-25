import functools
import flask
from flask import request
from umr.constants import ZEEGUU_COOKIE_SESSION_KEY
from umr.login import ZEEGUU_WEB_URL


def with_session(view):
    """
    Decorator checks whether a session is available either in
     - as a cookie

    In case of no session, user is redirected to login form.
    """

    @functools.wraps(view)
    def wrapped_view(*args, **kwargs):
        request.sessionID = None

        if ZEEGUU_COOKIE_SESSION_KEY in request.cookies:
            request.sessionID = request.cookies.get(ZEEGUU_COOKIE_SESSION_KEY )
        else:
            return flask.redirect(ZEEGUU_WEB_URL + "/login" + '?next=' + request.url)
        return view(*args, **kwargs)

    return wrapped_view
