const amount = document.querySelector("#amount");
const months = document.querySelector("#months");
const payment = document.querySelector("#payment");
const form = document.querySelector("#lead-form");
const note = document.querySelector("#form-note");
const noteText = document.querySelector("#form-note-text");
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("#site-nav");

function formatMoney(value) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value)) + " ₽";
}

function updatePayment() {
  const sum = Number(amount.value);
  const term = Number(months.value);
  const monthlyRate = 0.16 / 12;
  if (!sum || !term) {
    payment.textContent = "—";
    return;
  }
  const annuity = sum * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -term)));
  payment.textContent = formatMoney(annuity);
}

amount.addEventListener("input", updatePayment);
months.addEventListener("input", updatePayment);
updatePayment();

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = new FormData(form);
  noteText.textContent = data.get("name") + ", тема «" + data.get("topic") + "».";
  note.hidden = false;
  form.classList.add("is-sent");
});
