// Associar os métodos da camada de controle de cliente
// às requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; // micro-aplicação HTTP
import ClienteCtrl from "../Controle/clienteCtrl.js";


const clienteCtrl = new ClienteCtrl();
const rotaCliente = Router();

rotaCliente.post("/", clienteCtrl.gravar); 
rotaCliente.put("/:id", clienteCtrl.editar); 
rotaCliente.patch("/:id", clienteCtrl.editar); 
rotaCliente.delete("/:id", clienteCtrl.excluir); 
rotaCliente.get("/:id", clienteCtrl.consultar); 
rotaCliente.get("/", clienteCtrl.consultar); 

export default rotaCliente;
