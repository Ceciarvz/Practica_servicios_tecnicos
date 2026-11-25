
import os
import mysql.connector
from mysql.connector import Error

HOST = os.getenv("DB_HOST", "localhost")
USER = os.getenv("DB_USER", "root")
PASSWORD = os.getenv("DB_PASSWORD", "")
DATABASE = os.getenv("DB_NAME", "tecnico")
PORT = int(os.getenv("DB_PORT", "3306"))

def conectar():
    try:
        conexion = mysql.connector.connect(
            host=HOST,
            port=PORT,
            user=USER,
            password=PASSWORD,
            database=DATABASE,
            ssl_disabled=False
        )

        if conexion.is_connected():
            print("Conexion exitosa a la base de datos")
            return conexion

    except Error as e:
        print(f"Error al conectar BD: {e}")

    return None
