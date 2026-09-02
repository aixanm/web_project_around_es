# Around The U.S.

## Descripción del proyecto

"Around The U.S." es una red social de viajes donde los usuarios pueden ver, agregar, dar "me gusta" y eliminar tarjetas con fotografías de distintos lugares. El proyecto está conectado a un servidor real: los datos del perfil (nombre, descripción, avatar) y las tarjetas se cargan, editan y eliminan mediante solicitudes HTTP a una API REST, por lo que toda la información persiste entre sesiones.

## Funcionalidad

- Carga del perfil de usuario y de las tarjetas iniciales desde el servidor.
- Edición del nombre y la descripción del perfil.
- Actualización de la foto de perfil.
- Creación de nuevas tarjetas con nombre e imagen.
- Sistema de "me gusta" en las tarjetas.
- Eliminación de tarjetas propias, con ventana de confirmación previa.
- Validación en tiempo real de todos los formularios.
- Ventanas emergentes (popups) para cada interacción, cerrables con Esc, clic fuera o botón de cierre.

## Tecnologías y técnicas utilizadas

- **TypeScript** con programación orientada a objetos (clases ES6).
- **Fetch API** con sintaxis `async/await` para todas las solicitudes al servidor.
- **HTML5** semántico y **CSS3** con metodología BEM.
- Manejo de errores con bloques `try...catch` en todas las operaciones asíncronas.
- Carga en paralelo de datos con `Promise.all()`.
- Arquitectura basada en clases con responsabilidad única: `Api`, `Card`, `Section`, `Popup` (y sus subclases `PopupWithForm`, `PopupWithImage`, `PopupWithConfirmation`), `UserInfo` y `FormValidator`.
