from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:5432@localhost/agenda.saaS'
db = SQLAlchemy(app)

class usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome_conta = db.Column(db.String(80), unique=True, nullable=False)
    senha_conta = db.Column(db.String(80), nullable=False)
class tareas(db.model):
    id = db.column(db.Integer,primay_key=True)
    tarefas = db.column(db.String(80), unique=True, nullable=False)


with app.app_context():
    db.create_all()

@app.route('/cadastro', methods=['POST'])
def cadastro():
    dados = request.get_json()
    nome_conta = dados.get('nome_conta')
    senha_conta = dados.get('senha_conta')
    return f'cadastrado: {nome_conta}'

tarefas = []
proximo_id = 1

@app.route('/tarefas', methods=['POST'])
def menu():
    global proximo_id
    dados = request.get_json()

    nova_tarefa = {
        'id': proximo_id,
        'tarefas': dados.get('tarefas'),
        'data': dados.get('data'),
        'obs': dados.get('obs')
    }


    tarefas.append(nova_tarefa)
    proximo_id += 1

    return jsonify(nova_tarefa)

@app.route('/ver_tarefa', methods=['GET'])
def ver_tarefa():
    return f'suas tarefas são {tarefas}'

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/tarefas/<int:tarefa_id>', methods=['DELETE'])
def excluir_tarefa(tarefa_id):
    global tarefas
    tarefas = [t for t in tarefas if t['id'] != tarefa_id]
    return jsonify({'mensagem': 'tarefa excluida com sucesso'})

if __name__ == '__main__':
    app.run(debug=True)