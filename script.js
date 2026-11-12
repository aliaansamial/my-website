document.documentElement.classList.add('js');

// theme toggle
const root = document.documentElement;
try {
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
} catch (e) {}
document.getElementById('theme').addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// typing effect
const words = ['building things with code', 'how computers really work', 'Python and the web', 'discovering new things'];
const typed = document.getElementById('typed');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  typed.textContent = words[0];
} else {
  let w = 0, i = 0, deleting = false;
  const tick = () => {
    const word = words[w];
    typed.textContent = word.slice(0, i);
    if (!deleting && i === word.length) {
      deleting = true;
      return setTimeout(tick, 1400);
    }
    if (deleting && i === 0) {
      deleting = false;
      w = (w + 1) % words.length;
    }
    i += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 40 : 80);
  };
  tick();
}

// reveal sections on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// glow that follows the mouse on cards
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
