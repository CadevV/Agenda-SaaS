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

class Tarefas(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    tarefas = db.Column(db.String(80), nullable=False)
    data = db.Column(db.String(80), nullable=False)
    obs = db.Column(db.String(80), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/cadastro', methods=['POST'])
def cadastro():
    dados = request.get_json()
    nome_conta = dados.get('nome_conta')
    senha_conta = dados.get('senha_conta')
    novo_usuario = usuario(nome_conta=nome_conta, senha_conta=senha_conta)
    db.session.add(novo_usuario)
    db.session.commit()
    return  jsonify({'mensagem': 'conta criada com sucesso', 'nome_conta': nome_conta})

@app.route('/tarefas', methods=['POST'])
def menu():
    dados = request.get_json()

    nova_tarefa = Tarefas(
        tarefas=dados.get('Tarefas'),
        data=dados.get('data'),
        obs=dados.get('obs')
    )

    db.session.add(nova_tarefa)
    db.session.commit()

    return jsonify({'mensagem': 'tarefas criada com sucesso', 'id': nova_tarefa.id})

@app.route('/ver_tarefa', methods=['GET'])
def ver_tarefa():
    todas_taferefas = Tarefas.query.all()

    resultado = [
        {
            'id': t.id,
            'taferefas': t.tarefas,
            'data': t.data,
            'obs': t.obs
        }
        for t in todas_taferefas
    ]

    return jsonify(resultado)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/tarefas/<int:tarefa_id>', methods=['DELETE'])
def excluir_tarefa(tarefa_id):
    tarefa = Tarefas.query.get(tarefa_id)

    if not tarefa:
        return jsonify({'erro': 'tarefa não encontrada'}), 404

    db.session.delete(tarefa)
    db.session.commit()

    return jsonify({'mensagem': 'tarefa excluida com sucesso'})

if __name__ == '__main__':
    app.run(debug=True)