## ClinSchool - Aplicação Web Clinca Escola de Psicologia
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/AllisonSBahls/clinica-escola/blob/master/LICENSE) 

<p align="center">Sistema web de Gerenciamento de Clínicas Escolas de Psicologia - https://clinschool.herokuapp.com/</p>
<p align="center">
  <a href="https://clinschool.herokuapp.com">
    <img src="https://github.com/AllisonSBahls/clinica-escola/blob/master/app/public/img/doc/Sem%20t%C3%ADtulo.png" alt="Logo" height="225">
  </a>
   <a href="https://clinschool.herokuapp.com">
    <img src="https://github.com/AllisonSBahls/clinica-escola/blob/master/app/public/img/doc/2.png" alt="Lista de Pedidos" height="225">
  </a>
</p>


### Sobre o projeto

O ClinSchool é uma aplicação Node.js com Template EJS com foco em no gerenciamento de clínicas escolas de psicologia, desenvolvido como Trabalho de Conclusão de Curso em Análise e Desenvolvimento de Sistemas.

A aplicação foi desenvolvida para auxliar nos registros de atentimentos da clinica escola de Psicologia da Faculdade da Amazônia, falicitando os pacientes visualizarem as suas consultas e permite o estagiário e coordenador um controle melhor os atendimentos marcados.

A aplicação consiste no agendamento de consultas utilizando o calendário dentro dos sitema, com diferentes niveis de acesso, como acesso de Paciente, Estagiário, Secretária e Professor, cada com acesso apenas as suas informações.



### **Funcionalidades**
-   Gerenciamento do paciente.
-   Gerenciamento do supervisor.
-   Verificar o Relatório.
-   Confirmar as presenças.
-   Gerenciamento do estagiário.
-   Envio de Relatórios por meio do sistema.
-   Registrar frequências.
-   Acesso com autenticação definidos por níveis de permissão.
-   Acesso por conta do google (Disponível apenas para pacientes).
-   Cada tipo de permissão tem uma tela diferente.
-   Pacientes podem realizar o próprio registro.
-   Marcar consulta.
-   O paciente pode fazer um agendamento na própria casa.
-   Informações totalmente criptografadas no banco de dados.
-   Facilidade em encontrar as consultas.
-   Cada usuário tem acesso apenas às suas informações e aos atendimentos .que tenha vínculo.
-   Diversos modos de ver as consultas.
-   Por Semana.
-   Por Dia.
-   Por Mês.
-   Filtrar as consultas por nome, data ou ambos.
-   Ver apenas as consultas no intervalo de dias.
-   Colocar o paciente na lista de espera.
-   Gerenciamento geral das consultas ou agendamentos.

## Arquitetura Cliente Servidor (MVC)
![Arquitetura Cliente Servidor (MVC)](https://github.com/AllisonSBahls/clinica-escola/blob/master/app/public/img/doc/Arquitetura.JPG)

### Tecnologias e Bibliotecas
#### Aplicação Web
- Node.js
- Template EJS
- Passport para autenticação
- Sequelize ORM
- FullCalendar

### Implantação
- Heroku
- Banco de dados: MySQL

### Como executar o projeto
#### Pré-requisitos: Node
```bash
# clonar repositório
git clone https://github.com/AllisonSBahls/clinica-escola

# Base de Dados 
Criar uma base de dados com o nome “dbclinica” no MySQL

# Instalar as dependências
npm i ou npm install

#Criar as tabelas do banco de dados "dbclinica" e logo em seguida e validação das funções
npm test 

# Exercutar o projeto
node app.js. 

# Acessar - http://localhost:4000.
```

# Autor
Allison Sousa Bahls 

https://www.linkedin.com/in/allison-sousa-289073107/


