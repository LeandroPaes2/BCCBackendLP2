import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
    // Atributos privados
    #id;
    #nomeCompleto;
    #email;
    #telefone;
    #documento;

    // Construtor da classe
    constructor(id = 0, nomeCompleto = "", email = "", telefone = "", documento = "") {
        this.#id = id;
        this.#nomeCompleto = nomeCompleto;
        this.#email = email;
        this.#telefone = telefone;
        this.#documento = documento;
    }

    // Getters e setters para os atributos
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get nomeCompleto() {
        return this.#nomeCompleto;
    }

    set nomeCompleto(value) {
        this.#nomeCompleto = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(value) {
        this.#telefone = value;
    }

    get documento() {
        return this.#documento;
    }

    set documento(value) {
        this.#documento = value;
    }

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            id: this.#id,
            nomeCompleto: this.#nomeCompleto,
            email: this.#email,
            telefone: this.#telefone,
            documento: this.#documento
        };
    }

    // Métodos para persistência
    async gravar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.gravar(this);
    }

    async editar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.editar(this);
    }

    async excluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }

    async consultar(termo) {
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(termo);
    }
}
