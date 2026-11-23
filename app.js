// ===== Datos de las fichas de proyecto =====
const G = 'assets/img/gal/';
const PROY = {
  exc: {
    cat: 'IoT · CLOUD · TIEMPO REAL', titulo: 'Excavadora IoT · Control remoto en tiempo real',
    desc: 'Sistema integral para operar y monitorear una excavadora física desde cualquier lugar. El celular envía comandos por WebSocket seguro a una API propia en AWS y un ESP32 los ejecuta en la máquina real.',
    puntos: ['API en Python/FastAPI con 21 servicios REST sobre procedimientos almacenados en Amazon RDS', 'Despliegue en AWS EC2 con HTTPS/WSS (Caddy + Let\'s Encrypt) y reinicio automático', 'Monitoreo en tiempo real de los últimos movimientos guardados en la nube', 'Gemelo digital 3D, control por voz con IA, gestos y realidad virtual (WebXR)', 'Aplicación instalable (PWA) con modo simulador'],
    tags: ['FastAPI', 'WebSocket', 'AWS EC2', 'Amazon RDS', 'ESP32', 'Three.js', 'WebXR', 'PWA'],
    fotos: [['exc-1', 'Control con joysticks'], ['exc-2', 'Monitoreo en tiempo real'], ['exc-3', 'Arena y simulador'], ['exc-4', 'Arquitectura: celular → AWS → ESP32'], ['exc-5', 'Realidad virtual y gemelo digital'], ['exc-6', 'Panel de telemetría con simulación 3D']],
    links: [['Demo en vivo ↗', 'https://juanel2804.github.io/control-iot/', 1], ['Código de la app', 'https://github.com/juanel2804/control-iot'], ['Código de la API', 'https://github.com/juanel2804/vehiculo-iot-api']]
  },
  ffp: {
    cat: 'FULL-STACK · COMERCIO ELECTRÓNICO', titulo: 'Fast Food Pachuca',
    desc: 'Plataforma de pedidos en línea para varios restaurantes, con experiencia de cliente, panel para cada negocio y administración central. Desarrollada en equipo y desplegada en AWS.',
    puntos: ['Carrito multitienda: un solo pago genera un pedido por negocio', 'Seguimiento del pedido en tiempo real con línea de tiempo', 'Cupones, propinas, carta en PDF y avisos por WhatsApp', 'Panel por negocio con ventas, productos, categorías y cupones', 'Servicios SOAP y REST sobre MySQL con procedimientos almacenados; tema claro y oscuro; PWA'],
    tags: ['PHP', 'SOAP', 'REST', 'MySQL', 'AWS EC2', 'Amazon RDS', 'PWA'],
    fotos: [['ffp-1', 'Inicio'], ['ffp-2', 'Carta del restaurante con filtros'], ['ffp-3', 'Carrito con cupones y propina'], ['ffp-4', 'Historial y estado de pedidos'], ['ffp-5', 'Panel de administración del negocio'], ['ffp-6', 'Inicio de sesión']],
    links: [['Demostración disponible bajo solicitud', '']]
  },
  kai: {
    cat: 'IA · AGENTES · AUTOMATIZACIÓN', titulo: 'Kai · Asistente inteligente personal',
    desc: 'Agente de inteligencia artificial que utilizo a diario para organizar trabajo, información y dispositivos, con conversaciones separadas por tema.',
    puntos: ['Servidor Node.js + Express + WebSocket con el Claude Agent SDK', 'Herramientas MCP de desarrollo propio: tareas, recordatorios, búsqueda y páginas', 'Recordatorios que llegan al celular (ntfy) aunque el equipo esté suspendido', 'Notas sincronizadas con Obsidian, voz con Gemini y control de Android por ADB', 'Acceso remoto seguro mediante Tailscale'],
    tags: ['Node.js', 'Express', 'WebSocket', 'Claude Agent SDK', 'MCP', 'Gemini', 'Tailscale'],
    fotos: [], links: [['Código privado · demostración bajo solicitud', '']]
  },
  isp: {
    cat: 'NEGOCIO REAL · BACKEND', titulo: 'Sistema de gestión para proveedor de internet',
    desc: 'Sistema web para administrar un proveedor de internet local: clientes, pagos y equipos de red, con seguridad y trazabilidad.',
    puntos: ['Clientes con IP y MAC únicas, plan y equipo asignado', 'Registro de pagos mensuales e historial', 'Tres roles: administrador, operador y cobrador', 'Contraseñas cifradas con scrypt, bloqueo tras 5 intentos fallidos y sesiones de 12 h', 'Bitácora de auditoría y migración desde Excel (34 clientes, 156 pagos)'],
    tags: ['Node.js', 'PostgreSQL', 'scrypt', 'Control de roles', 'Auditoría'],
    fotos: [], links: [['Código privado · contiene datos reales', '']]
  },
  gym: {
    cat: 'FULL-STACK · GESTIÓN', titulo: 'Sistema de administración de gimnasio',
    desc: 'Plataforma para la operación diaria de un gimnasio: miembros, pagos y control de acceso. Desarrollada en equipo.',
    puntos: ['Alta, edición y consulta de miembros; consulta por folio', 'Registro de pagos y panel de indicadores', 'Control de accesos con validación NFC', 'API Node.js/Express con autenticación JWT', 'Base de datos PostgreSQL en la nube y carga de avatares'],
    tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'NFC'],
    fotos: [], links: [['Ver código ↗', 'https://github.com/juanel2804/SISTGYM', 1]]
  }
};

