def cadastro():
    opçao = 0
    while True:
        print('''        [ 1 ] cadastrar
        [ 2 ] entrar''')

        opcao = int(input('qual é a opção? '))

        if opcao == 1:
            nome_conta = input('qual é o nome dá conta? ')
            senha_conta = input('qual é a senha dá conta? ')
        elif opcao == 2:
            nome_conta = input('qual é o nome dá conta? ')
            senha_conta = input('qual é a senha dá conta')
        else:
            print('opção inválida')
        return nome_conta, senha_conta

nome_conta, senha_conta = cadastro()

def menu():
    opcao = 0
    while True:
        print('''    [ 1 ] agendar tarefa
    [ 2 ] ver tarefas agendada
    [ 3 ] excluir tarefas
    [ 4 ] sair''')
        opcao = int(input('qual é a sua opção? '))

        if opcao == 1:
            tarefa = str(input(('qual a sua tarefa? ')))
            data = input('qual é a data que você quer ser lembrado? ')
            obs = str(input('qual é a observação que você quer deixar? '))
            return tarefa, data, obs
        
        elif opcao == 2:
            print(tarefa)
            print(data)
            print(obs)
        elif opcao == 3:
            print('qual tarefa você quer excluir? ')
        else:
            print('saindo')
menu()