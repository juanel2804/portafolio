// Intro tipo terminal (solo la primera vez por sesión)
(() => {
  const boot = document.getElementById('boot');
  const out = document.getElementById('boot-text');
  const lines = ['> iniciando portafolio...', '> cargando proyectos [IoT, AWS, IA]', '> conectando con Pachuca, MX', '> sistema listo. ok'];
  const close = () => { boot.classList.add('off'); sessionStorage.setItem('boot', '1'); };
  document.getElementById('boot-skip').onclick = close;
  if (sessionStorage.getItem('boot') || matchMedia('(prefers-reduced-motion: reduce)').matches) { boot.remove(); return; }
  let i = 0, j = 0;
  const tick = () => {
    if (i >= lines.length) return setTimeout(close, 450);
    if (j <= lines[i].length) { out.textContent = lines.slice(0, i).join('\n') + (i ? '\n' : '') + lines[i].slice(0, j++); setTimeout(tick, 18); }
    else { i++; j = 0; setTimeout(tick, 160); }
  };
  tick();
})();

// Reloj de Pachuca
const clock = document.getElementById('clock');
const hora = () => clock.textContent = new Date().toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City', hour: '2-digit', minute: '2-digit' });
hora(); setInterval(hora, 20000);

// Aparecer al hacer scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Rol que se escribe solo
(() => {
  const el = document.getElementById('typed');
  const roles = ['Desarrollador Full-Stack', 'Soluciones IoT en tiempo real', 'Nube en AWS', 'IA aplicada y agentes'];
  let r = 0, c = roles[0].length, borrando = true;
  const paso = () => {
    const t = roles[r];
    if (borrando) { c--; if (c <= 0) { borrando = false; r = (r + 1) % roles.length; } }
    else { c++; if (c >= roles[r].length) { borrando = true; return setTimeout(paso, 1800); } }
    el.textContent = roles[r].slice(0, c) || t.slice(0, 0);
    setTimeout(paso, borrando ? 35 : 70);
  };
  setTimeout(paso, 2200);
})();

// Contadores
const cnt = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const n = +e.target.dataset.n; let i = 0;
  const t = setInterval(() => { e.target.textContent = ++i; if (i >= n) clearInterval(t); }, 900 / n);
  cnt.unobserve(e.target);
}));
document.querySelectorAll('[data-n]').forEach(b => cnt.observe(b));

// Luz que sigue al mouse en tarjetas
document.querySelectorAll('.spot, .proj').forEach(el => el.classList.add('spot') || el.addEventListener('pointermove', ev => {
  const b = el.getBoundingClientRect();
  el.style.setProperty('--x', ev.clientX - b.left + 'px'); el.style.setProperty('--y', ev.clientY - b.top + 'px');
}));

// Marcar sección activa en el menú
const links = [...document.querySelectorAll('.nav nav a')];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));
