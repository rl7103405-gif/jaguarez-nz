# Guía para replicar este proyecto

**Cómo está construido el sitio de Jaguares NZ y cómo levantar uno igual desde cero en VS Code con Claude.**

Esta guía sirve para cualquier negocio: academia, taller, despacho o una empresa de poda de árboles. Lo único que cambia es el contenido y los colores; la estructura es la misma.

---

## 1. Qué se construyó

Dos cosas que viven en el mismo sitio:

| Pieza | Archivo | Para quién |
|---|---|---|
| **Página pública** | `index.html` | Clientes que llegan de Google, Instagram o WhatsApp |
| **Portal privado** | `portal.html` | El equipo interno (login con correo y contraseña) |
| **Contenido editable** | `contenido-sitio.js` | Lo comparten las dos: el portal edita, la página muestra |

Todo son **3 archivos y una carpeta de imágenes**. Nada más.

```
mi-proyecto/
├── index.html            ← la página pública (HTML + CSS + JS, todo junto)
├── portal.html           ← el área privada
├── contenido-sitio.js    ← el contenido que se puede editar
└── assets/
    ├── logo.png
    ├── hero.jpg
    └── galeria/          ← las fotos de la galería van aquí
```

---

## 2. La decisión más importante: sin frameworks

**No se usó React, ni Next, ni Tailwind, ni npm, ni ningún paquete.** HTML, CSS y JavaScript puros.

Suena a decisión de flojera, pero fue a propósito y es la razón de que el proyecto avanzara rápido:

- **Cero instalación.** No hay `npm install`, no hay `node_modules`, no hay build que falle.
- **Se abre con doble clic.** Para probar, abres el archivo en el navegador. Ya.
- **Se publica gratis** en GitHub Pages sin configurar nada.
- **No se rompe con el tiempo.** No hay dependencias que se desactualicen ni vulnerabilidades que parchar.
- **Claude lo edita mejor.** Un archivo autocontenido es más fácil de modificar con precisión que veinte archivos que se importan entre sí.

**Cuándo NO seguir este camino:** si vas a tener cientos de páginas, un catálogo con buscador, pagos en línea o cuentas de usuario de verdad. Para un sitio de presentación con un área interna, esto sobra.

El costo real: `index.html` terminó con 1,865 líneas porque el CSS y el JS van dentro. Se navega bien con buscar (`Ctrl+F`) y comentarios de sección grandes.

---

## 3. El sistema de diseño

Antes de escribir una sola sección, se definieron las variables. Todo el sitio las usa, así que cambiar la identidad completa es cambiar estas diez líneas:

```css
:root {
  --rojo: #E4002B;           /* color de marca */
  --rojo-oscuro: #A30016;
  --negro: #0A0A0B;          /* fondo principal */
  --carbon: #121214;         /* fondo alterno entre secciones */
  --grafito: #1B1B1E;        /* tarjetas */
  --blanco: #FFFFFF;
  --gris: #B9B9BF;           /* texto secundario */
  --fuente-display: 'Anton', Impact, sans-serif;      /* títulos */
  --fuente-cuerpo: 'Montserrat', Arial, sans-serif;   /* todo lo demás */
  --radio: 14px;
  --sombra-roja: 0 12px 40px -12px rgba(228, 0, 43, .45);
}
```

**La regla de las dos tipografías:** una con personalidad para títulos (Anton: condensada, deportiva, gritona) y una neutra y legible para el resto (Montserrat). Mezclar más de dos se ve amateur.

**Para PRODECO** cambiarías a verdes: un verde fuerte de marca, un verde muy oscuro de fondo, y para títulos algo sólido y confiable en vez de deportivo (por ejemplo Oswald o Barlow Condensed).

### Tres técnicas de CSS que cargaron con todo el peso

```css
/* 1. Tipografía que se adapta sola, sin media queries */
font-size: clamp(1.7rem, 4vw, 2.4rem);

/* 2. Rejillas que se reacomodan solas en celular */
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

/* 3. Ancho de contenido consistente en todo el sitio */
.contenedor { width: min(1180px, 92%); margin: 0 auto; }
```

Con esas tres, casi no hicieron falta `@media`. Solo quedaron 6 en todo el archivo.

---

## 4. Estructura de la página pública

El orden de las secciones no es casual: sigue el recorrido mental de alguien que acaba de llegar y no te conoce.

