// Menu elements / Menü elemek
const burger = document.getElementById('burgerBtn');
const offcanvas = document.getElementById('offcanvas');
const overlay = document.getElementById('menuOverlay');

// Ticket prices per type / Jegyárak típusonként
const prices = {
  adults: 8,
  seniors: 6,
  students: 5
};

// Initial counts read from the DOM / Kezdő darabszámok a DOM-ból
const counts = {
  adults: parseInt(document.getElementById('adults')?.textContent, 10) || 0,
  seniors: parseInt(document.getElementById('seniors')?.textContent, 10) || 0,
  students: parseInt(document.getElementById('students')?.textContent, 10) || 0
};

// Open / close the offcanvas menu / Kicsúszó menü nyitása-zárása
function openMenu() {
  offcanvas.classList.add('is-open');
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  offcanvas.classList.remove('is-open');
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

burger?.addEventListener('click', openMenu);
overlay?.addEventListener('click', closeMenu);

// Quantity steppers / Mennyiség léptetők
const counterBtns = document.querySelectorAll('.tickets__row-btn');

counterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    const target = btn.dataset.target;
    const countEl = document.getElementById(target);

    if (!countEl) return;

    if (action === 'increase') {
      counts[target]++;
    } else if (action === 'decrease' && counts[target] > 0) {
      counts[target]--;
    }

    countEl.textContent = counts[target];
    updateTotal();
  });
});

// Recalculate the total price / Végösszeg újraszámolása
function updateTotal() {
  const total = Object.keys(counts).reduce((sum, key) => {
    return sum + counts[key] * prices[key];
  }, 0);

  const totalEl = document.getElementById('total');
  if (totalEl) totalEl.textContent = '$' + total;
}

// Tab switching / Fülek váltása
const tabs = document.querySelectorAll('.tickets__tabs-item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');
  });
});
