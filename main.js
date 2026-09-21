window.addEventListener("DOMContentLoaded", () => {
  // Desencadenar la animación de florecimiento quitando la clase "container"
  document.body.classList.remove("container");

  // Elementos de música y audio
  const audio = document.getElementById("bgMusic") || document.querySelector("audio");
  const musicPlayer = document.getElementById("musicPlayer");
  const musicDisc = document.getElementById("musicDisc");
  const musicHint = document.getElementById("musicHint");

  function setPlayingState(isPlaying) {
    if (!musicPlayer) return;
    if (isPlaying) {
      musicPlayer.classList.add("playing");
      if (musicDisc) musicDisc.classList.add("rotating");
      if (musicHint) musicHint.textContent = "Música 🎵";
    } else {
      musicPlayer.classList.remove("playing");
      if (musicDisc) musicDisc.classList.remove("rotating");
      if (musicHint) musicHint.textContent = "Pausa ⏸";
    }
  }

  // Intentar reproducción automática (autoplay)
  if (audio) {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlayingState(true);
        })
        .catch(() => {
          // Si el navegador bloquea la reproducción automática por política de interacción
          setPlayingState(false);
          if (musicHint) musicHint.textContent = "Tocar 🎵";
          
          // Iniciar música con el primer toque en cualquier parte de la pantalla
          const startAudioOnTouch = () => {
            audio.play().then(() => {
              setPlayingState(true);
            }).catch(() => {});
            window.removeEventListener("click", startAudioOnTouch);
            window.removeEventListener("touchstart", startAudioOnTouch);
          };
          window.addEventListener("click", startAudioOnTouch, { once: true });
          window.addEventListener("touchstart", startAudioOnTouch, { once: true });
        });
    }

    // Alternar reproducción al hacer clic en el widget de música
    if (musicPlayer) {
      musicPlayer.addEventListener("click", (e) => {
        e.stopPropagation();
        if (audio.paused) {
          audio.play().then(() => {
            setPlayingState(true);
          }).catch(() => {});
        } else {
          audio.pause();
          setPlayingState(false);
        }
      });
    }

    audio.addEventListener("play", () => setPlayingState(true));
    audio.addEventListener("pause", () => setPlayingState(false));
  }

  // Control de la tarjeta de dedicatoria
  const dedicationCard = document.getElementById("dedicationCard");
  const btnCloseCard = document.getElementById("btnCloseCard");
  const btnReopenCard = document.getElementById("btnReopenCard");

  if (btnCloseCard && dedicationCard && btnReopenCard) {
    btnCloseCard.addEventListener("click", (e) => {
      e.stopPropagation();
      dedicationCard.style.opacity = "0";
      dedicationCard.style.transform = "translateX(-50%) scale(0.9)";
      setTimeout(() => {
        dedicationCard.style.display = "none";
        btnReopenCard.style.display = "inline-flex";
      }, 350);
    });

    btnReopenCard.addEventListener("click", (e) => {
      e.stopPropagation();
      btnReopenCard.style.display = "none";
      dedicationCard.style.display = "block";
      setTimeout(() => {
        dedicationCard.style.opacity = "1";
        dedicationCard.style.transform = "translateX(-50%) scale(1)";
      }, 20);
    });
  }
});