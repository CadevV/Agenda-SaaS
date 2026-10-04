from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome_conta = db.Column(db.String(80), unique=True, nullable=False)
    senha_conta = db.Column(db.String(80), nullable=False)


class Tarefas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tarefas = db.Column(db.String(80), nullable=False)
    data = db.Column(db.String(80), nullable=False)
    obs = db.Column(db.String(200), nullable=False)


with app.app_context():
    db.create_all()


@app.route('/cadastro', methods=['POST'])
def cadastro():
    dados = request.get_json()

    nome_conta = dados.get('nome_conta')
    senha_conta = dados.get('senha_conta')

    if not nome_conta or not senha_conta:
        return jsonify({
            'erro': 'nome e senha são obrigatórios'
        }), 400

    usuario_existente = usuario.query.filter_by(
        nome_conta=nome_conta
    ).first()

    if usuario_existente:
        return jsonify({
            'erro': 'usuario já existe'
        }), 409

    novo_usuario = usuario(
        nome_conta=nome_conta,
        senha_conta=senha_conta
    )

    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify({
        'mensagem': 'conta criada com sucesso',
        'id': novo_usuario.id,
        'nome_conta': nome_conta
    })


@app.route('/login', methods=['POST'])
def login():
    dados = request.get_json()

    nome_conta = dados.get('nome_conta')
    senha_conta = dados.get('senha_conta')

    usuario_encontrado = usuario.query.filter_by(
        nome_conta=nome_conta
    ).first()

    if not usuario_encontrado:
        return jsonify({
            'erro': 'usuario não encontrado'
        }), 404

    if usuario_encontrado.senha_conta != senha_conta:
        return jsonify({
            'erro': 'senha incorreta'
        }), 401

    return jsonify({
        'mensagem': 'login realizado',
        'id': usuario_encontrado.id,
        'nome_conta': usuario_encontrado.nome_conta
    })


@app.route('/tarefas', methods=['POST'])
def criar_tarefa():
    dados = request.get_json()

    nome_tarefa = dados.get('tarefas')
    data_tarefa = dados.get('data')
    obs_tarefa = dados.get('obs')

    if not nome_tarefa or not data_tarefa:
        return jsonify({
            'erro': 'nome e data da tarefa são obrigatórios'
        }), 400

    nova_tarefa = Tarefas(
        tarefas=nome_tarefa,
        data=data_tarefa,
        obs=obs_tarefa or ''
    )

    db.session.add(nova_tarefa)
    db.session.commit()

    return jsonify({
        'id': nova_tarefa.id,
        'tarefas': nova_tarefa.tarefas,
        'data': nova_tarefa.data,
        'obs': nova_tarefa.obs
    })


@app.route('/ver_tarefa', methods=['GET'])
def ver_tarefa():
    todas_tarefas = Tarefas.query.all()

    resultado = [
        {
            'id': tarefa.id,
            'tarefas': tarefa.tarefas,
            'data': tarefa.data,
            'obs': tarefa.obs
        }
        for tarefa in todas_tarefas
    ]

    return jsonify(resultado)


@app.route('/tarefas/<int:tarefa_id>', methods=['DELETE'])
def excluir_tarefa(tarefa_id):
    tarefa = db.session.get(Tarefas, tarefa_id)

    if not tarefa:
        return jsonify({
            'erro': 'tarefa não encontrada'
        }), 404

    db.session.delete(tarefa)
    db.session.commit()

    return jsonify({
        'mensagem': 'tarefa excluida com sucesso'
    })


@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok'
    })


if __name__ == '__main__':
    app.run(debug=True)