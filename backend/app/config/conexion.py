import mysql.connector
from mysql.connector import Error
HOST = "localhost"
USER = "root"
PASSWORD = ""
DATABASE = "tecnico"

def conectar():
    try:
        conexion = mysql.connector.connect(
            host=HOST,
            user=USER,
            password=PASSWORD,
            database=DATABASE
        )
        if conexion.is_connected():
            print("Conexion exitosa a la base de datos")
            return conexion
    except Error as e:
        print(f"Erroral conectar BD:{e}")
    return None 