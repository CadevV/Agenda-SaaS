def cadastro():
    opçao = 0
    while True:
        print('''[ 1 ] cadastrar
        [ 2 ] entrar''')
        
        opcao = input('qual é a opção')

        nome_conta = input('qual é o nome dá conta? ')
        senha_conta = input('qual é a senha dá conta? ')

    return nome_conta, senha_conta

nome_conta, senha_conta = cadastro()

