import React, { useState, useEffect } from "react";
import { obtenerClientes, crearCliente, actualizarCliente, eliminarCliente } from "../services/api";


export default function Clientes() {
const [clientes, setClientes] = useState([]);
const [username, setUsername] = useState("");
const [editandoId, setEditandoId] = useState(null);
const [mensaje, setMensaje] = useState("");


const cargarClientes = async () => {
    const data = await obtenerClientes();
    setClientes(data);
};


useEffect(() => {
    cargarClientes();
}, []);


const guardar = async (e) => {
    e.preventDefault();
    const r = editandoId
    ? await actualizarCliente(editandoId, { username })
    : await crearCliente({ username });
    setMensaje(r.datos.message || "Solicitud procesada");
    if (r.ok) {
    setUsername("");
    setEditandoId(null);
    await cargarClientes();
    }
};


const prepararEdicion = (cliente) => {
    setEditandoId(cliente.id);
    setUsername(cliente.username);
};


const cancelarEdicion = () => {
    setEditandoId(null);
    setUsername("");
};


const borrar = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este cliente?")) return;
    const r = await eliminarCliente(id);
    setMensaje(r.datos.message || "Solicitud procesada");
    if (r.ok) await cargarClientes();
};


return (
    <div style={{ padding: "20px" }}>
    <h2>Clientes</h2>
    
    {mensaje && <p style={{ color: "red", fontWeight: "bold" }}>{mensaje}</p>}


      {/* Formulario */}
    <form onSubmit={guardar} style={{ marginBottom: "20px" }}>
        <input
        type="text"
        placeholder="Nombre del cliente"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
        {editandoId ? "Actualizar cliente" : "Agregar cliente"}
        </button>
        {editandoId && (
        <button type="button" onClick={cancelarEdicion} style={{ marginLeft: "5px" }}>
            Cancelar
        </button>
        )}
    </form>


      {/* Lista / Tabla de Clientes */}
    <ul>
        {clientes.map((cliente) => (
        <li key={cliente.id} style={{ marginBottom: "10px" }}>
            <span>{cliente.id} - {cliente.username}</span>
            <button onClick={() => prepararEdicion(cliente)} style={{ marginLeft: "10px" }}>
            Editar
            </button>
            <button onClick={() => borrar(cliente.id)} style={{ marginLeft: "5px", color: "red" }}>
            Eliminar
            </button>
        </li>
        ))}
    </ul>
    </div>
);
}


