
import { useEffect, useState } from "react";

import {
obtenerServicios, obtenerClientesCatalogo, obtenerTecnicosCatalogo,
crearServicio, actualizarServicio, eliminarServicio
} from "../services/api";


function Servicios() {
const [servicios, setServicios] = useState([]);
const [clientes, setClientes] = useState([]);
const [tecnicos, setTecnicos] = useState([]);
const [clienteId, setClienteId] = useState("");
const [tecnicoId, setTecnicoId] = useState("");
const [descripcion, setDescripcion] = useState("");
const [estado, setEstado] = useState("Pendiente");
const [fecha, setFecha] = useState("");
const [editandoId, setEditandoId] = useState(null);
const [mensaje, setMensaje] = useState("");
const [cargando, setCargando] = useState(false);

const cargarDatos = async () => {
    try {
    const [s, c, t] = await Promise.all([
        obtenerServicios(),
        obtenerClientesCatalogo(),
        obtenerTecnicosCatalogo()
    ]);

    if (s.ok) setServicios(s.datos.servicios || []);
    if (c.ok) setClientes(c.datos.clientes || []);
    if (t.ok) setTecnicos(t.datos.tecnicos || []);
    } catch (error) {
    console.error(error);
    setMensaje("Error al cargar los datos.");
    }
};

useEffect(() => {
    cargarDatos();
}, []);

const limpiar = () => {
    setClienteId("");
    setTecnicoId("");
    setDescripcion("");
    setEstado("Pendiente");
    setFecha("");
    setEditandoId(null);
};



const guardar = async (e) => {
    e.preventDefault();

    if (!clienteId || !tecnicoId || !descripcion.trim() || !estado || !fecha) {
    setMensaje("Completa todos los campos.");
    return;
    }


    setCargando(true);
    setMensaje("");


    try {
    const datos = {
        cliente_id: Number(clienteId),
        tecnico_id: Number(tecnicoId),
        descripcion,
        estado,
        fecha
    };

    
    const r = editandoId
        ? await actualizarServicio(editandoId, datos)
        : await crearServicio(datos);


    setMensaje(r.datos.message || "Operación realizada correctamente.");

    if (r.ok) {
        limpiar();
        await cargarDatos();
    }
    } catch (error) {

    console.error(error);
    setMensaje("No fue posible guardar el servicio.");
    } finally {

    setCargando(false);
    }
};

  // Normalizar la fecha para el input type="date"
const normalizarFecha = (fechaStr) => {
    if (!fechaStr) return "";

    const valor = String(fechaStr).trim();

    // Formato YYYY-MM-DD o YYYY-MM-DD HH:mm:ss
    const iso = valor.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (iso) {
    return `${iso[1]}-${iso[2]}-${iso[3]}`;
    }

    // Formato DD/MM/YYYY
    const local = valor.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (local) {
    return `${local[3]}-${local[2]}-${local[1]}`;
    }

    // Fechas que Flask puede devolver, por ejemplo:
    // Thu, 22 Oct 2026 00:00:00 GMT
    const d = new Date(valor);

    if (!isNaN(d.getTime())) {
    const anio = d.getUTCFullYear();
    const mes = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dia = String(d.getUTCDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
    }

    return "";
};

const editar = (s) => {
    setEditandoId(s.id);
    setClienteId(String(s.cliente_id ?? ""));
    setTecnicoId(String(s.tecnico_id ?? ""));
    setDescripcion(s.descripcion || "");
    setEstado(s.estado || "Pendiente");
    setFecha(normalizarFecha(s.fecha));
};


const eliminar = async (id) => {
    if (!window.confirm("¿Deseas eliminar este registro?")) return;

    try {
    const r = await eliminarServicio(id);

    setMensaje(r.datos.message || "Operación realizada correctamente.");

    if (r.ok) await cargarDatos();
    } catch (error) {
    console.error(error);
    setMensaje("No fue posible eliminar el servicio.");
    }
};

  // Mostrar la fecha sin cambiar el día por la zona horaria
const formatearFechaVisual = (fechaStr) => {
    const fechaNormalizada = normalizarFecha(fechaStr);

    if (!fechaNormalizada) return fechaStr || "";

    const partes = fechaNormalizada.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
};

const estiloCampo = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #555",
    backgroundColor: "#333",
    color: "white",
    outline: "none"
};

return (
    <div
    className="dashboard"
    style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
    >
    <h1
        style={{
        fontSize: "36px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#000"
        }}
    >
        Servicios Técnicos
    </h1>

    <form
        onSubmit={guardar}
        style={{
        marginBottom: "20px",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        flexWrap: "wrap"
        }}
    >
        {/* Select Cliente */}
        <select
        value={clienteId}
        onChange={e => setClienteId(e.target.value)}
        style={estiloCampo}
        >
        <option value="" style={{ background: "#fff", color: "#000" }}>
            Seleccione cliente
        </option>

        {clientes.map(c => (
            <option
            key={c.id}
            value={c.id}
            style={{ background: "#fff", color: "#000" }}
            >
            {c.nombre}
            </option>
        ))}
        </select>

        {/* Select Técnico */}
        <select
        value={tecnicoId}
        onChange={e => setTecnicoId(e.target.value)}
        style={estiloCampo}
        >
        <option value="" style={{ background: "#fff", color: "#000" }}>
            Seleccione técnico
        </option>

        {tecnicos.map(t => (
            <option
            key={t.id}
            value={t.id}
            style={{ background: "#fff", color: "#000" }}
            >
            {t.nombre}
            </option>
        ))}
        </select>

        {/* Select Estado */}
        <select
        value={estado}
        onChange={e => setEstado(e.target.value)}
        style={estiloCampo}
        >
        <option style={{ background: "#fff", color: "#000" }}>
            Pendiente
        </option>
        <option style={{ background: "#fff", color: "#000" }}>
            En proceso
        </option>
        <option style={{ background: "#fff", color: "#000" }}>
        Terminado
        </option>
        <option style={{ background: "#fff", color: "#000" }}>
            Cancelado
        </option>
        </select>

        {/* Input Descripción */}
        <input
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        placeholder="Descripción"
        style={{ ...estiloCampo, width: "180px" }}
        />

        {/* Input Fecha */}
        <input
        type="date"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
        style={estiloCampo}
        />

        {/* Botón Registrar / Actualizar */}
        <button
        type="submit"
        disabled={cargando}
        style={{
            padding: "8px 15px",
            cursor: "pointer",
            backgroundColor: "#204874",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold"
        }}
        >
        {cargando ? "Guardando..." : (editandoId ? "Actualizar" : "Registrar")}
        </button>

        {/* Botón Cancelar */}
        {editandoId && (
        <button
            type="button"
            onClick={limpiar}
            disabled={cargando}
            style={{
            padding: "8px 15px",
            cursor: "pointer",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px"
            }}
        >
            Cancelar
        </button>
        )}
    </form>

    {mensaje && (
        <p
        style={{
            color: "red",
            fontWeight: "bold",
            marginBottom: "15px"
        }}
        >
        {mensaje}
        </p>
    )}

    <div style={{ overflowX: "auto" }}>
        <table
        style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            borderRadius: "6px",
            overflow: "hidden"
        }}
        >
        <thead>
            <tr
            style={{
                backgroundColor: "#ffffff",
                borderBottom: "2px solid #dee2e6",
                textAlign: "left"
            }}
            >
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Cliente</th>
            <th style={{ padding: "12px" }}>Técnico</th>
            <th style={{ padding: "12px" }}>Descripción</th>
            <th style={{ padding: "12px" }}>Estado</th>
            <th style={{ padding: "12px" }}>Fecha</th>
            <th style={{ padding: "12px", textAlign: "center" }}>
                Acciones
            </th>
            </tr>
        </thead>

        <tbody>
            {servicios.map((s, index) => (
            <tr
                key={s.id}
                style={{
                borderBottom: "1px solid #dee2e6",
                backgroundColor: index % 2 === 0 ? "#fff" : "#fdfdfd"
                }}
            >
                <td style={{ padding: "12px" }}>{s.id}</td>
                <td style={{ padding: "12px" }}>{s.cliente_nombre}</td>
                <td style={{ padding: "12px" }}>{s.tecnico_nombre}</td>
                <td style={{ padding: "12px" }}>{s.descripcion}</td>
                <td style={{ padding: "12px" }}>{s.estado}</td>
                <td style={{ padding: "12px" }}>
                {formatearFechaVisual(s.fecha)}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                <button
                    onClick={() => editar(s)}
                    style={{
                    padding: "6px 12px",
                    marginRight: "8px",
                    cursor: "pointer",
                    backgroundColor: "#224766",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontWeight: "bold"
                    }}
                >
                    Editar
                </button>

                <button
                    onClick={() => eliminar(s.id)}
                    style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    backgroundColor: "#66232a",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontWeight: "bold"
                    }}
                >
                    Eliminar
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>
);
}

export default Servicios;