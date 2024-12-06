import Cliente from "../Modelo/cliente.js";
import conectar from "./Conexao.js";

export default class ClienteDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS cliente (
                    id INT NOT NULL AUTO_INCREMENT,
                    nomeCompleto VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    telefone VARCHAR(20) NOT NULL,
                    documento VARCHAR(20) NOT NULL UNIQUE,
                    CONSTRAINT pk_cliente PRIMARY KEY (id)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (erro) {
            console.log("Erro ao iniciar a tabela cliente: " + erro.message);
        }
    }

    async gravar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO cliente (nomeCompleto, email, telefone, documento)
                VALUES (?, ?, ?, ?);
            `;
            const parametros = [cliente.nomeCompleto, cliente.email, cliente.telefone, cliente.documento];
            const resultado = await conexao.execute(sql, parametros);
            cliente.id = resultado[0].insertId;
            await conexao.release();
        }
    }

    async editar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `
                UPDATE cliente
                SET nomeCompleto = ?, email = ?, telefone = ?, documento = ?
                WHERE id = ?;
            `;
            const parametros = [cliente.nomeCompleto, cliente.email, cliente.telefone, cliente.documento, cliente.id];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `
                DELETE FROM cliente
                WHERE id = ?;
            `;
            const parametros = [cliente.id];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `
                SELECT * FROM cliente
                WHERE nomeCompleto LIKE ? OR email LIKE ? OR documento LIKE ?
                ORDER BY nomeCompleto;
            `;
            const termoBusca = `%${termo}%`;
            parametros = [termoBusca, termoBusca, termoBusca];
        } else {
            sql = `
                SELECT * FROM cliente
                WHERE id = ?
                ORDER BY nomeCompleto;
            `;
            parametros = [termo];
        }

        const conexao = await conectar();
        const [registros] = await conexao.query(sql, parametros);
        await conexao.release();

        const listaClientes = [];
        for (const registro of registros) {
            const cliente = new Cliente(
                registro['id'],
                registro['nomeCompleto'],
                registro['email'],
                registro['telefone'],
                registro['documento']
            );
            listaClientes.push(cliente);
        }

        return listaClientes;
    }
}
