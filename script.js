function startConfetti() {
  var canvas = document.getElementById('confettiCanvas');
  var context = canvas.getContext('2d');
  var confettiActive = true;

  function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  var confettiElements = [];
  var confettiCount = 100;

  for (var i = 0; i < confettiCount; i++) {
      confettiElements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          color: 'hsl(' + Math.random() * 360 + ', 100%, 50%)',
          size: Math.random() * 5 + 5,
          speed: Math.random() * 5 + 2,
          oscillation: Math.random() * 0.05 + 0.02,
          oscillationSpeed: Math.random() * 0.05 + 0.02,
          oscillationOffset: Math.random() * Math.PI * 2
      });
  }

  function draw() {
      if (!confettiActive) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      confettiElements.forEach(function(confetto) {
          confetto.x += Math.sin(confetto.oscillationOffset + confetto.y * confetto.oscillationSpeed) * confetto.oscillation;
          confetto.y += confetto.speed;

          if (confetto.y > canvas.height) {
              confetto.y = -confetto.size;
              confetto.x = Math.random() * canvas.width;
          }

          context.fillStyle = confetto.color;
          context.fillRect(confetto.x, confetto.y, confetto.size, confetto.size);
      });

      requestAnimationFrame(draw);
  }

  draw();

  // Stop confetti after 5 seconds
  setTimeout(function() {
      confettiActive = false;
  }, 5000);
}

function showSurpriseMessage() {
  var message = document.getElementById('surpriseMessage');
  message.classList.add('visible');
}

document.getElementById('confettiButton').addEventListener('click', function() {
  startConfetti();
  showSurpriseMessage();
});

// Start confetti when page loads
window.onload = startConfetti;
