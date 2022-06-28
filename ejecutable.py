import os
from flask import Flask, render_template

app = Flask(__name__, template_folder='templates/layouts')
app._static_folder = os.path.abspath("templates/static/")


@app.route('/')
def principal():
    return  render_template('pantallaDeJuego.html');

if __name__ == '__main__':
    app.run(debug=True)


