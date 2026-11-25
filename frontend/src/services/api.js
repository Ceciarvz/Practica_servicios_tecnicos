
const API_BASE = "https://servicios-tecnicos-api-zijf.onrender.com";

const API_URL = `${API_BASE}/api/clientes`;
const API_TECNICOS = `${API_BASE}/api/tecnicos`;
const API_SERVICIOS = `${API_BASE}/api/servicios`;

// Función de login
export async function login(username, password) {
    const r = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    return { ok: r.ok, datos: await r.json() };
}

// Funciones de Clientes
export async function obtenerClientes() {
    const r = await fetch(API_URL);
    const datos = await r.json();
    return datos.clientes || [];
}

export async function crearCliente(cliente) {
    const r = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    });
    return { ok: r.ok, datos: await r.json() };
}

export async function actualizarCliente(id, cliente) {
    const r = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    });
    return { ok: r.ok, datos: await r.json() };
}

export async function eliminarCliente(id) {
    const r = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return { ok: r.ok, datos: await r.json() };
}

// Funciones de Técnicos
export async function obtenerTecnicos() {
    const r = await fetch(API_TECNICOS);
    return { ok: r.ok, datos: await r.json() };
}

export async function crearTecnico(tecnico) {
    const r = await fetch(API_TECNICOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tecnico)
    });
    return { ok: r.ok, datos: await r.json() };
}

export async function actualizarTecnico(id, tecnico) {
    const r = await fetch(`${API_TECNICOS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tecnico)
    });
    return { ok: r.ok, datos: await r.json() };
}

export async function eliminarTecnico(id) {
    const r = await fetch(`${API_TECNICOS}/${id}`, {
        method: "DELETE"
    });
    return { ok: r.ok, datos: await r.json() };
}

// Funciones de Servicios
export async function obtenerServicios() {
    const r = await fetch(API_SERVICIOS);
    return { ok: r.ok, datos: await r.json() };
}

export async function obtenerClientesCatalogo() {
    const r = await fetch(`${API_URL}/catalogo`);
    return { ok: r.ok, datos: await r.json() };
}

export async function obtenerTecnicosCatalogo() {
    const r = await fetch(`${API_TECNICOS}/catalogo`);
    return { ok: r.ok, datos: await r.json() };
}

export async function crearServicio(servicio) {
    const r = await fetch(API_SERVICIOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servicio)
    });
    return { ok: r.ok, datos: await r.json() };
}

export async function actualizarServicio(id, servicio) {
    const r = await fetch(`${API_SERVICIOS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servicio)
    });
    return { ok: r.ok, datos: await r.json() };
}

export async function eliminarServicio(id) {
    const r = await fetch(`${API_SERVICIOS}/${id}`, {
        method: "DELETE"
    });
    return { ok: r.ok, datos: await r.json() };
}
