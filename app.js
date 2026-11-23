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

// Marcar sección activa en el menú
const links = [...document.querySelectorAll('.nav nav a')];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));
