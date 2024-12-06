import UsuarioDAO from "../Persistencia/usuarioDAO.js";

export default class Usuario {
    // Atributos privados usando a sintaxe #
    #id;
    #nome;
    #email;
    #senha;

    // Construtor da classe
    constructor(id, nome, email, senha) {
        this.#id = id;          // Atribuindo valor ao atributo privado
        this.#nome = nome;      // Atribuindo valor ao atributo privado
        this.#email = email;    // Atribuindo valor ao atributo privado
        this.#senha = senha;    // Atribuindo valor ao atributo privado
    }

    // Método get para o atributo id
    get id() {
        return this.#id;
    }

    // Método set para o atributo id
    set id(value) {
        this.#id = value;
    }

    // Método get para o atributo nome
    get nome() {
        return this.#nome;
    }

    // Método set para o atributo nome
    set nome(value) {
        this.#nome = value;
    }

    // Método get para o atributo email
    get email() {
        return this.#email;
    }

    // Método set para o atributo email
    set email(value) {
        this.#email = value;
    }

    // Método get para o atributo senha
    get senha() {
        return this.#senha;
    }

    // Método set para o atributo senha
    set senha(value) {
        this.#senha = value;
    }

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            senha: this.#senha // Certifique-se de tratar a senha adequadamente (hashing)
        };
    }

    // Métodos para integração com o DAO
    async gravar() {
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.gravar(this);
    }

    async editar() {
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.editar(this);
    }

    async excluir() {
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.excluir(this);
    }

    async consultar(termo) {
        const usuarioDAO = new UsuarioDAO();
        return await usuarioDAO.consultar(termo);
    }
}
