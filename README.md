# tcc-clinicaescola

O sistema é uma aplicação web desenvolvida com node.js, com foco em no gerenciamento clínicas escola. Suas funcionalidades são:
●	Gerenciamento do paciente.
●	Gerenciamento do supervisor.
○	Verificar o Relatório.
○	Confirmar as presenças.
●	Gerenciamento do estagiário.
○	Envio de Relatórios por meio do sistema.
○	Registrar frequências.
●	Acesso com autenticação definidos por níveis de permissão.
○	Acesso por conta do google (Disponível apenas para pacientes).
●	Cada tipo de permissão tem uma tela diferente.
●	Pacientes podem realizar o próprio registro.
●	Marcar consulta.
○	O paciente pode fazer um agendamento na própria casa.
●	Informações totalmente criptografadas no banco de dados.
●	Facilidade em encontrar as consultas.
●	Cada usuário tem acesso apenas às suas informações e aos atendimentos .que tenha vínculo.
●	Diversos modos de ver as consultas.
○	Por Semana.
○	Por Dia.
○	Por Mês.
○	Filtrar as consultas por nome, data ou ambos.
○	Ver apenas as consultas no intervalo de dias.
●	Colocar o paciente na lista de espera.
●	Gerenciamento geral das consultas ou agendamentos.


Para a instalação é preciso ter instalado
●	Node.js 
●	MySQL
●	Mocha

Após ter esses programas instalados, basta abrir o cmd e digitar o comando na pasta desejada para clonar o projeto.
●	git clone https://github.com/AllisonSBahls/tcc-clinicaescola
●	Criar uma base de dados com o nome “dbclinica”
	Após clonar o projeto, rode no CMD os seguintes comandos
1.	npm i ou npm install - para instalar todos os módulos e bibliotecas utilizados pela aplicação. 
2.	npm test - serão criadas as tabelas do banco de dados dbclinica e logo em seguida é executado os testes automatizados.
	Por fim para executar o projeto, na pasta principal do projeto rode o comando node app.js. Após isso basta acessar http://localhost:4000.
Todo esse procedimento pode ser encontrado na página principal da documentação gerada pelo JSDoc e no github.