// ===== Modal =====
const dlg = document.getElementById('ficha');
const $ = id => document.getElementById(id);
let actual = null, idx = 0;
function pintarFoto() {
  const f = actual.fotos[idx];
  $('f-img').src = G + f[0] + '.jpg'; $('f-img').alt = f[1]; $('f-cap').textContent = `${idx + 1}/${actual.fotos.length} · ${f[1]}`;
  [...$('f-thumbs').children].forEach((t, i) => t.classList.toggle('on', i === idx));
}
function abrir(k, foto = 0) {
  actual = PROY[k]; idx = foto;
  $('f-cat').textContent = actual.cat; $('f-titulo').textContent = actual.titulo; $('f-desc').textContent = actual.desc;
  $('f-puntos').innerHTML = actual.puntos.map(p => `<li>${p}</li>`).join('');
  $('f-tags').innerHTML = actual.tags.map(t => `<li>${t}</li>`).join('');
  $('f-links').innerHTML = actual.links.map(([t, u, p]) => u ? `<a class="${p ? 'btn' : 'btn-ghost'} small" href="${u}" target="_blank" rel="noopener">${t}</a>` : `<span class="note mono">${t}</span>`).join('');
  dlg.classList.toggle('sin-fotos', !actual.fotos.length);
  $('f-thumbs').innerHTML = actual.fotos.map(f => `<button aria-label="${f[1]}"><img src="${G + f[0]}.jpg" alt=""></button>`).join('');
  [...$('f-thumbs').children].forEach((b, i) => b.onclick = () => { idx = i; pintarFoto(); });
  if (actual.fotos.length) pintarFoto();
  dlg.showModal(); document.body.style.overflow = 'hidden';
}
const mover = d => { if (!actual?.fotos.length) return; idx = (idx + d + actual.fotos.length) % actual.fotos.length; pintarFoto(); };
document.querySelector('.f-prev').onclick = () => mover(-1);
document.querySelector('.f-next').onclick = () => mover(1);
document.querySelector('.f-cerrar').onclick = () => dlg.close();
dlg.addEventListener('close', () => document.body.style.overflow = '');
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
addEventListener('keydown', e => { if (!dlg.open) return; if (e.key === 'ArrowRight') mover(1); if (e.key === 'ArrowLeft') mover(-1); });
document.addEventListener('click', e => {
  if (e.target.closest('a') || e.target.closest('dialog')) return;
  const el = e.target.closest('[data-abrir]');
  if (el) abrir(el.dataset.abrir, +(el.dataset.foto || 0));
});
document.querySelectorAll('.proj').forEach(p => p.addEventListener('keydown', e => { if (e.key === 'Enter') abrir(p.dataset.abrir); }));

// ===== Filtros =====
document.querySelectorAll('.filtros button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.filtros button').forEach(x => x.classList.toggle('on', x === b));
  const f = b.dataset.f;
  document.querySelectorAll('.proj').forEach(p => p.classList.toggle('oculto', !(f === 'todos' || p.dataset.cat.split(' ').includes(f))));
});

