let debounceTimeout;
let isAnimating = false;

document.getElementById("clickable-coin").addEventListener("click", function(event) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        coinClicked(event);
        if (navigator.vibrate) navigator.vibrate(100); // Vibrate on click
    }, 100); // Adjust debounce delay as needed
});

document.getElementById("clickable-coin").addEventListener("touchstart", function(event) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        coinClicked(event);
        if (navigator.vibrate) navigator.vibrate(100); // Vibrate on click
    }, 100); // Adjust debounce delay as needed
});

function coinClicked(event) {
    event.preventDefault();
    const touches = event.touches || [{ clientX: event.clientX, clientY: event.clientY }];
    const touchCount = touches.length;

    if (energy <= 0) {
        showNotification("Not enough energy to click the coin!");
        return;
    }

    updateGameState(touchCount);
    animateCoin();
    batchFeedback(touches, coinsPerClick); // Batch feedback animations
}

function updateGameState(touchCount) {
    coins += touchCount * coinsPerClick;
    energy = Math.max(0, energy - touchCount);

    document.getElementById('coins').innerText = formatNumber(coins);
    saveData();
    updateEnergyBar();
}

function animateCoin() {
    const coinImage = document.querySelector('#clickable-coin img');
    if (coinImage) {
        // Remove any previous animations
        coinImage.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)' },
            { transform: 'scale(1)' }
        ], {
            duration: 300, // Match the duration to your CSS transition
            fill: 'forwards'
        });
    }
}

function batchFeedback(touches, amount) {
    feedbackQueue.push(...touches.map(touch => ({ x: touch.clientX, y: touch.clientY, amount })));

    if (!feedbackQueue.length) return;

    requestAnimationFrame(() => {
        const feedbacks = feedbackQueue.splice(0, feedbackQueue.length);
        feedbacks.forEach(feedback => createFeedback(feedback.x, feedback.y, feedback.amount));
    });
}

function createFeedback(x, y, amount) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.innerText = `+${amount}`;
    feedback.style.left = `${x}px`;
    feedback.style.top = `${y}px`;
    document.body.appendChild(feedback);

    // Use requestAnimationFrame to ensure smooth animation
    requestAnimationFrame(() => {
        feedback.classList.add('show');
    });

    // Clean up after animation
    setTimeout(() => {
        feedback.classList.remove('show');
        feedback.classList.add('hidden');
        feedback.addEventListener('transitionend', () => {
            feedback.remove();
        }, { once: true });
    }, 600); // Match the duration of the animation
}
