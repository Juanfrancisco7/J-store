// Mostrar mensaje de donación al inicio
if (!sessionStorage.getItem('donationMessageShown')) {
  mostrarMensajeDonacion();
}

function mostrarMensajeDonacion() {
  // Crear el contenedor del mensaje
  const mensajeDonacion = document.createElement("div");
  mensajeDonacion.classList.add("mensaje-donacion");
  mensajeDonacion.innerHTML = `
    <h2>Si deseas ser parte de este maravilloso proyecto y contribuir a su realización, te invitamos a hacer una donación para que <a href="https://www.mundojuan.com" target="_blank" class="mundojuan-link">MundoJuan</a> se haga realidad lo antes posible. Tu apoyo es fundamental para llevar esta iniciativa. ¡Gracias!</h2>
    <div class="paypal-container">
      <a href="https://www.paypal.me/juanfchacin7" target="_blank">
        <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp_cc_mark_37x23.jpg" alt="PayPal" class="paypal-logo">
      </a>
    </div>
    <button id="continuar" class="continuar-btn">Continuar</button>
    <p id="contador">Redirigiendo en 5 segundos...</p>
  `

  

  // Añadir el mensaje al cuerpo del documento
  document.body.appendChild(mensajeDonacion);

  // Configurar el contador de 15 segundos
  let countdown = 15;
  const contadorElem = document.getElementById('contador');
  const intervalo = setInterval(() => {
    contadorElem.innerText = ` ${countdown--}`;
    if (countdown < 0) {
      clearInterval(intervalo);
      mensajeDonacion.remove(); // Eliminar el mensaje de donación si se agota el tiempo
    }
  }, 1000);

  // Manejar el botón "Continuar"
  const continuarBtn = document.getElementById('continuar');
  continuarBtn.addEventListener('click', () => {
    clearInterval(intervalo); // Detener el contador si se hace clic
    mensajeDonacion.remove(); // Eliminar el mensaje de donación
  });

  // Marcar que el mensaje ha sido mostrado en esta sesión
  sessionStorage.setItem('donationMessageShown', 'true');
}

document.addEventListener("DOMContentLoaded", function () {
  let mensajeEliminado = false; // Para saber si el primer anuncio ya desapareció

  const observer = new MutationObserver(() => {
    if (!document.querySelector(".mensaje-donacion")) {
      mensajeEliminado = true;
      observer.disconnect(); // Dejar de observar cambios en el DOM
      iniciarMensajeFlotante(); // Iniciar el ciclo del mensaje flotante
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function iniciarMensajeFlotante() {
    setTimeout(() => {
      mostrarMensajeFlotante();
      setInterval(() => {
        mostrarMensajeFlotante();
      }, 30000); // Repetir cada 30 segundos
    }, 1000); // Pequeña espera para evitar problemas de sincronización
  }

  function mostrarMensajeFlotante() {
    // Verificar si ya existe un mensaje flotante y eliminarlo antes de crear uno nuevo
    const mensajeExistente = document.querySelector(".mensaje-flotante");
    if (mensajeExistente) mensajeExistente.remove();

    // Crear el mensaje flotante
    const mensajeFlotante = document.createElement("div");
    mensajeFlotante.classList.add("mensaje-flotante");
    mensajeFlotante.innerHTML = `
      <span class="cerrar-flotante">✖</span>
      <p>Si aún no nos has donado, puedes hacerlo <a href="https://www.paypal.me/juanfchacin7" target="_blank" class="donacion-link">aquí</a>.</p>
    `;

    // Agregar el mensaje al cuerpo del documento
    document.body.appendChild(mensajeFlotante);

    // Agregar evento al botón de cerrar
    mensajeFlotante.querySelector(".cerrar-flotante").addEventListener("click", () => {
      mensajeFlotante.remove();
    });

    // Eliminar el mensaje después de 10 segundos si no ha sido cerrado manualmente
    setTimeout(() => {
      if (document.body.contains(mensajeFlotante)) {
        mensajeFlotante.remove();
      }
    }, 10000);
  }

  // Estilos CSS para el mensaje flotante
  const estilo = document.createElement("style");
  estilo.innerHTML = `
    .mensaje-flotante {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      font-size: 14px;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 300px;
    }
    .donacion-link {
      color: #FFD700;
      text-decoration: underline;
    }
    .mensaje-flotante:hover {
      background: rgba(0, 0, 0, 0.9);
    }
    .cerrar-flotante {
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      color: white;
      background: rgba(255, 255, 255, 0.3);
      padding: 2px 6px;
      border-radius: 50%;
      transition: background 0.3s;
    }
    .cerrar-flotante:hover {
      background: rgba(255, 255, 255, 0.6);
    }
  `;

  // Agregar los estilos al documento
  document.head.appendChild(estilo);
});
