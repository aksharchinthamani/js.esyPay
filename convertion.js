const userInput      = document.getElementById("inrAmount");
const resultOutput   = document.getElementById("billAmount");
const exchangeButton = document.getElementById("convertButton");
const payButton      = document.getElementById("payBtn");
const dropD          = document.getElementById("selectDropdown");
const denomination   = document.getElementById("denomination");

payButton.disabled = true;

exchangeButton.onclick = () => {
    const amountInr = parseFloat(userInput.value);
    const selectedCurrency = dropD.value;

    if (!amountInr || amountInr <= 0 || !selectedCurrency) {
        alert("Please enter a valid amount in INR and select a currency.");
        return;
    }

    const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.min.json";

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Network error");
            return response.json();
        })
        .then(data => {
            const rates = data.inr;
            const rate = rates[selectedCurrency.toLowerCase()];

            if (!rate) {
                alert(`Sorry, ${selectedCurrency} rate is not available right now.`);
                return;
            }

            const converted = amountInr * rate;

            resultOutput.value = converted.toFixed(2);
            denomination.innerText = selectedCurrency;

            payButton.disabled = false;

            console.log(`Success: ${amountInr} INR = ${converted.toFixed(2)} ${selectedCurrency}`);
        })
        .catch(err => {
            console.error(err);
            alert("Could not fetch exchange rates.\nCheck your internet connection and try again.");
        });
};

function transverse() {
    if (resultOutput.value && parseFloat(resultOutput.value) > 0) {
        localStorage.setItem("amountToPay", resultOutput.value);
        localStorage.setItem("currency", denomination.innerText);
        navigateWithTransition("payment.html");
    } else {
        alert("Please convert an amount first!");
    }
}

function pay() {
    const cardName   = document.getElementById("cardName")?.value.trim();
    const cardNumber = document.getElementById("cardNumber")?.value.trim();
    const cvv        = document.getElementById("cvv")?.value.trim();

    const savedCard  = JSON.parse(localStorage.getItem("cardDetails"));
    const amount     = localStorage.getItem("amountToPay");
    const currency   = localStorage.getItem("currency");

    if (!savedCard) {
        alert("No card details saved. Please save your card first.");
        return;
    }
    if (!cardName || !cardNumber || !cvv) {
        alert("Please fill all card details.");
        return;
    }

    if (cardName === savedCard.cardName &&
        cardNumber === savedCard.cardNumber &&
        cvv === savedCard.cvv) {

        const loading = document.getElementById("loadingOverlay");
        if (loading) loading.style.display = "flex";

        setTimeout(() => {
            const txId = Math.floor(Math.random() * 1000000000000);
            const date = new Date().toLocaleString();

            const newTransaction = {
                id: txId,
                date: date,
                amount: amount,
                currency: currency
            };

            let history = JSON.parse(localStorage.getItem("paymentHistory")) || [];
            history.unshift(newTransaction);
            localStorage.setItem("paymentHistory", JSON.stringify(history));

            if (loading) loading.style.display = "none";

            alert(`Payment Successful!\n\nID: ${txId}\nDate: ${date}`);

            setTimeout(() => navigateWithTransition("history.html"), 1000);
        }, 1000);
    } else {
        alert("Invalid card details. Please try again.");
    }
}


function back() {
    navigateWithTransition("convertion.html");
}

function history() {
    navigateWithTransition("history.html");
}