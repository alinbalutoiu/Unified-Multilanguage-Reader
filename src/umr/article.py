from flask import request, render_template

from .session import with_session
from .umr_blueprint import umrblue

WORD_TAG = "zeeguu"


@umrblue.route('/article', methods=['GET'])
@with_session
def get_article():
    """Retrieve the supplied article link of the supplied language,
    and return a properly processed version of the article.
    """

    article_url = request.args['articleURL']

    return render_template('article.html', article_url=article_url)
