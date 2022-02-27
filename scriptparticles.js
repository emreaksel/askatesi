(async () => {
  await loadConfettiPreset(tsParticles);

  await tsParticles.load("tsparticles", {
    particles: {
      shape: {
        type: "character",
        options: {
          character: {
            fill: true,
            font: "Verdana",
            value: "💵",
            style: "",
            weight: 400
          }
        }
      },
      life: {
        duration: {
          value: 0
        }
      },
      number: {
        value: 200,
        max: 0,
        density: {
          enable: true
        }
      },
      move: {
        gravity: {
          enable: false
        },
        decay: 0,
        direction: "bottom",
        speed: 2,
        outModes: {
          default: "out",
          left: "out",
          right: "out",
          bottom: "out",
          top: "out"
        }
      },
      size: {
        value: 12
      },
      opacity: {
        value: 1,
        animation: {
          enable: false
        }
      }
    },
    background: {
      color: "#232323"
    },
    emitters: [],
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "repulse"
        }
      }
    },
    preset: "confetti"
  });
})();