document.addEventListener("DOMContentLoaded", function() {
    const warehouse = document.getElementById("warehouse");

    for (let i = 0; i < 18 * 4; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        box.dataset.index = i; // Store index for reference

        box.addEventListener("click", function() {
            openBoxDetails(box);
        });

        warehouse.appendChild(box);
    }
});

function openBoxDetails(box) {
    let boxInfo = prompt("Enter details (Name, Year, Bottles):", box.dataset.info || "");

    if (boxInfo !== null) { 
        box.dataset.info = boxInfo; // Store data inside the element
        box.classList.add("active"); // Mark as filled
        box.innerText = boxInfo.split(",")[0]; // Show wine name only
    }
}
