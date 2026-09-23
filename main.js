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

const reelTrack = document.querySelector("#reel-track");
const reelPlayer = document.querySelector("#reel-player");
const reelImg = document.querySelector("#reel-player-img");
const reelTitle = document.querySelector("#reel-player-title");
const reelProgress = document.querySelector("#reel-progress");

document.querySelector("#reel-prev").addEventListener("click", () => {
  reelTrack.scrollBy({ left: -300, behavior: "smooth" });
});
document.querySelector("#reel-next").addEventListener("click", () => {
  reelTrack.scrollBy({ left: 300, behavior: "smooth" });
});

let dragStart = 0;
let dragScroll = 0;
let dragging = false;
let dragMoved = false;
reelTrack.addEventListener("pointerdown", (event) => {
  dragging = true;
  dragMoved = false;
  dragStart = event.clientX;
  dragScroll = reelTrack.scrollLeft;
  reelTrack.classList.add("is-dragging");
  reelTrack.setPointerCapture(event.pointerId);
});
reelTrack.addEventListener("pointermove", (event) => {
  if (!dragging) return;
  const delta = event.clientX - dragStart;
  if (Math.abs(delta) > 6) dragMoved = true;
  reelTrack.scrollLeft = dragScroll - delta;
});
function stopDrag() {
  dragging = false;
  reelTrack.classList.remove("is-dragging");
}
reelTrack.addEventListener("pointerup", stopDrag);
reelTrack.addEventListener("pointerleave", stopDrag);

document.querySelectorAll(".reel").forEach((card) => {
  card.addEventListener("click", () => {
    if (dragMoved) return;
    reelImg.src = card.querySelector("img").src;
    reelImg.alt = card.dataset.title;
    reelTitle.textContent = card.dataset.title;
    reelProgress.innerHTML = "";
    reelPlayer.hidden = false;
  });
});

document.querySelector("#reel-close").addEventListener("click", () => {
  reelPlayer.hidden = true;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = new FormData(form);
  noteText.textContent = data.get("name") + ", " + data.get("city") + ", «" + data.get("topic") + "», " + data.get("sum") + ".";
  note.hidden = false;
  form.classList.add("is-sent");
});
