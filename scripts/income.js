function showAccumulatedCoinsPopup(accumulatedCoins) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerText = `You earned ${formatNumber(accumulatedCoins)} coins while you were away!`;
    document.body.appendChild(popup);
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '20px';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '1000';

    setTimeout(() => {
        popup.remove();
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    let baseIncomePerSec = 1;
    let incomeInterval;
    startIncomeInterval();

    function updateCoins() {
        coins += baseIncomePerSec;
        document.getElementById('coins').innerText = formatNumber(coins);
        saveData();
    }

    function startIncomeInterval() {
        if (incomeInterval) clearInterval(incomeInterval);
        incomeInterval = setInterval(updateCoins, 1000);
    }
});
