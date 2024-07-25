function formatNumber(number) {
    if (number >= 1e12) {
        return (number / 1e12).toFixed(2) + 'T';
    } else if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + 'B';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + 'M';
    } else if (number >= 1e5) {
        return (number / 1e3).toFixed(0) + 'K';
    } else {
        return number.toLocaleString();
    }
}
