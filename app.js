
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const toast = (message) => {
  let el = $('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => el.classList.remove('show'), 2600);
};

$$('.reveal').forEach(el => {
  const observer = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){ el.classList.add('visible'); observer.disconnect(); }
  }, {threshold:.12});
  observer.observe(el);
});

$$('[data-demo]').forEach(btn => btn.addEventListener('click', () => {
  toast(btn.dataset.demo || 'Demo interaction activated');
}));

const form = $('.waitlist');
if(form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = $('input', form);
    if(!input.value || !input.value.includes('@')){
      toast('Enter a valid email address');
      return;
    }
    toast('You’re on the early-access list.');
    input.value = '';
  });
}
