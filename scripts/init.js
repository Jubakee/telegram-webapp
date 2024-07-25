let coins = 0; // Coins
let coinsPerClick = 1; // Coins earned per click
let energy = 1000; // Starting energy value
const maxEnergy = 1000; // Maximum energy value
const energyRechargeRate = 1; // Energy recharge rate
const rechargeInterval = 1000; // Recharge every 1 seconds
let lastUpdateTime = Date.now(); // Track last update time
const feedbackQueue = []; // Animation Feedback Queue

window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();
window.Telegram.WebApp.disableVerticalSwipes();

window.addEventListener('load', () => {
    //resetGame();
    loadData();
    setInterval(rechargeEnergy, rechargeInterval);
});

window.addEventListener('beforeunload', () => {
    saveData();
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        saveData();
    }
});

function resetGame() {
    coins = 0;
    energy = 1000;
    level = 1;
    coinsPerClick = 1;

    localStorage.removeItem('avatar_coins');
    localStorage.removeItem('avatar_energy');
    localStorage.removeItem('avatar_lastupdate');
    localStorage.removeItem('avatar_base_income');
    // localStorage.removeItem('avatar_inventory');
    // localStorage.removeItem('last_item_id');
 
    document.getElementById('coins').innerText = coins;
    updateEnergyBar();
}

function saveData() {
    localStorage.setItem('avatar_coins', coins);
    localStorage.setItem('avatar_energy', energy);
    localStorage.setItem('avatar_lastupdate', Date.now());
}

function loadData() {
    const savedCoins = localStorage.getItem('avatar_coins');
    if (savedCoins !== null) {
        coins = parseInt(savedCoins, 10);
        document.getElementById('coins').innerText = formatNumber(coins);
    }

    const savedEnergy = localStorage.getItem('avatar_energy');
    const savedLastUpdate = localStorage.getItem('avatar_lastupdate');

    if (savedEnergy) {
        energy = Math.min(parseInt(savedEnergy, 10), maxEnergy); // Cap energy at max
    }

    if (savedLastUpdate) {
        lastUpdateTime = parseInt(savedLastUpdate, 10);
        const elapsedTime = Date.now() - lastUpdateTime;
        const elapsedTimeInMilliseconds = Date.now() - lastUpdateTime;
        const elapsedTimeInSeconds = elapsedTimeInMilliseconds / 1000;
        const roundedElapsedTimeInSeconds = Math.round(elapsedTimeInSeconds);
        coins = coins + roundedElapsedTimeInSeconds;
        showAccumulatedCoinsPopup(roundedElapsedTimeInSeconds)
        energy += Math.floor(elapsedTime / rechargeInterval) * energyRechargeRate;
        energy = Math.min(energy, maxEnergy); // Cap energy at max
        lastUpdateTime = Date.now() - (elapsedTime % rechargeInterval); // Adjust lastUpdateTime correctly
    }
    updateEnergyBar();
}