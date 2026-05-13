const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

// Function to move the "No" button away from mouse
noBtn.addEventListener('mouseenter', function() {
    moveButtonAway();
});

function moveButtonAway() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    
    // Get random position within viewport bounds (farther away)
    const viewportMaxX = window.innerWidth - 150;
    const viewportMaxY = window.innerHeight - 150;
    
    // Generate random position anywhere on screen
    let randomX = Math.random() * viewportMaxX;
    let randomY = Math.random() * viewportMaxY;
    
    // Ensure button doesn't go off-screen
    randomX = Math.max(10, Math.min(randomX, viewportMaxX));
    randomY = Math.max(10, Math.min(randomY, viewportMaxY));
    
    // Apply new position with smooth transition
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.3s ease';
    noBtn.style.zIndex = '999';
    
    // Add a little bounce effect
    setTimeout(() => {
        noBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            noBtn.style.transform = 'scale(1)';
        }, 200);
    }, 300);
}

// Yes button click event
yesBtn.addEventListener('click', function() {
    showMessage();
    // Hide the No button when Yes is clicked
    noBtn.style.transition = 'all 0.5s ease';
    noBtn.style.opacity = '0';
    noBtn.style.transform = 'scale(0)';
    noBtn.style.pointerEvents = 'none';
    
    // Completely remove after transition
    setTimeout(() => {
        noBtn.style.display = 'none';
    }, 500);
});

function showMessage() {
    // Create envelope container
    const envelopeContainer = document.createElement('div');
    envelopeContainer.className = 'envelope-container';
    
    envelopeContainer.innerHTML = `
        <div class="envelope">
            <div class="envelope-back"></div>
            <div class="envelope-flap" id="envelopeFlap"></div>
            <div class="envelope-message" id="envelopeMessage">
                
                <h3> <h2>كنت عارف انك هتقولي ايوه علي طول من غير ما تفكري</h2><span>🥰</span> <span>💕</span><span>وانا كمان بحبك يا روروو</span> </h3>
                <button class="close-envelope" onclick="closeEnvelope()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(envelopeContainer);
    
    // Auto-open envelope after 1.5 seconds with smoother timing
    setTimeout(() => {
        const flap = document.getElementById('envelopeFlap');
        const message = document.getElementById('envelopeMessage');
        
        if (flap) {
            flap.classList.add('open');
            // Add subtle bounce after opening
            setTimeout(() => {
                flap.style.transform = 'rotateX(-180deg) scale(1.05)';
                setTimeout(() => {
                    flap.style.transform = 'rotateX(-180deg) scale(1)';
                }, 200);
            }, 1200);
        }
        
        if (message) {
            message.classList.add('show');
            // Add gentle float animation
            message.style.animation = 'float 3s ease-in-out infinite';
        }
    }, 1500);
    
    // Also open on click
    envelopeContainer.addEventListener('click', function(e) {
        if (!e.target.classList.contains('close-envelope')) {
            const flap = document.getElementById('envelopeFlap');
            const message = document.getElementById('envelopeMessage');
            
            if (flap && !flap.classList.contains('open')) {
                flap.classList.add('open');
                message.classList.add('show');
            }
        }
    });
}

function closeEnvelope() {
    // Remove envelope with fade out
    const envelope = document.querySelector('.envelope-container');
    if (envelope) {
        envelope.style.transition = 'all 0.5s ease';
        envelope.style.opacity = '0';
        envelope.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            envelope.remove();
            // Show No button again with smooth transition
            noBtn.style.display = 'flex';
            noBtn.style.transition = 'all 0.5s ease';
            noBtn.style.opacity = '1';
            noBtn.style.transform = 'scale(1)';
            noBtn.style.pointerEvents = 'auto';
        }, 500);
    }
}

// Also move button when mouse gets close to it (works on all screen sizes)
document.addEventListener('mousemove', function(e) {
    const noBtnRect = noBtn.getBoundingClientRect();
    const distance = Math.sqrt(
        Math.pow(e.clientX - (noBtnRect.left + noBtnRect.width / 2), 2) +
        Math.pow(e.clientY - (noBtnRect.top + noBtnRect.height / 2), 2)
    );
    
    // If mouse is within 80px of the "No" button, move it (increased range)
    if (distance < 80) {
        moveButtonAway();
    }
});

// Touch event for mobile devices - also make "No" button run away
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveButtonAway();
    
    // Show a playful message
  
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(message);
    
    setTimeout(() => message.remove(), 2000);
});

// Also add touchmove event for mobile to make button run away when finger gets close
document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        const noBtnRect = noBtn.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(touch.clientX - (noBtnRect.left + noBtnRect.width / 2), 2) +
            Math.pow(touch.clientY - (noBtnRect.top + noBtnRect.height / 2), 2)
        );
        
        // If finger is within 100px of the "No" button, move it (increased range)
        if (distance < 100) {
            moveButtonAway();
        }
    }
});

// Also add touchend event to catch any touch attempts
noBtn.addEventListener('touchend', function(e) {
    e.preventDefault();
    moveButtonAway();
});

// Add mouseenter event for mobile hover simulation
noBtn.addEventListener('mouseenter', function() {
    moveButtonAway();
});
