import { Router } from "express";  // Micro-aplicação HTTP
import UsuarioCtrl from "../Controle/usuarioCtrl.js";

const usuarioCtrl = new UsuarioCtrl();
const rotaUsuario = Router();

rotaUsuario.post("/", usuarioCtrl.gravar);
rotaUsuario.put("/:id", usuarioCtrl.editar);
rotaUsuario.patch("/:id", usuarioCtrl.editar);
rotaUsuario.delete("/:id", usuarioCtrl.excluir);
rotaUsuario.get("/:id", usuarioCtrl.consultar);
rotaUsuario.get("/", usuarioCtrl.consultar);

export default rotaUsuario;
