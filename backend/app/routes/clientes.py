from flask import Blueprint, jsonify, request
from app.config.conexion import conectar

clientes_bp = Blueprint("clientes", __name__)

# 1. GET (Listar) - Ya lo tenías
@clientes_bp.route("/api/clientes", methods=["GET"])
def obtener_clientes():
    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "No se pudo conectar a la base de datos"}), 500
    
    cursor = None
    try:
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuario")
        clientes = cursor.fetchall()
        return jsonify({"success": True, "clientes": clientes}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()

# 2. POST (Crear)
@clientes_bp.route("/api/clientes", methods=["POST"])
def crear_cliente():
    datos = request.get_json(silent=True)
    if not isinstance(datos, dict):
        return jsonify({"success": False, "message": "JSON válido requerido"}), 400
    
    username = datos.get("username")
    if not isinstance(username, str) or not username.strip():
        return jsonify({"success": False, "message": "El nombre de usuario es obligatorio"}), 400
        
    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500
        
    cursor = None
    try:
        cursor = conexion.cursor()
        # Ajustado a tu tabla usuario y columna username
        cursor.execute("INSERT INTO usuario (username) VALUES (%s)", (username.strip(),))
        conexion.commit()
        return jsonify({
            "success": True, 
            "message": "Usuario creado",
            "id": cursor.lastrowid
        }), 201
    except Exception as e:
        conexion.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        conexion.close()

# 3. PUT (Actualizar)
@clientes_bp.route("/api/clientes/<int:cliente_id>", methods=["PUT"])
def actualizar_cliente(cliente_id):
    datos = request.get_json(silent=True)
    if not isinstance(datos, dict):
        return jsonify({"success": False, "message": "JSON válido requerido"}), 400
        
    username = datos.get("username")
    if not isinstance(username, str) or not username.strip():
        return jsonify({"success": False, "message": "El nombre de usuario es obligatorio"}), 400
        
    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500
        
    cursor = None
    try:
        cursor = conexion.cursor()
        cursor.execute("UPDATE usuario SET username=%s WHERE id=%s", (username.strip(), cliente_id))
        conexion.commit()
        
        if cursor.rowcount == 0:
            return jsonify({"success": False, "message": "No encontrado o sin cambios"}), 404
            
        return jsonify({"success": True, "message": "Usuario actualizado"}), 200
    except Exception as e:
        conexion.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        conexion.close()

# 4. DELETE (Eliminar)
@clientes_bp.route("/api/clientes/<int:cliente_id>", methods=["DELETE"])
def eliminar_cliente(cliente_id):
    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500
        
    cursor = None
    try:
        cursor = conexion.cursor()
        cursor.execute("DELETE FROM usuario WHERE id=%s", (cliente_id,))
        conexion.commit()
        
        if cursor.rowcount == 0:
            return jsonify({"success": False, "message": "Usuario no encontrado"}), 404
            
        return jsonify({"success": True, "message": "Usuario eliminado"}), 200
    except Exception as e:
        conexion.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        conexion.close()
@clientes_bp.route("/api/clientes/catalogo", methods=["GET"])
def catalogo_clientes():
    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500
    cursor = None
    try:
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT id, nombre FROM cliente ORDER BY nombre")
        return jsonify({"success": True, "clientes": cursor.fetchall()}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor: cursor.close()
        conexion.close()








