# Aplicação Web - Cliníca Escola

<h3> Funcionalidades </h3>
<p>O sistema é uma aplicação web desenvolvida com node.js e o template EJS, com foco em no gerenciamento clínicas escola. Suas funcionalidades são:</p>
<ul>
<li>Gerenciamento do paciente.</li>
<li>Gerenciamento do supervisor.</li>
<li>Verificar o Relatório.</li>
<li>Confirmar as presenças.</li>
<li>Gerenciamento do estagiário.</li>
<li>Envio de Relatórios por meio do sistema.</li>
<li>Registrar frequências.</li>
<li>Acesso com autenticação definidos por níveis de permissão.</li>
<li>Acesso por conta do google (Disponível apenas para pacientes).</li>
<li>Cada tipo de permissão tem uma tela diferente.</li>
<li>Pacientes podem realizar o próprio registro.</li>
<li>Marcar consulta.</li>
<li>O paciente pode fazer um agendamento na própria casa.</li>
<li>Informações totalmente criptografadas no banco de dados.</li>
<li>Facilidade em encontrar as consultas.</li>
<li>Cada usuário tem acesso apenas às suas informações e aos atendimentos .que tenha vínculo.</li></li>
<li>Diversos modos de ver as consultas.</li>
<li>Por Semana.</li>
<li>Por Dia.</li>
<li>Por Mês.</li>
<li>Filtrar as consultas por nome, data ou ambos.</li>
<li>Ver apenas as consultas no intervalo de dias.</li>
<li>Colocar o paciente na lista de espera.</li>
<li>Gerenciamento geral das consultas ou agendamentos.</li>
</ul>

 <h3>Instalação  </h3>
<p>Para a instalação é preciso ter instalado</p>
<ul>
<li>Node.js </li>
<li>Mocha</li>
</ul>

<p>Após ter esses programas instalados, basta abrir o cmd e digitar o comando na pasta desejada para clonar o projeto.</p>
<ul>
<li>git clone https://github.com/AllisonSBahls/clinica-escola</li>
<li>Criar uma base de dados com o nome “dbclinica”</li>
</ul>	
	<p>Após clonar o projeto, rode no CMD os seguintes comandos</p>
<ol>
<li>npm i ou npm install - para instalar todos os módulos e bibliotecas utilizados pela aplicação. </li>
<li>npm test - serão criadas as tabelas do banco de dados dbclinica e logo em seguida é executado os testes automatizados.</li>
	</ol>
	Por fim para executar o projeto, na pasta principal do projeto rode o comando node app.js. Após isso basta acessar http://localhost:4000.
Todo esse procedimento pode ser encontrado na página principal da documentação gerada pelo JSDoc e no github.
<p>Acesse: </p>
https://clinschool.herokuapp.com/

<p>Tela principal </p>
![Alt Text](https://github.com/AllisonSBahls/clinica-escola/blob/master/app/public/img/doc/Sem%20t%C3%ADtulo.png)
Consultando Agendamento
![Alt Text](https://github.com/AllisonSBahls/clinica-escola/blob/master/app/public/img/doc/2.png)


