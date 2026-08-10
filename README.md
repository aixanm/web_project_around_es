# Around The U.S.

## Descripción del proyecto

Around The U.S. es una galería de fotografías interactiva desarrollada como
proyecto de los Sprints 6 y 7 del bootcamp de Desarrollo Web de TripleTen. El
sitio permite a los usuarios personalizar su perfil, gestionar una colección
de tarjetas de fotografías de distintos lugares del mundo, y valida los
formularios en tiempo real para mejorar la experiencia de usuario.

El proyecto se centró en la manipulación del DOM con JavaScript puro,
trabajando con eventos, plantillas HTML, renderizado dinámico de contenido,
validación de formularios y JavaScript modular.

## Funcionalidad

- Edición del nombre y la descripción del perfil mediante una ventana
  emergente, con los campos precargados con la información actual.
- Generación dinámica de tarjetas de fotografías a partir de una plantilla
  HTML (`<template>`) y un array de datos.
- Creación de nuevas tarjetas mediante una ventana emergente, indicando
  título y enlace a la imagen.
- Botón de "me gusta" en cada tarjeta, con cambio de apariencia al hacer clic.
- Eliminación de tarjetas de la galería.
- Vista ampliada de cada fotografía en una ventana emergente, con su título,
  respetando la relación de aspecto original de la imagen.
- Validación en tiempo real de los formularios "Editar perfil" y "Nuevo
  lugar", con mensajes de error personalizados y el botón de envío
  deshabilitado mientras algún campo no sea válido.
- Cierre de las ventanas emergentes al hacer clic fuera de sus bordes o al
  pulsar la tecla Esc.

## Tecnologías y técnicas utilizadas

- HTML5 semántico
- CSS3 (metodología BEM para la nomenclatura de clases)
- JavaScript (Vanilla JS), con módulos ES (`import`/`export`)
- Manipulación del DOM y delegación de eventos
- Plantillas HTML (`<template>`) para la generación dinámica de contenido
- Validación de formularios con la API nativa `ValidityState`
- Git y GitHub para control de versiones
- Despliegue mediante GitHub Pages

## Enlace al proyecto

Puedes ver el sitio en vivo aquí: <https://aixanm.github.io/web_project_around_es/>
