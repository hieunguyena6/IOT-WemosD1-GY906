from flask import Flask
from .config import app_config
from createtable import db
from .LogView import log_api

env_name = "development"


def create_app(env_name):
    """
    Create app
    """

    # app initiliazation
    app = Flask(__name__)
    app.config.from_object(app_config["development"])
    # initializing bcrypt and db
    # bcrypt.init_app(app)
    db.init_app(app)
    app.register_blueprint(log_api, url_prefix="/logs")

    @app.route("/", methods=["GET"])
    def index():
        return "Congratulations! Your API is working"

    return app