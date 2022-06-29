import os#importacion de biblioteca "so" para funcionalidaddes que dependen del sistema operativo
from flask import Flask, render_template#importacion de la biblioteca flask

app = Flask(__name__, template_folder='templates/layouts')#
app._static_folder = os.path.abspath("templates/static/")


@app.route('/')#direccion web para la pagina principal
def principal():
    return  render_template('pantallaDeTitulo.html');#renderizado del html 

@app.route('/Juego')#direccion web para la pagina del juego
def Juego():
    return  render_template('pantallaDeJuego.html');#renderizado del html 

if __name__ == '__main__':#main para la ejecucion del proeyecto
    app.run(debug=True)


