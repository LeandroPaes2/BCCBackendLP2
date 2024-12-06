import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
    // Atributos privados
    #id;
    #nome;
    #email;
    #telefone;
    #cpf;

    // Construtor da classe
    constructor(id = 0, nome = "", email = "", telefone = "", cpf = "") {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#telefone = telefone;
        this.#cpf = cpf;
    }

    // Getters e setters para os atributos
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#nome = value;
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

    get cpf() {
        return this.#cpf;
    }

    set cpf(value) {
        this.#cpf = value;
    }

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            telefone: this.#telefone,
            cpf: this.#cpf
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
