// DAO - Data Access Object
import Fornecedor from "../Modelo/fornecedor.js";
import conectar from "./Conexao.js";

export default class FornecedorDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); // Retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS fornecedor (
                forn_codigo INT NOT NULL AUTO_INCREMENT,
                forn_nome VARCHAR(200) NOT NULL,
                forn_endereco VARCHAR(255) NOT NULL,
                forn_contato VARCHAR(50) NOT NULL,
                forn_cpf VARCHAR(15) NOT NULL,
                CONSTRAINT pk_fornecedor PRIMARY KEY (forn_codigo)
            )
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO fornecedor (forn_nome, forn_endereco, forn_contato, forn_cpf)
                VALUES (?, ?, ?, ?)
            `;
            const parametros = [
                fornecedor.nome,
                fornecedor.endereco,
                fornecedor.contato,
                fornecedor.cpf,
            ];
            const resultado = await conexao.execute(sql, parametros);
            fornecedor.codigo = resultado[0].insertId; // Atualiza o código do fornecedor
            await conexao.release(); // Libera a conexão
        }
    }

    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                UPDATE fornecedor 
                SET forn_nome = ?, forn_endereco = ?, forn_contato = ?, forn_cpf = ?
                WHERE forn_codigo = ?
            `;
            const parametros = [
                fornecedor.nome,
                fornecedor.endereco,
                fornecedor.contato,
                fornecedor.cpf,
                fornecedor.codigo,
            ];
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];

        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM fornecedor WHERE forn_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM fornecedor WHERE forn_codigo = ?`;
            parametros = [termo];
        }

        const [linhas] = await conexao.execute(sql, parametros);
        const listaFornecedores = linhas.map(linha => new Fornecedor(
            linha["forn_codigo"],
            linha["forn_nome"],
            linha["forn_endereco"],
            linha["forn_contato"],
            linha["forn_cpf"]
        ));
        await conexao.release();
        return listaFornecedores;
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `DELETE FROM fornecedor WHERE forn_codigo = ?`;
            const parametros = [fornecedor.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }
}
