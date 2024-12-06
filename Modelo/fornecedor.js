import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    #codigo;
    #nome;
    #endereco;
    #contato;
    #cpf;

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get contato() {
        return this.#contato;
    }

    set contato(novoContato) {
        this.#contato = novoContato;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    
    constructor(codigo = 0, nome = "", endereco = "", contato = "", cpf = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#contato = contato;
        this.#cpf = cpf;
    }

    
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "contato": this.#contato,
            "cpf": this.#cpf
        };
    }

    async incluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.incluir(this);
    }

    async consultar(termo) {
        const fornecedorDAO = new FornecedorDAO();
        return await fornecedorDAO.consultar(termo);
    }

    async excluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.excluir(this);
    }

    async alterar() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.alterar(this);
    }
}
