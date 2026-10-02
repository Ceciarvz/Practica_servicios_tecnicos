const API_URL = "http://127.0.0.1:5000/api/clientes";


// Función de login corregida para recibir username y password
export async function login(username, password) {
const r = await fetch("http://127.0.0.1:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
});
return { ok: r.ok, datos: await r.json() };
}


// Función para obtener clientes
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


