'use strict';
// A local, read-only walkthrough. No requests, forms or persistent storage.
(() => {
  const dialog = document.getElementById('plan-dialog');
  const plans = {
    'year-end': { name: 'Year-end', monthly: 99, firstYear: 1688, fit: 'Clean, non-GST NZ sole-trader books.' },
    business: { name: 'Business', monthly: 249, firstYear: 3488, fit: 'Clean NZ sole-trader Xero books and two-monthly GST.' }
  };
  const money = value => value.toLocaleString('en-NZ');
  let opener = null;
  document.querySelectorAll('[data-plan]').forEach(button => {
    button.addEventListener('click', () => {
      const plan = plans[button.dataset.plan];
      if (!plan || typeof dialog.showModal !== 'function') return;
      opener = button;
      document.getElementById('dialog-plan').textContent = plan.name;
      document.getElementById('dialog-monthly').textContent = `NZ$${money(plan.monthly)} / month +GST`;
      document.getElementById('dialog-total').textContent = `NZ$${money(plan.firstYear)} first year including setup, excluding GST and Xero.`;
      document.getElementById('dialog-fit').textContent = plan.fit;
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add('dialog-open');
      dialog.querySelector('.dialog-close').focus({ preventScroll: true });
    });
  });
  dialog.querySelectorAll('.dialog-close, .dialog-done').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const first = dialog.querySelector('.dialog-close');
    const last = dialog.querySelector('.dialog-done');
    if ((event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
  });
})();
