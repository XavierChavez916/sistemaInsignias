// script.js

// Obtener los datos de las actividades desde el backend usando Axios
axios.get('/api/actividades')
  .then(response => {
    const actividadesTable = document.getElementById('actividades-table');
    response.data.forEach(actividad => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${actividad.tarea}</td><td>${actividad.servicio}</td>`;
      actividadesTable.appendChild(row);
    });

    // Obtener los datos de los usuarios desde el backend usando Axios
    axios.get('/api/usuarios')
      .then(response => {
        const usuariosTable = document.getElementById('usuarios-table');
        response.data.forEach(usuario => {
          const row = document.createElement('tr');
          row.innerHTML = `<td>${usuario.nombre}</td><td>${usuario.puntos}</td>`;
          usuariosTable.appendChild(row);
        });

        // Crear el gráfico de barras
        const data = {
          labels: response.data.map(usuario => usuario.nombre),
          datasets: [{
            label: 'Puntos',
            data: response.data.map(usuario => usuario.puntos),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        };

        const ctx = document.getElementById('barchart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Error al obtener los datos de usuarios:', error);
      });
  })
  .catch(error => {
    console.error('Error al obtener los datos de actividades:', error);
  });
