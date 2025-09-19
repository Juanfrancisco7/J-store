// Mostrar mensaje de donación al inicio (siempre)
mostrarMensajeDonacion();

function mostrarMensajeDonacion() {
  // Crear el overlay de fondo
  const overlay = document.createElement("div");
  overlay.classList.add("donation-overlay");
  
  // Crear el contenedor del mensaje
  const mensajeDonacion = document.createElement("div");
  mensajeDonacion.classList.add("mensaje-donacion");
  mensajeDonacion.innerHTML = `
    <div class="donation-content">
      <div class="donation-header">
        <h2>¡Únete a MundoJuan!</h2>
        <p>Si deseas ser parte de este maravilloso proyecto y contribuir a su realización, te invitamos a hacer una donación para que <a href="https://www.mundojuan.com" target="_blank" class="mundojuan-link">MundoJuan</a> se haga realidad lo antes posible. Tu apoyo es fundamental para llevar esta iniciativa. ¡Gracias!</p>
      </div>
      
      <div class="paypal-container">
        <a href="https://www.paypal.me/juanfchacin7" target="_blank" class="paypal-link">
          <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp_cc_mark_37x23.jpg" alt="PayPal" class="paypal-logo">
          <span>Donar con PayPal</span>
        </a>
      </div>
      
      <div class="donation-actions">
        <button id="continuar" class="continuar-btn">Continuar</button>
        <p id="contador" class="countdown-text">Redirigiendo en 15 segundos...</p>
      </div>
    </div>
  `;

  // Añadir elementos al cuerpo del documento
  document.body.appendChild(overlay);
  document.body.appendChild(mensajeDonacion);

  // Configurar el contador de 15 segundos
  let countdown = 15;
  const contadorElem = document.getElementById('contador');
  const intervalo = setInterval(() => {
    contadorElem.textContent = `Redirigiendo en ${countdown--} segundos...`;
    if (countdown < 0) {
      clearInterval(intervalo);
      cerrarMensajeDonacion();
    }
  }, 1000);

  // Función para cerrar el mensaje
  function cerrarMensajeDonacion() {
    mensajeDonacion.style.animation = 'fadeOut 0.3s ease-out';
    overlay.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
      mensajeDonacion.remove();
      overlay.remove();
    }, 300);
  }

  // Manejar el botón "Continuar"
  const continuarBtn = document.getElementById('continuar');
  continuarBtn.addEventListener('click', () => {
    clearInterval(intervalo);
    cerrarMensajeDonacion();
  });

  // Cerrar al hacer clic en el overlay
  overlay.addEventListener('click', () => {
    clearInterval(intervalo);
    cerrarMensajeDonacion();
  });

  // El mensaje aparecerá cada vez que se cargue la página
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
      }, 45000); // Repetir cada 45 segundos
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
      <div class="floating-content">
        <div class="floating-icon">
          <span>💝</span>
        </div>
        <div class="floating-text">
          <p>¿Aún no has donado?</p>
          <p>Ayuda a hacer realidad <a href="https://www.paypal.me/juanfchacin7" target="_blank" class="donacion-link">MundoJuan</a></p>
        </div>
        <button class="cerrar-flotante" aria-label="Cerrar">✖</button>
      </div>
    `;

    // Agregar el mensaje al cuerpo del documento
    document.body.appendChild(mensajeFlotante);

    // Agregar animación de entrada
    setTimeout(() => {
      mensajeFlotante.classList.add('show');
    }, 100);

    // Función para cerrar con animación
    function cerrarMensajeFlotante() {
      mensajeFlotante.classList.add('hide');
      setTimeout(() => {
        if (document.body.contains(mensajeFlotante)) {
          mensajeFlotante.remove();
        }
      }, 300);
    }

    // Agregar evento al botón de cerrar
    mensajeFlotante.querySelector(".cerrar-flotante").addEventListener("click", cerrarMensajeFlotante);

    // Eliminar el mensaje después de 10 segundos si no ha sido cerrado manualmente
    setTimeout(() => {
      if (document.body.contains(mensajeFlotante)) {
        cerrarMensajeFlotante();
      }
    }, 10000);
  }

  // Estilos CSS completos para ambos mensajes
  const estilo = document.createElement("style");
  estilo.innerHTML = `
    /* Estilos para el mensaje de donación principal */
    .donation-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 9998;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: fadeIn 0.3s ease-out;
    }

    .mensaje-donacion {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      animation: slideIn 0.4s ease-out;
    }

    .donation-content {
      padding: 40px 30px;
      text-align: center;
    }

    .donation-header h2 {
      font-family: 'Titillium-Bold', Arial, sans-serif;
      font-size: 28px;
      color: #f8436e;
      margin: 0 0 20px 0;
      text-align: center;
    }

    .donation-header p {
      font-family: 'Titillium-Light', Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #333;
      margin: 0 0 30px 0;
      text-align: center;
    }

    .mundojuan-link {
      color: #f8436e;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    .mundojuan-link:hover {
      color: #ea6464;
      text-decoration: underline;
    }

    .paypal-container {
      margin: 30px 0;
      text-align: center;
    }

    .paypal-link {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #0070ba 0%, #005ea6 100%);
      color: white;
      text-decoration: none;
      padding: 15px 25px;
      border-radius: 50px;
      font-family: 'Titillium-Bold', Arial, sans-serif;
      font-size: 16px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 112, 186, 0.3);
    }

    .paypal-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 112, 186, 0.4);
      color: white;
      text-decoration: none;
    }

    .paypal-logo {
      width: 30px;
      height: auto;
    }

    .donation-actions {
      margin-top: 30px;
      text-align: center;
    }

    .continuar-btn {
      background: linear-gradient(135deg, #f8436e 0%, #ea6464 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 25px;
      font-family: 'Titillium-Bold', Arial, sans-serif;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(248, 67, 110, 0.3);
      margin-bottom: 15px;
    }

    .continuar-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(248, 67, 110, 0.4);
    }

    .countdown-text {
      font-family: 'Titillium-Light', Arial, sans-serif;
      font-size: 14px;
      color: #666;
      margin: 0;
    }

    /* Estilos para el mensaje flotante */
    .mensaje-flotante {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: linear-gradient(135deg, #f8436e 0%, #ea6464 100%);
      color: white;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(248, 67, 110, 0.3);
      z-index: 1000;
      max-width: 320px;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    }

    .mensaje-flotante.show {
      opacity: 1;
      transform: translateY(0);
    }

    .mensaje-flotante.hide {
      opacity: 0;
      transform: translateY(20px);
    }

    .floating-content {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      gap: 15px;
    }

    .floating-icon {
      font-size: 24px;
      flex-shrink: 0;
    }

    .floating-text {
      flex: 1;
    }

    .floating-text p {
      margin: 0;
      font-family: 'Titillium-Light', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.4;
    }

    .floating-text p:first-child {
      font-family: 'Titillium-Bold', Arial, sans-serif;
      font-size: 15px;
      margin-bottom: 5px;
    }

    .donacion-link {
      color: #FFD700;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    .donacion-link:hover {
      color: #FFF;
      text-decoration: underline;
    }

    .cerrar-flotante {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      transition: all 0.3s ease;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cerrar-flotante:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    /* Animaciones */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes slideIn {
      from { 
        opacity: 0;
        transform: translate(-50%, -60%);
      }
      to { 
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .mensaje-donacion {
        width: 95%;
        margin: 20px;
      }

      .donation-content {
        padding: 30px 20px;
      }

      .donation-header h2 {
        font-size: 24px;
      }

      .donation-header p {
        font-size: 14px;
      }

      .mensaje-flotante {
        bottom: 20px;
        right: 20px;
        left: 20px;
        max-width: none;
      }

      .floating-content {
        padding: 12px 15px;
        gap: 12px;
      }

      .floating-icon {
        font-size: 20px;
      }

      .floating-text p {
        font-size: 13px;
      }

      .floating-text p:first-child {
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      .donation-content {
        padding: 25px 15px;
      }

      .donation-header h2 {
        font-size: 22px;
      }

      .paypal-link {
        padding: 12px 20px;
        font-size: 14px;
      }

      .continuar-btn {
        padding: 10px 25px;
        font-size: 14px;
      }
    }
  `;

  // Agregar los estilos al documento
  document.head.appendChild(estilo);
});
