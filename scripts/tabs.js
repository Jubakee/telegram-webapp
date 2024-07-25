function showTab(tabId) {
    const tabs = document.querySelectorAll('main');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(button => {
        button.classList.remove('active-tab');
    });
    document.getElementById(`${tabId}-btn`).classList.add('active-tab');
}
