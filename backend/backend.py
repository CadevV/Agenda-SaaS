from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

@app.route('/cadastro', methods=['POST'])
def cadastro():
    dados = request.get_json()
    nome_conta = dados.get('nome_conta')
    senha_conta = dados.get('senha_conta')
    return f'cadastrado: {nome_conta}'

tarefas = []
proximo_id = 1

@app.route('/login', methods=['POST'])
def login ():
    dados = request.get_json()

    nome_conta = dados.get('nome_conta')
    senha_conta = dados.get('senha_conta')

    usuario_encontrado = usuario.query.filter_by(
        nome_conta=nome_conta
    ).first()

    if not usuario_encontrado:
        return jsonify({'erro': 'usuario não encontrado'}), 404
    
    if not usuario_encontrado.senha_conta != senha_conta:
        return jsonify({'erro': 'senha não encontrada'}), 401

    return jsonify({'login realizdo' 'id': usuario_encontrado.id, 'nome_conta': usuario_encontrado.nome_conta} )

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

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True)