| # | Sección | Qué responde |
|---|---|---|
| 1 | **Nav fija** | ¿Dónde estoy y cómo contacto? |
| 2 | **Hero** | ¿Qué es esto? (frase de una línea + 2 botones + 3 datos duros) |
| 3 | **Cinta animada** | Prueba social rápida (logros desfilando) |
| 4 | **Nosotros** | ¿Quiénes son y por qué confiar? |
| 5 | **Misión, visión, valores** | Seriedad institucional |
| 6 | **Horarios / servicios** | ¿Qué ofrecen exactamente? |
| 7 | **Logros** | ¿Tienen resultados? |
| 8 | **Eventos** | ¿Qué viene pronto? |
| 9 | **Galería** | Ver para creer |
| 10 | **Contacto** | Formulario + mapa + redes |
| 11 | **Footer + botón flotante de WhatsApp** | Salida siempre disponible |

**El botón flotante de WhatsApp** es lo que más conversiones da en México. Fijo abajo a la derecha, en todas las secciones, con el mensaje ya escrito en la URL:

```html
<a href="https://wa.me/52XXXXXXXXXX?text=Hola%2C%20quiero%20informes"
   target="_blank" rel="noopener">Escríbenos</a>
```

**El formulario no usa servidor.** En vez de un backend, arma un mensaje de WhatsApp con lo que la persona escribió y abre el chat. Cero infraestructura, y el negocio recibe el contacto donde ya está acostumbrado a responder.

**Para PRODECO** el orden sería: Hero → Servicios (poda, tala, emergencias) → **Antes y después** (es tu galería y tu mejor argumento) → Por qué nosotros (seguro, equipo certificado, retiro de residuos) → Zonas donde trabajan → Cotización gratis → Contacto.

---

## 5. El CMS casero (la parte más interesante)

El objetivo era que la administradora del negocio pudiera cambiar textos y fotos **sin tocar código y sin pagarle a nadie**. Se resolvió en unas 300 líneas.

### Cómo funciona en tres pasos

**Paso 1 — Marcar en el HTML lo que es editable:**

```html
<p data-ed="nosotros.p1">Somos una academia de baloncesto...</p>
<img data-ed-img="hero.foto" src="assets/hero.jpg" alt="...">
<strong data-ed="patro.nombre">EDSON SPORT</strong>
```

**Paso 2 — Guardar los textos "de fábrica" en `contenido-sitio.js`:**

```js
const DEFECTO = {
  'nosotros.p1': 'Somos una academia de baloncesto para *niños de 6 a 17 años*...',
  'patro.nombre': 'EDSON SPORT',
  'hero.foto': 'assets/hero.jpg',
};
```

**Paso 3 — Al cargar la página, pintar lo que el admin haya cambiado:**

```js
function aplicar(doc) {
  doc.querySelectorAll('[data-ed]').forEach(el => {
    el.innerHTML = aHTML(valor(el.dataset.ed));   // guardado o de fábrica
  });
  doc.querySelectorAll('[data-ed-img]').forEach(el => {
    el.src = valor(el.dataset.edImg);
  });
}
```

Los cambios se guardan en `localStorage`. **Esa es la versión de prueba**; con Firebase se cambia solo esa capa de guardado y los cambios pasan a verse para todo el mundo (ver sección 8).

### Tres detalles que hicieron la diferencia

**Negritas estilo WhatsApp.** Los admins no saben HTML, pero todos saben poner `*asteriscos*` en WhatsApp. Se aprovechó eso:

```js
function aHTML(texto) {
  return escapar(texto)
    .replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}
```

**Campos que arrastran otros campos.** El admin escribe el número de WhatsApp una vez y se actualizan los cuatro botones del sitio. Escribe la dirección y el mapa de Google se mueve solo:

```js
const tel = String(valor('contacto.whatsapp')).replace(/\D/g, '');
doc.querySelectorAll('[data-ed-wa]').forEach(a => {
  a.href = a.href.replace(/wa\.me\/\d+/, 'wa.me/52' + tel);
});
doc.querySelectorAll('[data-ed-mapa]').forEach(f => {
  f.src = 'https://www.google.com/maps?q=' + encodeURIComponent(valor('contacto.direccion')) + '&output=embed';
});
```

Ese detalle es el que hace que el cliente sienta que el sitio es suyo.

**Botón de "Restaurar original" en cada sección.** Borra el cambio guardado y regresa al valor de fábrica. Suena menor, pero es lo que hace que el cliente se atreva a experimentar en vez de tenerle miedo a mover algo.

### Secciones que el cliente crea desde cero

Además de editar lo que ya existe, el admin puede **agregar bloques nuevos** a la página (en Jaguares: "Nuestros coaches" y "Jugadores becados").

Se guardan como una lista de objetos y se pintan en un contenedor vacío del HTML:

```js
// En index.html: <div id="secciones-nuevas"></div>
[{
  id: 's1',
  titulo: 'Nuestros *coaches*',
  kicker: 'Quién los entrena',
  intro: 'El equipo que está en la duela todos los días.',
  visible: true,
  enMenu: false,
  items: [{ nombre: 'Néstor Zamora', detalle: 'Bloque 2', texto: '...', foto: 'data:image/jpeg;...' }]
}]
```

