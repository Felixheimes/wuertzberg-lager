document.addEventListener("DOMContentLoaded", function() {
    const warehouse = document.getElementById("warehouse");

    for (let i = 0; i < 18 * 4; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        box.addEventListener("click", function() {
            box.classList.toggle("active");
        });
        warehouse.appendChild(box);
    }
});
