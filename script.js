document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- Theme toggle with ripple ---------------- */
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const ripple = document.getElementById('themeRipple');
let currentTheme = 'light';
applyTheme(currentTheme, false);

function applyTheme(theme, animate){
  if(animate){
    const rect = themeBtn.getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top + rect.height/2;
    const size = Math.hypot(window.innerWidth, window.innerHeight) * 2.1;
    ripple.style.setProperty('--ripple-x', x + 'px');
    ripple.style.setProperty('--ripple-y', y + 'px');
    ripple.style.setProperty('--ripple-size', size + 'px');
    ripple.style.setProperty('--ripple-color', theme === 'dark' ? '#161310' : '#F4EFE1');
    ripple.classList.remove('animate');
    void ripple.offsetWidth;
    ripple.classList.add('animate');
    setTimeout(()=>{
      root.classList.toggle('dark', theme === 'dark');
    }, 260);
    setTimeout(()=> ripple.classList.remove('animate'), 650);
  } else {
    root.classList.toggle('dark', theme === 'dark');
  }
}

themeBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme, true);
});

/* ---------------- Mobile nav ---------------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ---------------- Header scroll state + active link ---------------- */
const header = document.getElementById('siteHeader');
const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}, { passive:true });

/* ---------------- Reveal on scroll ---------------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------------- Skill box reveal ---------------- */
const skillIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){
      const boxes = e.target.querySelectorAll('.skill-box');
      boxes.forEach((box, i) => setTimeout(() => box.classList.add('in'), i * 90));
      skillIo.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-boxes').forEach(el => skillIo.observe(el));

/* ---------------- Email box -> Gmail compose ---------------- */
const emailBox = document.getElementById('emailBox');
const toast = document.getElementById('toast');
emailBox.addEventListener('click', () => {
  const to = 'himanshu.13122003@gmail.com';
  const subject = encodeURIComponent('Hello from your portfolio');
  const body = encodeURIComponent('Hi Himanshu,\n\n');
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
  window.open(gmailUrl, '_blank', 'noopener');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
});