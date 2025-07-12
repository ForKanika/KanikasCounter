// Countdown to Sep 23, 2025
const countdownDiv = document.getElementById("countdown");
const birthday = new Date("September 23, 2025 00:00:00").getTime();
let birthdayReached = false;

function updateMainCountdown() {
  const now = new Date().getTime();
  const gap = birthday - now;

  if (gap <= 0 && !birthdayReached) {
    birthdayReached = true;
    showBirthdayButton();
    return;
  }

  if (!birthdayReached) {
    const days = Math.floor(gap / (1000 * 60 * 60 * 24));
    const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((gap % (1000 * 60)) / 1000);

    countdownDiv.innerHTML = `
      <div>${days}<br><small>Days</small></div>
      <div>${hours}<br><small>Hours</small></div>
      <div>${mins}<br><small>Minutes</small></div>
      <div>${secs}<br><small>Seconds</small></div>
    `;
  }
}

function showBirthdayButton() {
  const btn = document.createElement("button");
  btn.textContent = "🎉 HAPPY BIRTHDAY!! 🎉";
  btn.style.display = "block";
  btn.style.margin = "50px auto";
  btn.style.padding = "16px 40px";
  btn.style.fontSize = "1.3rem";
  btn.style.borderRadius = "30px";
  btn.style.background = "#ff66a3";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.cursor = "pointer";
  btn.style.transition = "background 0.3s";
  btn.onclick = () => window.location.href = "birthday.html";

  btn.onmouseover = () => btn.style.background = "#e05592";
  btn.onmouseout = () => btn.style.background = "#ff66a3";

  document.body.appendChild(btn);
  document.getElementById("countdown-section").style.display = "none";
}

setInterval(updateMainCountdown, 1000);
updateMainCountdown();

// Traits with Images
const traits = [
  { title: "Artist", desc: "Good at drawing.. What does she draw? We don't know!", img: "admirable.jpg" },
  { title: "Beautiful", desc: "B E Autiful🤌Top to bottom inside and outside just 🤌🤌", img: "beautiful.jpg" },
  { title: "Charming", desc: "Your charm lights up every night sky", img: "charming.jpg" },
  { title: "Delightful", desc: "Being around you is simply lovely.", img: "delightful.jpg" },
  { title: "Elegant", desc: "Grace and poise, that's you.", img: "elegant.jpg" },
  { title: "Fearless", desc: "You take on the world with courage.(sometimes)", img: "fearless.jpg" },
  { title: "Genuine", desc: "You’re as real as it gets.", img: "genuine.jpg" },
  { title: "Hilarious", desc: "You always make me laugh.", img: "hilarious.jpg" },
  { title: "Inspiring", desc: "You lift others just by being yourself.", img: "inspiring.jpg" },
  { title: "Joyful", desc: "You radiate joy like the sun.", img: "joyful.jpg" },
  { title: "Kind", desc: "Your kindness is your superpower.(you're not kind)", img: "kind.jpg" },
  { title: "Loving", desc: "Just Loveley.", img: "loving.jpg" },
  { title: "Magical", desc: "You make everything more special.", img: "magical.jpg" },
  { title: "Nurturing", desc: "I care you like no one else does.", img: "nurturing.jpg" },
  { title: "Optimistic", desc: "You always see the bright side.(sometimes)🤷", img: "optimistic.jpg" },
  { title: "Playful", desc: "Your fun energy is contagious.", img: "playful.jpg" },
  { title: "Quick-witted", desc: "You’re clever and sharp!", img: "quickwitted.jpg" },
  { title: "Radiant", desc: "You glow with beauty and light.", img: "radiant.jpg" },
  { title: "Strong", desc: "You’re powerful beyond words.", img: "strong.jpg" },
  { title: "Trustworthy", desc: "You’re someone we can always count on.", img: "trustworthy.jpg" },
  { title: "Unique", desc: "There’s no one else like you.", img: "unique.jpg" },
  { title: "Vibrant", desc: "Full of energy and sparkle!", img: "vibrant.jpg" },
  { title: "Wonderful", desc: "You make the world better just by existing.", img: "wonderful.jpg" }
];