// ===== Red de nodos interactiva (fondo del hero) =====
(() => {
  const cv = document.getElementById('red'), ctx = cv.getContext('2d');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const R = devicePixelRatio || 1;
  let W, H, pts = [], mouse = { x: -9999, y: -9999 };
  const init = () => {
    W = cv.width = innerWidth * R; H = cv.height = innerHeight * R;
    const n = Math.min(90, Math.floor(innerWidth * innerHeight / 16000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35 * R, vy: (Math.random() - .5) * .35 * R }));
  };
  addEventListener('resize', init); init();
  addEventListener('pointermove', e => { mouse.x = e.clientX * R; mouse.y = e.clientY * R; });
  const D = 140 * R;
  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    const fade = Math.max(0, 1 - scrollY / (innerHeight * .9));
    if (fade > 0) {
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < D * 1.3 && dm > 0) { p.x += (p.x - mouse.x) / dm * .6; p.y += (p.y - mouse.y) / dm * .6; }
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < D) { ctx.strokeStyle = `rgba(59,130,246,${(1 - d / D) * .35 * fade})`; ctx.lineWidth = R; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        const p = pts[i], cerca = Math.hypot(p.x - mouse.x, p.y - mouse.y) < D * 1.5;
        ctx.fillStyle = cerca ? `rgba(56,189,248,${.95 * fade})` : `rgba(96,165,250,${.55 * fade})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, (cerca ? 2.4 : 1.6) * R, 0, 7); ctx.fill();
      }
    }
    requestAnimationFrame(loop);
  };
  loop();
})();

// ===== Rol que se escribe solo =====
(() => {
  const el = document.getElementById('typed');
  const roles = ['Desarrollo Full-Stack', 'Soluciones IoT en tiempo real', 'Arquitectura en la nube (AWS)', 'Inteligencia artificial aplicada'];
  let r = 0, c = roles[0].length, borrando = true;
  const paso = () => {
    if (borrando) { c--; if (c <= 0) { borrando = false; r = (r + 1) % roles.length; } }
    else { c++; if (c >= roles[r].length) { borrando = true; return setTimeout(paso, 2000); } }
    el.textContent = roles[r].slice(0, c);
    setTimeout(paso, borrando ? 30 : 65);
  };
  setTimeout(paso, 2400);
})();

// ===== Aparición, contadores, menú activo, progreso =====
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const cnt = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const n = +e.target.dataset.n; let i = 0;
  const t = setInterval(() => { e.target.textContent = ++i; if (i >= n) clearInterval(t); }, 900 / n);
  cnt.unobserve(e.target);
}));
document.querySelectorAll('[data-n]').forEach(b => cnt.observe(b));

const links = [...document.querySelectorAll('.nav nav a')];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

const prog = document.getElementById('progreso'), nav = document.querySelector('.nav');
addEventListener('scroll', () => {
  prog.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`;
  nav.classList.toggle('scrolled', scrollY > 20);
}, { passive: true });

// Luz que sigue al mouse e inclinación del abanico
document.querySelectorAll('.spot, .proj').forEach(el => el.addEventListener('pointermove', ev => {
  const b = el.getBoundingClientRect();
  el.style.setProperty('--x', ev.clientX - b.left + 'px'); el.style.setProperty('--y', ev.clientY - b.top + 'px');
}));
const deck = document.querySelector('.hero-deck');
deck?.addEventListener('pointermove', e => {
  const b = deck.getBoundingClientRect();
  deck.style.setProperty('--rx', ((e.clientY - b.top) / b.height - .5) * -8 + 'deg');
  deck.style.setProperty('--ry', ((e.clientX - b.left) / b.width - .5) * 10 + 'deg');
});
deck?.addEventListener('pointerleave', () => { deck.style.setProperty('--rx', '0deg'); deck.style.setProperty('--ry', '0deg'); });

// Reloj de Pachuca
const clock = document.getElementById('clock');
const hora = () => clock.textContent = new Date().toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City', hour: '2-digit', minute: '2-digit' });
hora(); setInterval(hora, 20000);

// Copiar correo
document.getElementById('copiar').onclick = async e => {
  const b = e.currentTarget, s = b.querySelector('.copy');
  try { await navigator.clipboard.writeText(b.dataset.mail); s.textContent = '¡copiado!'; } catch { location.href = 'mailto:' + b.dataset.mail; }
  setTimeout(() => s.textContent = 'copiar', 1800);
};
