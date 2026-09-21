// Sincronizar las letras con la canción
const audio = document.getElementById("bgMusic") || document.querySelector("audio");
const lyrics = document.getElementById("lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
const lyricsData = [
  { text: "At the time", time: 15 },
  { text: "The whisper of birds", time: 18 },
  { text: "Lonely before the sun cried", time: 27 },
  { text: "Fell from the sky", time: 32 },
  { text: "Like water drops", time: 33 },
  { text: "Where I'm now? I don't know why", time: 41 },
  { text: "Nice butterflies in my hands", time: 47 },
  { text: "Too much light for twilight", time: 54 },
  { text: "In the mood for the flowers love", time: 59 },
  { text: "That vision", time: 67 },
  { text: "Really strong, blew my mind", time: 72 },
  { text: "Silence Let me see what it was", time: 78 },
  { text: "I only want to live in clouds", time: 83 },
  { text: "Where I'm now? I don't know why", time: 91 },
  { text: "Nice butterflies in my hands", time: 97 },
  { text: "Too much light for twilight", time: 104 },
  { text: "In the mood for the flowers love", time: 108 },
  { text: "Love.", time: 140 },
  { text: "At the time", time: 144 },
  { text: "The whisper of birds", time: 148 },
  { text: "Lonely before the sun cried", time: 153 },
  { text: "Fell from the sky", time: 158 },
  { text: "Like water drops", time: 164 },
  { text: "Where I'm now? I don't know why", time: 169 },
  { text: "Nice butterflies in my hands", time: 176 },
  { text: "Too much light for twilight", time: 183 },
  { text: "In the mood for the flowers", time: 188 }
];

// Animar las letras suavemente
function updateLyrics() {
  if (!audio || !lyrics) return;
  const time = audio.currentTime;
  const currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 5
  );

  if (currentLine) {
    if (lyrics.innerHTML !== currentLine.text) {
      lyrics.style.opacity = "0";
      setTimeout(() => {
        lyrics.innerHTML = currentLine.text;
        lyrics.style.opacity = "1";
      }, 200);
    }
  } else {
    lyrics.style.opacity = "0";
    setTimeout(() => {
      if (!lyricsData.some(line => time >= line.time && time < line.time + 5)) {
        lyrics.innerHTML = "";
      }
    }, 400);
  }
}

if (audio) {
  audio.addEventListener("timeupdate", updateLyrics);
}

/* =========================================================
   CANVAS DE PARTÍCULAS: PÉTALOS DORADOS Y LUCIÉRNAGAS
   ========================================================= */
const canvas = document.getElementById("ambientCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Clase para pétalos amarillos que caen con brisa
  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 8;
      this.speedY = Math.random() * 0.9 + 0.6;
      this.speedX = Math.random() * 1 - 0.5;
      this.angle = Math.random() * 360;
      this.angularSpeed = (Math.random() - 0.5) * 1.5;
      this.oscillationSpeed = Math.random() * 0.02 + 0.01;
      this.oscillationDistance = Math.random() * 40 + 20;
      this.oscillationTimer = Math.random() * Math.PI * 2;
      this.opacity = Math.random() * 0.5 + 0.45;
    }

    update() {
      this.y += this.speedY;
      this.oscillationTimer += this.oscillationSpeed;
      this.x += Math.sin(this.oscillationTimer) * 0.8 + this.speedX;
      this.angle += this.angularSpeed;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      // Dibujar forma de pétalo de flor amarilla
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.45, this.size, 0, 0, Math.PI * 2);
      const gradient = ctx.createLinearGradient(0, -this.size, 0, this.size);
      gradient.addColorStop(0, "#fff570");
      gradient.addColorStop(0.6, "#ffd41f");
      gradient.addColorStop(1, "#d98a00");
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();
    }
  }

  // Clase para luciérnagas y chispas de luz doradas
  class Firefly {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.5 - 0.15;
      this.baseAlpha = Math.random() * 0.6 + 0.3;
      this.pulseSpeed = Math.random() * 0.03 + 0.015;
      this.pulseTimer = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulseTimer += this.pulseSpeed;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      const alpha = this.baseAlpha + Math.sin(this.pulseTimer) * 0.3;
      if (alpha <= 0) return;

      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#fff8b3";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#ffcc00";
      ctx.fill();
      ctx.restore();
    }
  }

  const petals = Array.from({ length: 28 }, () => new Petal());
  const fireflies = Array.from({ length: 35 }, () => new Firefly());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    fireflies.forEach(firefly => {
      firefly.update();
      firefly.draw();
    });

    petals.forEach(petal => {
      petal.update();
      petal.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}