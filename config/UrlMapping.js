  /**
         * @swagger
         * definitions:
         *   Recepcionistas:
         *     properties:
         *        name:
         *          type: string
         *        email:
         *           type: string
         *        telefone:
         *            type: string
   */

  /**
         * @swagger
         * /recepcionistas:
         *   get:
         *     tags:
         *       - Recepcionistas
         *     description: Retornado todas as recepcionistas
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description:  Um array das recepcionistas
         */   

  /**
         * @swagger
         * /recepcionista:
         *   post:
         *     tags:
         *       - Recepcionistas
         *     description: Cadastar uma nova recepcionista para utilização do sistema
         *     produces:
         *       - application/json
	 *     parameters:
	 *       - name: recepcionista 
	 *         description: Recepcionista object
   *         in: body
         *     responses:
         *       200:
         *         description: Criado com sucesso
         */
  /**
         * @swagger
         * /recepcionista/{id}:
         *   put:
         *     tags:
         *       - Recepcionistas
         *     description: Alterar os dados de uma recepcionista para utilização do sistema
         *     produces:
         *       - application/json
	 *     parameters:
	 *       - name: recepcionista 
	 *         description: Recepcionista object
   *         in: body
   *         schema:
   *           type: array
         *     responses:
         *       200:
         *         description: Alterado com sucesso
         */
  /**
         * @swagger
         * /recepcionista/{id}:
         *   delete:
         *     tags:
         *       - Recepcionistas
         *     description: Deletar os dados de uma recepcionista para utilização do sistema
         *     produces:
         *       - application/json
	 *     parameters:
	 *       - name: id 
	 *         description: Recepcionista id
   *         in: path
   *         schema:
   *         required: true
   *         type: integer
   *     
   *         responses:
         *     200:
         *      description: Deletado com sucesso
         */    
  /**
         * @swagger
         * definitions:
         *   Supervisor:
         *     properties:
         *        name:
         *          type: string
         *        email:
         *           type: string
         *        telefone:
         *            type: string
   */

  /**
         * @swagger
         * /supervisores:
         *   get:
         *     tags:
         *       - Supervisores
         *     description: Retornado todas os supervisores
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description:  Um array das supervisoress
         */   

  /**
         * @swagger
         * /supervisores:
         *   post:
         *     tags:
         *       - Supervisores
         *     description: Cadastar uma nova supervisores para utilização do sistema
         *     produces:
         *       - application/json
	 *     parameters:
	 *       - name: supervisores 
	 *         description: supervisores object
   *         in: body
         *     responses:
         *       200:
         *         description: Criado com sucesso
         */
  /**
         * @swagger
         * /supervisores/{id}:
         *   put:
         *     tags:
         *       - Supervisores
         *     description: Alterar os dados de uma supervisores para utilização do sistema
         *     produces:
         *       - application/json
	 *     parameters:
	 *       - name: supervisores 
	 *         description: supervisores object
   *         in: body
   *         schema:
   *           type: array
         *     responses:
         *       200:
         *         description: Alterado com sucesso
         */
  /**
         * @swagger
         * /supervisores/{id}:
         *   delete:
         *     tags:
         *       - Supervisores
         *     description: Deletar os dados de uma supervisores para utilização do sistema
         *     produces:
         *       - application/json
	 *     parameters:
	 *       - name: id 
	 *         description: supervisore id
   *         in: path
   *         schema:
   *         required: true
   *         type: integer
   *     
   *         responses:
         *     200:
         *      description: Deletado com sucesso
         */    

  /**
         * @swagger
         * definitions:
         *   Paciente:
         *     properties:
         *        name:
         *          type: string
         *        email:
         *           type: string
         *        telefone:
         *            type: string
   */

  /**
         * @swagger
         * /pacientes:
         *   get:
         *     tags:
         *       - Pacientes
         *     description: Retornado todas os pacientes
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description:  Um array das supervisoress
         */   

  /**
         * @swagger
         * /pacientes:
         *   post:
         *     tags:
         *       - Pacientes
         *     description: Cadastar uma nova pacientes para utilização do sistema
         *     produces:
         *       - application/json
	 *     parameters:
	 *       - name: pacientes 
	 *         description: pacientes object
   *         in: body
         *     responses:
         *       200:
         *         description: Criado com sucesso
         */
  /**
         * @swagger
         * /pacientes/{id}:
         *   put:
         *     tags:
         *       - Pacientes
         *     description: Alterar os dados de uma pacientes para utilização do sistema
         *     produces:
         *       - application/json
	 *     parameters:
	 *       - name: pacientes 
	 *         description: pacientes object
   *         in: body
   *         schema:
   *           type: array
         *     responses:
         *       200:
         *         description: Alterado com sucesso
         */
  /**
         * @swagger
         * /pacientes/{id}:
         *   delete:
         *     tags:
         *       - Pacientes
         *     description: Deletar os dados de uma pacientes para utilização do sistema
         *     produces:
         *       - application/json
	 *     parameters:
	 *       - name: id 
	 *         description: supervisore id
   *         in: path
   *         schema:
   *         required: true
   *         type: integer
   *     
   *         responses:
         *     200:
         *      description: Deletado com sucesso
         */    

  /**
         * @swagger
         * definitions:
         *   Estagiario:
         *     properties:
         *        name:
         *          type: string
         *        email:
         *           type: string
         *        telefone:
         *            type: string
         *        data nascimento:
         *            type: date
   */

  /**
         * @swagger
         * /estagiarios:
         *   get:
         *     tags:
         *       - Estagiarios
         *     description: Retornado todas os estagiario
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description:  Um array das estagiarios
         */   

  /**
         * @swagger
         * /estagiario/:
         *   post:
         *     tags:
         *       - Estagiarios
         *     description: Cadastar um novo estagiario para utilização do sistema
         *     produces:
         *       - application/json
	 *     parameters:
	 *       - name: estagiarios
	 *         description: estagiario object
   *         in: body
         *     responses:
         *       200:
         *         description: Criado com sucesso
         */
  /**
         * @swagger
         * /estagiarios/{id}:
         *   put:
         *     tags:
         *       - Estagiarios
         *     description: Alterar os dados de uma estagiarios para utilização do sistema
         *     produces:
         *       - application/json
	 *     parameters:
	 *       - name: estagiarios 
	 *         description: estagiarios object
   *         in: body
   *         schema:
   *           type: array
         *     responses:
         *       200:
         *         description: Alterado com sucesso
         */
  /**
         * @swagger
         * /estagiarios/{id}:
         *   delete:
         *     tags:
         *       - Estagiarios
         *     description: Deletar os dados de uma estagiarios para utilização do sistema
         *     produces:
         *       - application/json
	 *     parameters:
	 *       - name: id 
	 *         description: estagiarios id
   *         in: path
   *         schema:
   *         required: true
   *         type: integer
   *     
   *         responses:
         *     200:
         *      description: Deletado com sucesso
         */    

