import Usuario from "../Modelo/usuario.js";

export default class UsuarioCtrl {

    // Método para gravar um novo usuário
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome;
            const email = requisicao.body.email;
            const senha = requisicao.body.senha;

            // Validação simples
            if (nome && email && senha) {
                const usuario = new Usuario(0, nome, email, senha);

                usuario.gravar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuário criado com sucesso!",
                            "id": usuario.id
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível criar o usuário: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe todos os dados do usuário corretamente."
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    // Método para editar os dados de um usuário existente
    editar(requisicao, resposta) {
        resposta.type("application/json");

        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const id = requisicao.params.id;
            const nome = requisicao.body.nome;
            const email = requisicao.body.email;
            const senha = requisicao.body.senha;

            // Validação simples
            if (id && nome && email && senha) {
                const usuario = new Usuario(id, nome, email, senha);

                usuario.editar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuário atualizado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível atualizar o usuário: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe todos os dados do usuário corretamente."
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    // Método para excluir um usuário
    excluir(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === 'DELETE') {
            const id = requisicao.params.id;

            if (id) {
                const usuario = new Usuario(id);

                usuario.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuário excluído com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o usuário: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe um código válido de usuário."
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    // Método para consultar um usuário por ID ou todos os usuários
    consultar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === 'GET') {
            let id = requisicao.params.id;

            if (!id) {
                id = ""; // Retorna todos os usuários se o id não for informado
            }

            const usuario = new Usuario();

            usuario.consultar(id)
                .then((listaUsuarios) => {
                    resposta.status(200).json(listaUsuarios);
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar usuários: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }
}
