import { config as zones } from './package.json';
import smsLink from 'sms-link';

const form = document.querySelector('.form');
const registrationInput = document.querySelector('#registration-number');
const cityPicker = document.querySelector('#city');
const zonePicker = document.querySelector('#zone');

onSelectCity('split');
cityPicker.addEventListener('change', e => onSelectCity(e.target.value));

form.addEventListener('submit', e => {
  e.preventDefault();
  const body = normalize(registrationInput.value);
  const phone = zonePicker.value;
  const url = smsLink({ phone, body });
  window.open(url);
});

function onSelectCity(city) {
  zonePicker.innerHTML = '';
  Object.entries(zones[city]).forEach(([label, phone]) => {
    zonePicker.add(new Option(label, phone));
  });
}

function normalize(registration = '') {
  return registration.replace(/[\s-]/g, '').toUpperCase();
}