**El truco de las plantillas:** en vez de dar una sección vacía, se ofrecen botones con el formato ya armado ("👥 Nuestro equipo", "🎓 Casos de éxito", "➕ En blanco"). El cliente da un clic y ya tiene algo con forma que solo debe rellenar. Eliminar la hoja en blanco es la mitad del trabajo de usabilidad.

**Para PRODECO** las plantillas naturales serían: "🌳 Nuestros servicios", "👷 El equipo", "📸 Antes y después", "🏆 Certificaciones".

---

## 6. El portal privado

`portal.html` es una sola página con pestañas. Funciona sin recargar nunca.

**Autenticación de prueba:** usuarios y contraseñas en `localStorage`. Sirve para que el cliente pruebe todo de inmediato, y se sustituye por Firebase Auth cuando el proyecto va en serio.

> ⚠️ Nunca dejes esto en producción con datos reales. Las contraseñas quedan visibles en el navegador. Es un maniquí para demostrar el flujo, no seguridad.

**Los permisos de administrador son una lista de correos:**

```js
const CORREOS_ADMIN = ['admin@empresa.mx', 'gerente@empresa.mx'];
const esAdmin = correo => CORREOS_ADMIN.includes((correo || '').toLowerCase());
```

Y en cada vista se muestran u ocultan los controles:

```js
$('#panel-admin').classList.toggle('oculto', !esAdmin(u.correo));
```

**Comprimir las imágenes antes de guardarlas** — indispensable. Una foto de celular pesa 4 MB y `localStorage` solo aguanta ~5 MB. Con canvas se reduce a ~150 KB sin que se note:

```js
function comprimirImagen(archivo, anchoMax = 1280) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => {
      const img = new Image();
      img.onload = () => {
        const escala = Math.min(1, anchoMax / img.width);
        const lienzo = document.createElement('canvas');
        lienzo.width = Math.round(img.width * escala);
        lienzo.height = Math.round(img.height * escala);
        lienzo.getContext('2d').drawImage(img, 0, 0, lienzo.width, lienzo.height);
        resolve(lienzo.toDataURL('image/jpeg', 0.72));
      };
      img.src = lector.result;
    };
    lector.readAsDataURL(archivo);
  });
}
```

**Mostrarle al usuario cuánto espacio lleva usado** evita que se estrelle contra el límite sin entender por qué:

```js
`Espacio usado: ${(localStorage.getItem(LLAVE).length / 1048576).toFixed(1)} MB de ~5 MB`
```

---

## 7. Cómo trabajar esto con Claude en VS Code

Lo que funcionó, en orden:

### Fase 0 — Junta el material antes de escribir código

Ten a la mano: **logo, 10–20 fotos buenas, los textos reales** (qué hacen, precios o rangos, zonas de servicio), teléfono, dirección, redes. Sin esto Claude inventa relleno y después hay que rehacer todo.

Mete las fotos en `assets/` desde el principio y nómbralas descriptivamente: `poda-altura-antes.jpg`, `equipo-en-campo.jpg`. Los nombres se usan luego como texto alternativo automático.

### Fase 1 — Pide la landing completa de un jalón

Un prompt largo y específico funciona mucho mejor que veinte cortos:

> Hazme una landing page de una sola página para PRODECO, empresa de poda y tala de árboles en [ciudad]. Un solo archivo `index.html` con el CSS y el JS adentro, sin frameworks ni dependencias.
>
> Paleta: verde #1B7A3E como color de marca, fondos oscuros. Tipografías de Google Fonts: [X] para títulos, [Y] para el cuerpo. Define todo en variables CSS en `:root`.
>
> Secciones en este orden: nav fija, hero con foto de fondo y dos botones, servicios en tarjetas, antes y después, por qué elegirnos, zonas de servicio, galería con lightbox, formulario de cotización que abre WhatsApp, footer y botón flotante de WhatsApp.
>
> Requisitos: responsive con `clamp()` y grid `auto-fit` en vez de media queries; animaciones de aparición con IntersectionObserver que degraden bien sin JS; `alt` en todas las imágenes y `aria-label` en los botones de ícono; meta tags de SEO y Open Graph. Comentarios en español separando cada sección.

### Fase 2 — Itera con capturas, no con descripciones

Abre el archivo en el navegador, toma una captura, pégasela a Claude y dile qué está mal. "El hero se ve apretado en celular" con imagen es diez veces más efectivo que sin ella.

### Fase 3 — Pide que pruebe su propio trabajo

Este fue el mayor ahorro de tiempo. Claude puede manejar un navegador real con Playwright:

