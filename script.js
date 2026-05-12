const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

// Function to move the "No" button away from mouse
noBtn.addEventListener('mouseenter', function() {
    moveButtonAway();
});

function moveButtonAway() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    
    // Get random position within container bounds
    const maxX = containerRect.width - 100;
    const maxY = containerRect.height - 100;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Apply new position
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Yes button click event
yesBtn.addEventListener('click', function() {
    showMessage();
});

function showMessage() {
    // Create custom modal instead of alert for better UX
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        text-align: center;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <h2 style="color: #ff6b6b; margin-bottom: 15px;">I know...</h2>
        <p style="font-size: 1.2em; color: #333;">but want you to confirm it 💕</p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 20px;
            padding: 10px 20px;
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1em;
        ">OK</button>
    `;
    
    // Add fade in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
}

// Also move button when mouse gets close to it (works on all screen sizes)
document.addEventListener('mousemove', function(e) {
    const noBtnRect = noBtn.getBoundingClientRect();
    const distance = Math.sqrt(
        Math.pow(e.clientX - (noBtnRect.left + noBtnRect.width / 2), 2) +
        Math.pow(e.clientY - (noBtnRect.top + noBtnRect.height / 2), 2)
    );
    
    // If mouse is within 50px of the "No" button, move it
    if (distance < 50) {
        moveButtonAway();
    }
});

// Touch event for mobile devices - also make "No" button run away
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveButtonAway();
    
    // Show a playful message
    const message = document.createElement('div');
    message.textContent = "Nice try! 😊";
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ff6b6b;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 1.1em;
        z-index: 1000;
        animation: fadeInOut 2s ease;
    `;
    
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
        
        // If finger is within 60px of the "No" button, move it
        if (distance < 60) {
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
