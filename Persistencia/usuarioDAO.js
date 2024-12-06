import conectar from "./Conexao.js";
import Usuario from "../Modelo/usuario.js";

export default class UsuarioDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS usuario (
                    id INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    senha VARCHAR(255) NOT NULL,
                    CONSTRAINT pk_usuario PRIMARY KEY(id)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (erro) {
            console.log("Erro ao inicializar a tabela de usuários: ", erro);
        }
    }

    async gravar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
            const parametros = [usuario.nome, usuario.email, usuario.senha];
            const resultado = await conexao.execute(sql, parametros);
            usuario.id = resultado[0].insertId;
            await conexao.release();
        }
    }

    async editar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?";
            const parametros = [usuario.nome, usuario.email, usuario.senha, usuario.id];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = "DELETE FROM usuario WHERE id = ?";
            const parametros = [usuario.id];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(id) {
        let sql = "";
        let parametros = [];

        if (!id) {
            sql = "SELECT * FROM usuario ORDER BY nome";
        } else {
            sql = "SELECT * FROM usuario WHERE id = ?";
            parametros.push(id);
        }

        const conexao = await conectar();
        const [registros] = await conexao.query(sql, parametros);
        await conexao.release();

        let listaUsuarios = [];
        for (const registro of registros) {
            const usuario = new Usuario(registro.id, registro.nome, registro.email, registro.senha);
            listaUsuarios.push(usuario);
        }

        return listaUsuarios;
    }
}
