import Fornecedor from "../Modelo/fornecedor.js";
import conectar from "./Conexao.js";

export default class FornecedorDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS fornecedor(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(100) NOT NULL,
                    endereco VARCHAR(255) NOT NULL,
                    contato VARCHAR(50) NOT NULL,
                    cpf VARCHAR(15) NOT NULL,
                    CONSTRAINT pk_fornecedor PRIMARY KEY (codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (erro) {
            console.log("Erro ao iniciar a tabela fornecedor: " + erro.message);
        }
    }

    async gravar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO fornecedor (nome, endereco, contato, cpf) 
                VALUES (?, ?, ?, ?)
            `;
            const parametros = [
                fornecedor.nome,
                fornecedor.endereco,
                fornecedor.contato,
                fornecedor.cpf
            ];
            const resultado = await conexao.execute(sql, parametros);
            fornecedor.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async editar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                UPDATE fornecedor 
                SET nome = ?, endereco = ?, contato = ?, cpf = ? 
                WHERE codigo = ?
            `;
            const parametros = [
                fornecedor.nome,
                fornecedor.endereco,
                fornecedor.contato,
                fornecedor.cpf,
                fornecedor.codigo
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = "DELETE FROM fornecedor WHERE codigo = ?";
            const parametros = [fornecedor.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `
                SELECT * FROM fornecedor 
                WHERE nome LIKE ? OR endereco LIKE ? OR contato LIKE ? 
                ORDER BY nome
            `;
            parametros = Array(3).fill(`%${termo}%`);
        } else {
            sql = "SELECT * FROM fornecedor WHERE codigo = ? ORDER BY nome";
            parametros = [termo];
        }

        const conexao = await conectar();
        const [registros, campos] = await conexao.query(sql, parametros);
        await conexao.release();

        const listaFornecedores = registros.map(registro => 
            new Fornecedor(
                registro['codigo'],
                registro['nome'],
                registro['endereco'],
                registro['contato'],
                registro['cpf']
            )
        );

        return listaFornecedores;
    }
}