> Antes de decirme que está listo, pruébalo con Playwright: abre la página en 1200px y en 390px, revisa que no haya errores de JavaScript en consola, que no haya scroll horizontal, y mándame capturas.

Así los errores salen antes de que tú los veas.

### Fase 4 — El portal y el CMS, después

No mezcles. Primero la landing terminada y publicada; luego el área privada. Si pides todo junto, la primera versión sale a medias en ambos lados.

### Fase 5 — Publicar en GitHub Pages

1. Sube el proyecto a un repo de GitHub
2. **Settings → Pages → Source: Deploy from a branch** → elige tu rama y `/root`
3. En 1–2 minutos queda en `https://tuusuario.github.io/turepo/`

Es gratis y con HTTPS incluido. Para un dominio propio (`prodeco.com.mx`) se apunta el DNS y se pone en la misma pantalla de Settings.

---

## 8. El paso a producción: Firebase

Mientras todo se guarda en `localStorage`, **los cambios los ve solo quien los hizo, en su dispositivo.** Eso está bien para demostrar y para que el cliente juegue, pero no es el producto final.

Para que sea real:

| Necesidad | Servicio | Costo |
|---|---|---|
| Cuentas de usuario reales | Firebase Authentication | Gratis |
| Contenido compartido | Cloud Firestore | Gratis hasta 1 GB |
| Fotos sin límite de 5 MB | Firebase Storage | Gratis hasta 5 GB |

El diseño ya está preparado para eso: **todo el guardado pasa por dos funciones**, `leer()` y `escribir()`. Solo se cambian esas dos por llamadas a Firestore y el resto del código no se entera.

```js
const FIREBASE_CONFIG = null;  // ← cuando esto tenga las llaves, deja de ser demo
```

Esa es la razón de haber concentrado el guardado en un solo lugar desde el principio: cuando llegue el momento, es una tarde de trabajo y no una reescritura.

---

## 9. Tropiezos que ya tienes resueltos

Cosas que costaron tiempo y que puedes saltarte:

**El caché del navegador te va a engañar.** Publicas un cambio, entras a ver y sigue igual. Recarga forzada: `Ctrl + Shift + R` (o `Cmd + Shift + R`). En celular, cierra la pestaña por completo. Antes de pensar que algo falló, haz esto.

**GitHub Pages a veces deja el despliegue encolado media hora** y luego lo cancela solo, mandando un correo de "some jobs were not successful". No es tu código. Se destraba haciendo un commit nuevo cualquiera.

**Un `<details>` que se re-dibuja se cierra solo.** Si tu editor tiene secciones plegables y las reconstruyes con `innerHTML`, guarda cuál estaba abierta y vuelve a abrirla, o el usuario pierde el hilo cada vez que agrega algo.

**Los menús se saturan.** Si dejas que las secciones nuevas se agreguen solas a la barra de navegación, con dos ya se encima con el logo. Hazlo opcional con una casilla, apagada por defecto.

**Escribe los comentarios en el idioma del cliente.** Si algún día alguien más toca el código —o el cliente lo abre por curiosidad— en español se entiende. Los nombres de variables también: `comprimirImagen()` y `esAdmin()` se leen mejor que una mezcla de inglés y español.

**Accesibilidad desde el inicio, no al final.** `alt` en cada imagen, `aria-label` en cada botón de ícono, `:focus-visible` visible. Agregarlo después significa revisar 1,800 líneas.

---

## 10. Checklist para arrancar PRODECO

- [ ] Juntar logo, fotos (sobre todo **antes y después**), textos reales y datos de contacto
- [ ] Elegir la paleta (verdes) y las dos tipografías
- [ ] Crear el repo en GitHub y activar Pages
- [ ] Fase 1: pedir `index.html` completo con el prompt largo de la sección 7
- [ ] Iterar con capturas hasta que se vea bien en celular y en computadora
- [ ] Pedir la prueba con Playwright
- [ ] Publicar y revisar en un teléfono real
- [ ] Fase 2: `portal.html` si el cliente lo necesita
- [ ] Fase 3: el CMS con `data-ed` si va a querer editar solo
- [ ] Cuando el cliente diga que sí: Firebase

---

## Resumen en cinco líneas

1. **Sin frameworks.** HTML, CSS y JS puros en pocos archivos autocontenidos.
2. **Variables CSS primero.** Cambiar la identidad completa debe ser cambiar diez líneas.
3. **`clamp()` y `grid auto-fit`** en lugar de media queries.
4. **El CMS son atributos `data-ed`** más un objeto con los valores de fábrica y una capa de guardado intercambiable.
5. **Por fases:** landing → publicar → portal → CMS → base de datos real. Nunca todo junto.
