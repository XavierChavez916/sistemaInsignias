const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

const app = express();

// Configurar el middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar el middleware para servir archivos estáticos
app.use(express.static('static'));

// Variable global para almacenar los usuarios
let usuarios = [
    { id: 1, nombre: 'Santiago', puntos: 90 },
    { id: 2, nombre: 'Xavier', puntos: 75 },
    { id: 3, nombre: 'Francisco', puntos: 50 },
    { id: 4, nombre: 'Samuel', puntos: 85 }
];

// Variable global para almacenar las actividades
let actividades = [
    { id: 1, tarea: 'Pide un taxi', servicio: 'Ktaxi' },
    { id: 2, tarea: 'Recorre 10km', servicio: 'Ktaxi'  },
    { id: 3, tarea: 'Califica a un Conductor', servicio: 'Ktaxi'  },
    { id: 4, tarea: 'Pide 2 Taxi en 1 Día', servicio: 'Ktaxi'  }
];

// Ruta para obtener los datos de usuarios
app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/api/usuarios', (req, res) => {
    // Obtener los datos enviados en la solicitud POST
    const { nombre, puntos } = req.body;

    // Generar un identificador único para el nuevo usuario
    const id = uuidv4();

    // Realizar la lógica para agregar el nuevo usuario a la lista de usuarios
    const nuevoUsuario = { id, nombre, puntos };
    usuarios.push(nuevoUsuario);

    // Enviar una respuesta con el nuevo usuario agregado
    res.json(nuevoUsuario);
});

app.delete('/api/usuarios/:id', (req, res) => {
    // Obtener el ID del usuario a eliminar desde los parámetros de la URL
    const idUsuario = parseInt(req.params.id);

    // Buscar el usuario en la lista de usuarios por su ID
    const indiceUsuario = usuarios.findIndex(usuario => usuario.id === idUsuario);

    // Verificar si se encontró el usuario
    if (indiceUsuario !== -1) {
        // Eliminar el usuario de la lista
        const usuarioEliminado = usuarios.splice(indiceUsuario, 1);
        res.json(usuarioEliminado[0]);
    } else {
        // Si el usuario no se encontró, enviar una respuesta de error
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

// Ruta para obtener los datos de actividades
app.get('/api/actividades', (req, res) => {
    res.json(actividades);
});

app.post('/api/actividades', (req, res) => {
    // Obtener los datos enviados en la solicitud POST
    const { tarea, servicio } = req.body;

    // Generar un identificador único para la nueva actividad
    const id = uuidv4();

    // Realizar la lógica para agregar la nueva actividad a la lista de actividades
    const nuevaActividad = { id, tarea, servicio };
    actividades.push(nuevaActividad);

    // Enviar una respuesta con la nueva actividad agregada
    res.json(nuevaActividad);
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor backend en ejecución en el puerto 3000');
});
