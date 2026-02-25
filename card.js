function save() {
    const cardDetails = {
        cardName: document.getElementById("cardName").value.trim(),
        cardNumber: document.getElementById("cardNumber").value.trim(),
        cvv: document.getElementById("cvv").value.trim()
    };

    if (!cardDetails.cardName || !cardDetails.cardNumber || !cardDetails.cvv) {
        alert("Please fill in all card details.");
        return;
    }

    localStorage.setItem("cardDetails", JSON.stringify(cardDetails));
    alert("Card details saved successfully!");
}

function main() {
    if (document.getElementById("cardName").value.trim() &&
        document.getElementById("cardNumber").value.trim() &&
        document.getElementById("cvv").value.trim()) {
        navigateWithTransition("convertion.html");
    } else {
        alert("Please fill in all card details.");
    }
}