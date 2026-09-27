from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True)