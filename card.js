document.addEventListener("DOMContentLoaded", () => {
    const cardInput = document.getElementById("cardNumber");
    const brandIcon  = document.getElementById("cardBrandIcon");

    if (!cardInput || !brandIcon) return;

    cardInput.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, "");          // only digits
        if (val.length > 19) val = val.slice(0, 19);

        // Format: groups of 4 + space
        let formatted = val.match(/.{1,4}/g)?.join(" ") || val;
        e.target.value = formatted;

        // Card brand detection (using first 6 digits)
        const first6 = val.slice(0, 6);
        let icon = "";
        let color = "#9ca3af";

        if (!first6) {
            brandIcon.innerHTML = "";
            return;
        }

        if (first6.startsWith("4")) {
            icon = "Visa";
            color = "#1e40af";
        } else if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/.test(first6)) {
            icon = "MC";
            color = "#e11d48";
        } else if (/^3[47]/.test(first6)) {
            icon = "Amex";
            color = "#0ea5e9";
        } else if (/^6(011|5)/.test(first6)) {
            icon = "Discover";
            color = "#f59e0b";
        } else {
            icon = "?";
            color = "#ef4444";
        }

        brandIcon.innerHTML = icon;
        brandIcon.style.color = color;
    });
});

function normalizeCardNumber(num) {
    return num.replace(/\D/g, "");
}

function save() {
    const cardNameInput = document.getElementById("cardName");
    const cardNumberInput = document.getElementById("cardNumber");
    const cvvInput = document.getElementById("cvv");

    if (!cardNameInput || !cardNumberInput || !cvvInput) {
        alert("Card form fields are missing. Please reload the page.");
        return;
    }

    const cardDetails = {
        cardName: cardNameInput.value.trim(),
        cardNumber: normalizeCardNumber(cardNumberInput.value),
        cvv: cvvInput.value.trim()
    };

    if (!cardDetails.cardName || !cardDetails.cardNumber || !cardDetails.cvv) {
        alert("Please fill in all card details.");
        return;
    }

    localStorage.setItem("cardDetails", JSON.stringify(cardDetails));
    alert("Card details saved successfully!");
}

function main() {
    const cardNameInput = document.getElementById("cardName");
    const cardNumberInput = document.getElementById("cardNumber");
    const cvvInput = document.getElementById("cvv");

    if (!cardNameInput || !cardNumberInput || !cvvInput) {
        alert("Card form fields are missing. Please reload the page.");
        return;
    }

    if (cardNameInput.value.trim() && cardNumberInput.value.trim() && cvvInput.value.trim()) {
        save();
        navigateWithTransition("convertion.html");
    } else {
        alert("Please fill in all card details.");
    }
}