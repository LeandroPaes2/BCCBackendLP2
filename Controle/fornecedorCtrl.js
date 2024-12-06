import Fornecedor from "../Modelo/fornecedor.js";
export default class FornecedorCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome;
            const endereco = requisicao.body.endereco;
            const contato = requisicao.body.contato;
            const cpf = requisicao.body.cpf;

            // Validação pseudo básica
            if (nome && endereco && contato && cpf) {
                const fornecedor = new Fornecedor(0, nome, endereco, contato, cpf);

                fornecedor.consultar(codigo)
                    .then((listaFornecedores) => {
                        if (listaFornecedores.length === 0) {
                            fornecedor.incluir()
                                .then(() => {
                                    resposta.status(200).json({
                                        "status": true,
                                        "mensagem": "Fornecedor adicionado com sucesso!",
                                        "codigo": fornecedor.codigo
                                    });
                                })
                                .catch((erro) => {
                                    resposta.status(500).json({
                                        "status": false,
                                        "mensagem": `Não foi possível incluir o fornecedor: ${erro.message}`
                                    });
                                });
                        } else {
                            resposta.status(400).json({
                                "status": false,
                                "mensagem": "O código informado já está cadastrado para outro fornecedor."
                            });
                        }
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": `Erro ao verificar fornecedor: ${erro.message}`
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados do fornecedor conforme documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    editar(requisicao, resposta) {
        resposta.type("application/json");

        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const codigo = requisicao.params.codigo;
            const nome = requisicao.body.nome;
            const endereco = requisicao.body.endereco;
            const contato = requisicao.body.contato;
            const cpf = requisicao.body.cpf;

            if (codigo && nome && endereco && contato && cpf) {
                const fornecedor = new Fornecedor(codigo, nome, endereco, contato, cpf);

                fornecedor.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor alterado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": `Não foi possível alterar o fornecedor: ${erro.message}`
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados do fornecedor conforme documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === 'DELETE') {
            const codigo = requisicao.params.codigo;

            if (codigo) {
                const fornecedor = new Fornecedor(codigo);

                fornecedor.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor excluído com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": `Não foi possível excluir o fornecedor: ${erro.message}`
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe um código válido de fornecedor conforme documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === 'GET') {
            let codigo = requisicao.params.codigo;

            if (!codigo) {
                codigo = ""; // Retorna todos os fornecedores se o código não for informado
            }

            const fornecedor = new Fornecedor();

            fornecedor.consultar(codigo)
                .then((listaFornecedores) => {
                    resposta.status(200).json(listaFornecedores);
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": `Erro ao consultar fornecedores: ${erro.message}`
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
