# 🏀 Academia Jaguares NZ — Landing Page

Sitio de una sola página para la **Academia Jaguares NZ** (San Andrés Cholula, Puebla).
*Semillero de Talentos.*

## Cómo verla

Abre `index.html` en cualquier navegador, o publícala con GitHub Pages
(Settings → Pages → rama principal → carpeta `/`).

## Cómo agregar las fotos

Sube tus fotos a la carpeta `assets/` y reemplaza los placeholders en `index.html`
(están marcados con comentarios `<!-- FOTO: ... -->`):

| Foto | Archivo sugerido | Dónde va |
|---|---|---|
| Fondo del hero (entrenamiento/partido) | `assets/hero.jpg` | Descomenta la línea `<img class="hero-foto">` en la sección hero |
| Foto de la academia / entrenamiento | `assets/academia.jpg` | Sección "La Academia": reemplaza el `<div class="ph">` dentro de `.marco-foto` |
| Galería de uniformes (6 fotos) | `assets/uniforme-1.jpg` … `uniforme-6.jpg` | Sección "Uniformes": reemplaza cada `<div class="ph ph-cuadrada">` por `<img src="assets/uniforme-1.jpg" alt="...">` |
| Logo oficial | `assets/logo-jaguar.svg` (o `.png`) | Reemplaza el archivo; se usa en nav, hero, footer y favicon |

Ejemplo para una foto de la galería:

```html
<button class="galeria-item" aria-label="Ampliar foto 1">
  <img src="assets/uniforme-1.jpg" alt="Uniforme local rojo Jaguares NZ">
</button>
```

El lightbox detecta automáticamente las `<img>` y las muestra en grande.

## Datos de contacto usados

- WhatsApp: **668 130 9256** (botón flotante + formulario)
- Instagram: [@academia_jaguares_nz](https://www.instagram.com/academia_jaguares_nz)
- Sede: Gimnasio Jaguares — 14 Pte. 706, Barrio Santiago Mixquitla, 72760, San Andrés Cholula, Puebla
