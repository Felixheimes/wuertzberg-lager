document.addEventListener("DOMContentLoaded", function() {
  const warehouse = document.getElementById("warehouse");

  // Create 18 cells (positions)
  for (let i = 0; i < 18; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    
    // Create a container for stacked boxes within the cell
    let stackContainer = document.createElement("div");
    stackContainer.classList.add("stack-container");
    cell.appendChild(stackContainer);

    // When clicking the cell, add a box if possible.
    cell.addEventListener("click", function() {
      addBoxToCell(cell);
    });

    warehouse.appendChild(cell);
  }
});

function addBoxToCell(cell) {
  const stackContainer = cell.querySelector(".stack-container");
  const currentBoxes = stackContainer.children.length;

  if (currentBoxes < 4) {
    // Create a new box
    let newBox = document.createElement("div");
    newBox.classList.add("box");
    newBox.dataset.level = currentBoxes + 1; // Save level number for reference

    // Stop event propagation so that clicking a box doesn't trigger the cell click event
    newBox.addEventListener("click", function(e) {
      e.stopPropagation();
      openBoxDetails(newBox);
    });

    stackContainer.appendChild(newBox);
  } else {
    alert("This position is full (4 boxes).");
  }
}

function openBoxDetails(box) {
  // Prompt for box information (wine name, year, bottle count)
  let boxInfo = prompt("Enter details (Name, Year, Bottles):", box.dataset.info || "");
  
  if (boxInfo !== null) {
    box.dataset.info = boxInfo;  // Save the information in a data attribute
    box.innerText = boxInfo.split(",")[0];  // Display the wine name (first item)
    box.style.backgroundColor = "green";  // Mark the box as filled
  }
}