const traitsContainer = document.getElementById("traits");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupDesc = document.getElementById("popup-description");
const popupClose = document.getElementById("popup-close");
const popupImage = document.getElementById("popup-image");

traits.forEach((trait, i) => {
  const div = document.createElement("div");
  div.textContent = `${String.fromCharCode(65 + i)}. ${trait.title}`;
  div.onclick = () => {
    popupTitle.textContent = trait.title;
    popupDesc.textContent = trait.desc;
    popupImage.src = `images/traits/${trait.img}`;
    popup.classList.remove("hidden");
  };
  traitsContainer.appendChild(div);
});

popupClose.onclick = () => popup.classList.add("hidden");

// Timezone Display
document.getElementById("timezone").textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Upcoming 10 Birthdays
const birthdayCards = document.getElementById("birthday-cards");
const baseYear = 2025;

function format(unit) {
  return unit.toString().padStart(2, '0');
}

for (let i = 0; i < 10; i++) {
  const year = baseYear + i;
  const bday = new Date(`September 23, ${year} 00:00:00`);
  const card = document.createElement("div");
  card.className = "birthday-card";
  card.innerHTML = `
    <h3>🎉 ${year} Birthday</h3>
    <p><strong>Date:</strong> Sep 23, ${year}</p>
    <p><strong>Time Left:</strong></p>
    <p id="bday-timer-${i}">Loading...</p>
  `;
  birthdayCards.appendChild(card);

  const timerEl = document.getElementById(`bday-timer-${i}`);
  const update = () => {
    const now = new Date().getTime();
    const gap = bday.getTime() - now;

    if (gap < 0) {
      timerEl.textContent = "🎂 Already celebrated!";
      return;
    }

    const days = Math.floor(gap / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((gap / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((gap / (1000 * 60)) % 60);
    const secs = Math.floor((gap / 1000) % 60);

    timerEl.textContent = `${format(days)}d ${format(hrs)}h ${format(mins)}m ${format(secs)}s`;
  };

  update();
  setInterval(update, 1000);
}

// Secret Button Logic
const secretBtn = document.createElement("button");
secretBtn.className = "secret-button";
secretBtn.textContent = "Press";
secretBtn.onclick = () => {
  const isKanika = confirm("Are you Kanika?");
  if (isKanika) {
    const password = prompt("Enter your secret password:");
    if (password === "kanika23") {
      sessionStorage.setItem("kanika", "yes");
      window.location.href = "private.html";
    } else {
      alert("Wrong password!");
    }
  }
};
document.body.appendChild(secretBtn);

// Proposal Box Auto Setup (only if on private.html)
if (window.location.pathname.includes("private.html")) {
  window.onload = () => {
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const msg = document.getElementById("proposal-msg");
    const canvas = document.getElementById("proposal-confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confetti = [];
    for (let i = 0; i < 100; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 100 + 10,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
      });
    }

    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of confetti) {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.ellipse(p.x, p.y, p.r, p.r / 2, p.tilt, 0, 2 * Math.PI);
        ctx.fill();
      }
      updateConfetti();
      requestAnimationFrame(drawConfetti);
    }

    function updateConfetti() {
      for (let p of confetti) {
        p.y += 2;
        p.tiltAngle += 0.1;
        p.tilt = Math.sin(p.tiltAngle) * 15;
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      }
    }

    function startConfetti() {
      drawConfetti();
    }

    function showThanks() {
      msg.innerHTML = "Thanks for accepting! ❤️";
      startConfetti();
      yesBtn.disabled = true;
      noBtn.disabled = true;
    }

    yesBtn.onclick = showThanks;
    noBtn.onclick = () => {
      noBtn.textContent = "हाँ";
      noBtn.style.background = "#ff66a3";
      noBtn.onclick = showThanks;
    };
  };
}
