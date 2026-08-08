/* ==========================================================================
   CONTENIDO EDITABLE DEL SITIO — Academia Jaguares NZ

   Este archivo lo usan las dos páginas:
     · index.html  → lee el contenido y lo pinta en la página pública
     · portal.html → arma con él el editor que usan los administradores

   Los textos de aquí son los "de fábrica". Cuando un administrador edita algo
   desde el portal, el cambio se guarda aparte y gana sobre el valor de fábrica.
   El botón "Restaurar" de cada sección borra el cambio y regresa a estos.

   FORMATO DE LOS TEXTOS: se escriben normal, y para resaltar se usa la misma
   notación de WhatsApp — *negritas* y _cursivas_.
   ========================================================================== */
(function (global) {
  'use strict';

  const LLAVE_CONTENIDO = 'jaguares_contenido_v1';
  const LLAVE_PORTAL = 'jaguares_portal_demo_v1'; // de ahí salen las fotos subidas

  /* ---------------- Textos e imágenes de fábrica ---------------- */
  const DEFECTO = {
    // Portada
    'hero.eyebrow': 'Inscripciones abiertas · Open House 2026',
    'hero.eslogan': '*Semillero* de Talentos',
    'hero.dato1num': '_2_x',
    'hero.dato1txt': 'Campeonas 2026',
    'hero.dato2num': '6–17',
    'hero.dato2txt': 'Años de edad',
    'hero.dato3num': 'L–S',
    'hero.dato3txt': 'Entrenamientos',
    'hero.foto': 'assets/hero.jpg',

    // Sobre la academia
    'nosotros.p1': 'Somos una academia de baloncesto para *niños y jóvenes de 6 a 17 años* en San Pedro Cholula, Puebla. Entrenamos de *lunes a sábado* en instalaciones *cerradas y techadas*, con *grupos limitados* para garantizar atención personalizada y desarrollo real de cada jugador.',
    'nosotros.frase': '“Somos semillero de talentos. _Sé parte de la familia Jaguares._”',
    'nosotros.p2': 'Somos un *semillero de atletas* en la entidad: desarrollamos las cualidades físicas, cognitivas y afectivas de cada jugador, orientándolo a un alto nivel de competición y propiciando oportunidades para acceder a *becas deportivas* en las principales instituciones educativas nacionales e internacionales.',
    'nosotros.foto': 'assets/entrenador.jpg',

    // Patrocinador
    'patro.etiqueta': 'Patrocinador oficial',
    'patro.nombre': 'EDSON SPORT',
    'patro.logo': 'assets/edson-sport.jpg',

    // Misión y visión
    'mision.texto': 'Promover, fortalecer y coordinar con excelencia en nuestra región la práctica y la enseñanza del baloncesto, manteniendo un alto nivel de competencia entre los atletas de la sociedad poblana, para contribuir al desarrollo integral de nuestros niños y jóvenes.',
    'vision.texto': 'Ser una academia reconocida a nivel nacional e internacional por su liderazgo y excelencia en el desarrollo integral deportivo, logrando que nuestros atletas desarrollen sus cualidades físicas, cognitivas y afectivas orientadas a un alto nivel de competición.',

    // Valores
    'valor1.titulo': 'Trabajo en equipo y cooperación',
    'valor1.texto': 'Fomentamos el trabajo en equipo y el apoyo entre jugadores.',
    'valor2.titulo': 'Respeto y honestidad',
    'valor2.texto': 'Convivencia a partir de la confianza, integridad y transparencia hacia los demás.',
    'valor3.titulo': 'Disciplina y compromiso',
    'valor3.texto': 'Destacamos la importancia de la práctica constante y la superación personal.',
    'valor4.titulo': 'Perseverancia',
    'valor4.texto': 'Priorizamos la persistencia en el trabajo para el logro de objetivos como jugadores y estudiantes.',

    // Contacto y ubicación
    'contacto.whatsapp': '668 130 9256',
    'contacto.instagram': '@academia_jaguares_nz',
    'contacto.facebook': 'Academia Jaguares NZ',
    'contacto.direccion': '14 Pte. 706, Barrio Santiago Mixquitla, 72760 San Pedro Cholula, Puebla',

    // Pie de página
    'footer.copy': '© 2026 Academia Jaguares NZ · San Pedro Cholula, Puebla · Patrocinador oficial: EDSON SPORT',
  };

  /* ---------------- Cómo se ve el editor del portal ----------------
     tipo: 'texto' (una línea) · 'parrafo' (varias líneas) · 'foto' */
  const SECCIONES = [
    {
      id: 'portada', titulo: '🏀 Portada', nota: 'Lo primero que ve quien entra a la página.',
      campos: [
        { clave: 'hero.eyebrow', etiqueta: 'Aviso de arriba', tipo: 'texto' },
        { clave: 'hero.eslogan', etiqueta: 'Eslogan', tipo: 'texto' },
        { clave: 'hero.foto', etiqueta: 'Foto de fondo', tipo: 'foto' },
        { clave: 'hero.dato1num', etiqueta: 'Dato 1 — número', tipo: 'texto' },
        { clave: 'hero.dato1txt', etiqueta: 'Dato 1 — descripción', tipo: 'texto' },
        { clave: 'hero.dato2num', etiqueta: 'Dato 2 — número', tipo: 'texto' },
        { clave: 'hero.dato2txt', etiqueta: 'Dato 2 — descripción', tipo: 'texto' },
        { clave: 'hero.dato3num', etiqueta: 'Dato 3 — número', tipo: 'texto' },
        { clave: 'hero.dato3txt', etiqueta: 'Dato 3 — descripción', tipo: 'texto' },
      ],
    },
    {
      id: 'academia', titulo: '🐆 Sobre la academia', nota: 'La sección "Formamos jugadores, forjamos campeones".',
      campos: [
        { clave: 'nosotros.p1', etiqueta: 'Primer párrafo', tipo: 'parrafo' },
        { clave: 'nosotros.frase', etiqueta: 'Frase destacada', tipo: 'parrafo' },
        { clave: 'nosotros.p2', etiqueta: 'Segundo párrafo', tipo: 'parrafo' },
        { clave: 'nosotros.foto', etiqueta: 'Foto del entrenador', tipo: 'foto' },
      ],
    },
    {
      id: 'patrocinador', titulo: '🤝 Patrocinador', nota: 'Si cambian de patrocinador, se edita aquí.',
      campos: [
        { clave: 'patro.etiqueta', etiqueta: 'Texto chico (ej. "Patrocinador oficial")', tipo: 'texto' },
        { clave: 'patro.nombre', etiqueta: 'Nombre del patrocinador', tipo: 'texto' },
        { clave: 'patro.logo', etiqueta: 'Logo del patrocinador', tipo: 'foto' },
      ],
    },
    {
      id: 'mvv', titulo: '🎯 Misión, visión y valores',
      campos: [
        { clave: 'mision.texto', etiqueta: 'Misión', tipo: 'parrafo' },
        { clave: 'vision.texto', etiqueta: 'Visión', tipo: 'parrafo' },
        { clave: 'valor1.titulo', etiqueta: 'Valor 1 — título', tipo: 'texto' },
        { clave: 'valor1.texto', etiqueta: 'Valor 1 — descripción', tipo: 'parrafo' },
        { clave: 'valor2.titulo', etiqueta: 'Valor 2 — título', tipo: 'texto' },
        { clave: 'valor2.texto', etiqueta: 'Valor 2 — descripción', tipo: 'parrafo' },
        { clave: 'valor3.titulo', etiqueta: 'Valor 3 — título', tipo: 'texto' },
        { clave: 'valor3.texto', etiqueta: 'Valor 3 — descripción', tipo: 'parrafo' },
        { clave: 'valor4.titulo', etiqueta: 'Valor 4 — título', tipo: 'texto' },
        { clave: 'valor4.texto', etiqueta: 'Valor 4 — descripción', tipo: 'parrafo' },
      ],
    },
    {
      id: 'contacto', titulo: '📍 Contacto y ubicación', nota: 'Si cambian de gimnasio o de número, se edita aquí. El mapa se mueve solo con la dirección.',
      campos: [
        { clave: 'contacto.direccion', etiqueta: 'Dirección del gimnasio', tipo: 'parrafo' },
        { clave: 'contacto.whatsapp', etiqueta: 'WhatsApp', tipo: 'texto' },
        { clave: 'contacto.instagram', etiqueta: 'Instagram', tipo: 'texto' },
        { clave: 'contacto.facebook', etiqueta: 'Facebook', tipo: 'texto' },
      ],
    },
    {
      id: 'pie', titulo: '📄 Pie de página',
      campos: [
        { clave: 'footer.copy', etiqueta: 'Texto del final', tipo: 'parrafo' },
      ],
    },
  ];

  /* ---------------- Guardado ---------------- */
  function leer() {
    try { return JSON.parse(localStorage.getItem(LLAVE_CONTENIDO)) || {}; } catch { return {}; }
  }
  function escribir(cambios) {
    try {
      localStorage.setItem(LLAVE_CONTENIDO, JSON.stringify(cambios));
    } catch (e) {
      throw new Error('Ya no cabe más en el modo de prueba. Quita alguna foto pesada, o conectemos la base de datos real.');
    }
  }
  function valor(clave) {
    const cambios = leer();
    return clave in cambios ? cambios[clave] : DEFECTO[clave];
  }

  /* --- Fotos de la galería que un administrador escondió --- */
  function ocultas() {
    const l = leer()['galeria.ocultas'];
    return Array.isArray(l) ? l : [];
  }
  /* --- Fotos que los administradores subieron desde el portal --- */
  function fotosSubidas() {
    try {
      const bd = JSON.parse(localStorage.getItem(LLAVE_PORTAL));
      return (bd && Array.isArray(bd.fotos)) ? bd.fotos : [];
    } catch { return []; }
  }

  /* ---------------- Secciones que crean los administradores ----------------
     Cada sección es un bloque nuevo de la página (por ejemplo "Nuestros
     coaches" o "Jugadores becados") con una lista de tarjetas: foto, nombre,
     un dato corto y una descripción. */
  const LLAVE_SECCIONES = 'secciones.nuevas';

  const PLANTILLAS = [
    {
      nombre: '👥 Nuestros coaches',
      kicker: 'Quién los entrena',
      titulo: 'Nuestros *coaches*',
      intro: 'El equipo que está en la duela con sus hijos todos los días.',
      etiquetaItem: 'coach',
      items: [{ nombre: 'Nombre del coach', detalle: 'Bloque 2 · Mar, Jue y Sáb', texto: 'Escribe aquí su experiencia y logros.', foto: '' }],
    },
    {
      nombre: '🎓 Jugadores becados',
      kicker: 'Orgullo Jaguar',
      titulo: 'Jugadores *becados*',
      intro: 'Nuestros egresados que consiguieron una beca deportiva.',
      etiquetaItem: 'jugador',
      items: [{ nombre: 'Nombre del jugador', detalle: 'Beca en la universidad', texto: 'Cuenta aquí su historia en la academia.', foto: '' }],
    },
    {
      nombre: '➕ Sección en blanco',
      kicker: '',
      titulo: 'Título de la sección',
      intro: '',
      etiquetaItem: 'tarjeta',
      items: [{ nombre: 'Título', detalle: '', texto: 'Descripción.', foto: '' }],
    },
  ];

  function secciones() {
    const l = leer()[LLAVE_SECCIONES];
    return Array.isArray(l) ? l : [];
  }
  function guardarSecciones(lista) {
    const cambios = leer();
    cambios[LLAVE_SECCIONES] = lista;
    escribir(cambios);
  }

  /* Dibuja en la página pública las secciones creadas desde el portal */
  function pintarSecciones(doc) {
    doc = doc || document;
    const zona = doc.getElementById('secciones-nuevas');
    if (!zona) return;
    const lista = secciones().filter(s => s.visible !== false);
    zona.innerHTML = lista.map((s, i) => `
      <section class="seccion-nueva ${i % 2 ? 'alterna' : ''}" id="sec-${escapar(s.id)}">
        <div class="contenedor">
          <div class="revelar" style="text-align:center;">
            ${s.kicker ? `<span class="kicker" style="justify-content:center;">${escapar(s.kicker)}</span>` : ''}
            <h2 class="titulo-seccion">${aHTML(s.titulo)}</h2>
            ${s.intro ? `<p class="sub-seccion">${aHTML(s.intro)}</p>` : ''}
          </div>
          <div class="grid-personas">
            ${(s.items || []).map((it, n) => `
              <article class="tarjeta-persona revelar" data-delay="${(n % 3) + 1}">
                ${it.foto
                  ? `<img class="retrato" src="${it.foto}" alt="${escapar(it.nombre)}" loading="lazy">`
                  : `<div class="retrato sin-foto" aria-hidden="true">🐆</div>`}
                <h3>${escapar(it.nombre)}</h3>
                ${it.detalle ? `<span class="dato-persona">${escapar(it.detalle)}</span>` : ''}
                ${it.texto ? `<p>${aHTML(it.texto)}</p>` : ''}
              </article>`).join('')}
          </div>
        </div>
      </section>`).join('');

    // Solo las secciones marcadas para ello aparecen en el menú de arriba,
    // porque agregar demasiadas lo dejaría sin espacio.
    const menu = doc.getElementById('menu');
    if (menu) {
      menu.querySelectorAll('[data-menu-nuevo]').forEach(el => el.remove());
      const antesDe = menu.querySelector('.nav-cta')?.parentElement;
      lista.filter(s => s.enMenu).forEach(s => {
        const li = doc.createElement('li');
        li.setAttribute('data-menu-nuevo', '');
        li.innerHTML = `<a href="#sec-${escapar(s.id)}">${escapar(String(s.titulo).replace(/[*_]/g, ''))}</a>`;
        if (antesDe) menu.insertBefore(li, antesDe); else menu.appendChild(li);
      });
    }
  }

  /* ---------------- Texto con *negritas* y _cursivas_ ---------------- */
  function escapar(t) {
    return String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function aHTML(texto) {
    return escapar(texto)
      .replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
      .replace(/_([^_]+)_/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  /* ---------------- Pintar el contenido en la página ---------------- */
  function aplicar(doc) {
    doc = doc || document;

    doc.querySelectorAll('[data-ed]').forEach(el => {
      const v = valor(el.dataset.ed);
      if (v != null) el.innerHTML = aHTML(v);
    });

    doc.querySelectorAll('[data-ed-img]').forEach(el => {
      const v = valor(el.dataset.edImg);
      if (v) el.src = v;
    });

    // El número de WhatsApp alimenta todos los botones que escriben a la academia
    const tel = String(valor('contacto.whatsapp') || '').replace(/\D/g, '');
    if (tel) {
      const completo = tel.length === 10 ? '52' + tel : tel;
      doc.querySelectorAll('[data-ed-wa]').forEach(a => {
        a.href = a.href.replace(/wa\.me\/\d+/, 'wa.me/' + completo);
      });
    }

    // La dirección mueve el mapa
    const dir = valor('contacto.direccion');
    doc.querySelectorAll('[data-ed-mapa]').forEach(f => {
      f.src = 'https://www.google.com/maps?q=' + encodeURIComponent(dir) + '&output=embed';
      f.title = 'Mapa — ' + dir;
    });

    // Las redes actualizan también su enlace
    const ig = String(valor('contacto.instagram') || '').replace(/^@/, '').trim();
    if (ig) doc.querySelectorAll('[data-ed-ig]').forEach(a => { a.href = 'https://www.instagram.com/' + ig; });
    const fb = String(valor('contacto.facebook') || '').trim();
    if (fb) doc.querySelectorAll('[data-ed-fb]').forEach(a => { a.href = 'https://www.facebook.com/search/top?q=' + encodeURIComponent(fb); });
  }

  global.ContenidoSitio = {
    DEFECTO, SECCIONES, PLANTILLAS,
    leer, escribir, valor, aplicar, aHTML, escapar,
    ocultas, fotosSubidas,
    secciones, guardarSecciones, pintarSecciones,
    LLAVE_CONTENIDO,
  };
})(window);
