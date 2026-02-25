document.addEventListener("DOMContentLoaded", () => {
    const historyList = document.getElementById("historyList");
    const historyData = JSON.parse(localStorage.getItem("paymentHistory")) || [];

    if (historyData.length === 0) {
        historyList.innerHTML = `
            <div class="text-center p-4">
                <p class="text-muted">No transactions found yet.</p>
            </div>`;
        return;
    }
    historyList.innerHTML = historyData.map(tx => `
        <div class="transaction-item">
            <div class="item-id">ID: ${tx.id}</div>
            <div class="item-main">
                <span class="item-amount">${tx.currency} ${tx.amount}</span>
                <br/>
                <span class="item-date">${tx.date}</span>
            </div>
        </div>
    `).join('');
});
