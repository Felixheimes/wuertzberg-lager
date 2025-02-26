// User Credentials
const users = { 
    Felix: "Riesling", 
    Annalena: "FinnundPaul" 
};

// Login Function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (users[username] && users[username] === password) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", username);
        document.getElementById("login-container").style.display = "none";
        document.getElementById("app-container").style.display = "block";
        loadWarehouse();
    } else {
        document.getElementById("login-error").textContent = "Invalid username or password.";
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    location.reload();
}

// Auto-login check
if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("app-container").style.display = "block";
    loadWarehouse();
}

// Warehouse Data
const warehouse = Array.from({ length: 18 }, () => Array(4).fill(null));

// Load Warehouse Grid
function loadWarehouse() {
    const warehouseDiv = document.getElementById("warehouse");
    warehouseDiv.innerHTML = "";

    warehouse.forEach((stack, i) => {
        const boxDiv = document.createElement("div");
        boxDiv.classList.add("box");

        // Apply color shading based on filled boxes
        const filledBoxes = stack.filter(box => box !== null).length;
        if (filledBoxes === 1) boxDiv.classList.add("one-filled");
        else if (filledBoxes === 2) boxDiv.classList.add("two-filled");
        else if (filledBoxes === 3) boxDiv.classList.add("three-filled");
        else if (filledBoxes === 4) boxDiv.classList.add("four-filled");

        boxDiv.addEventListener("click", () => openBoxDetails(i));
        warehouseDiv.appendChild(boxDiv);
    });

    updateStockOverview();
}

// Open Box Editing Popup
function openBoxDetails(index) {
    let details = "";
    warehouse[index].forEach((box, level) => {
        const boxLabel = box ? `${box.name} (${box.year}) - ${box.bottles} bottles` : "Empty";
        details += `Box ${level + 1}: ${boxLabel}\n`;
    });

    const newDetails = prompt(`Edit details:\n${details}\n\nFormat: Name, Year, Bottles (Leave empty to clear)`, "");
    if (newDetails !== null) {
        const entries = newDetails.split("\n").filter(line => line.trim() !== "");
        warehouse[index] = entries.map(entry => {
            const [name, year, bottles] = entry.split(",").map(x => x.trim());
            return name && year && bottles ? { name, year, bottles: Number(bottles) } : null;
        });
    }

    loadWarehouse();
}

// Search Function
function searchWine() {
    const searchValue = document.getElementById("searchBox").value.toLowerCase();
    document.querySelectorAll(".box").forEach((box, index) => {
        const stack = warehouse[index];
        const containsWine = stack.some(box => box && box.name.toLowerCase().includes(searchValue));
        box.style.border = containsWine ? "3px solid red" : "1px solid black";
    });
}

// Update Stock Overview
function updateStockOverview() {
    const stock = {};
    warehouse.flat().forEach(box => {
        if (box) {
            const key = `${box.name} (${box.year})`;
            stock[key] = (stock[key] || 0) + box.bottles;
        }
    });

    const tbody = document.querySelector("#stockTable tbody");
    tbody.innerHTML = "";
    Object.entries(stock).forEach(([wine, bottles]) => {
        const row = `<tr><td>${wine}</td><td>${bottles}</td></tr>`;
        tbody.innerHTML += row;
    });
}
