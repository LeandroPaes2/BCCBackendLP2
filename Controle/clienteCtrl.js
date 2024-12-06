import Cliente from "../Modelo/cliente.js";

export default class ClienteCtrl {
    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const { nomeCompleto, email, telefone, documento } = requisicao.body;

            if (nomeCompleto && email && telefone && documento) {
                const cliente = new Cliente(0, nomeCompleto, email, telefone, documento);

                cliente.gravar()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Cliente cadastrado com sucesso!",
                            id: cliente.id
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: `Não foi possível cadastrar o cliente: ${erro.message}`
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe corretamente todos os dados do cliente conforme documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const id = requisicao.params.id;
            const { nomeCompleto, email, telefone, documento } = requisicao.body;

            if (id && nomeCompleto && email && telefone && documento) {
                const cliente = new Cliente(id, nomeCompleto, email, telefone, documento);

                cliente.editar()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Cliente atualizado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: `Não foi possível atualizar o cliente: ${erro.message}`
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe corretamente todos os dados do cliente conforme documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'DELETE') {
            const id = requisicao.params.id;

            if (id) {
                const cliente = new Cliente(id);

                cliente.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Cliente excluído com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: `Não foi possível excluir o cliente: ${erro.message}`
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe um ID válido de cliente conforme documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'GET') {
            const id = requisicao.params.id || "";

            const cliente = new Cliente();

            cliente.consultar(id)
                .then((listaClientes) => {
                    resposta.status(200).json(listaClientes);
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: `Erro ao consultar clientes: ${erro.message}`
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }
}
