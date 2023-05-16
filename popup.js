document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const isIncognito = currentTab.incognito;
  
      const statusElement = document.getElementById('status');
      statusElement.textContent = isIncognito ? 'Incognito' : 'Not Incognito';
    });
  
    // Background Bubbles
    const canvas = document.getElementById('background-canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const bubbles = [];
  
    class Bubble {
      constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
      }
  
      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'rgba(0, 0, 255, 0.5)';
        context.fill();
        context.closePath();
      }
  
      update() {
        this.x += this.dx;
        this.y += this.dy;
  
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
  
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
  
        this.draw();
      }
    }
  
    function createBubbles() {
      for (let i = 0; i < 50; i++) {
        const radius = Math.random() * 10 + 5;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 2;
        const dy = (Math.random() - 0.5) * 2;
        bubbles.push(new Bubble(x, y, radius, dx, dy));
      }
    }
  
    function animate() {
      requestAnimationFrame(animate);
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
      }
    }
  
    createBubbles();
    animate();
  });
  