'use strict'

// Build inventory items into HTML table components and inject into DOM 
function buildInventoryList(data) {
    const inventoryDisplay = document.getElementById("inventoryDisplay");
    // Set up the table labels 
    const dataTable = data.reduce((acc, { id, model, make }, i, arr) => {
        console.log(id + ", " + model);
        acc += `<tr><td>${make} ${model}</td>`;
        acc += `<td><a href='/inv/edit/${id}' title='Click to update'><i class="fi fi-br-pencil"></i> Modify</a></td>`;
        acc += `<td><a href='/inv/delete/${id}' title='Click to delete'><i class="fi fi-br-trash"></i> Delete</a></td></tr>`;

        acc += i === arr.length - 1 && '</tbody>';

        return acc
    }, '<thead><tr><th>Vehicle Name</th><td>&nbsp;</td><td>&nbsp;</td></tr></thead><tbody>')

    // Display the contents in the Inventory Management view 
    inventoryDisplay.innerHTML = dataTable;
}

const classificationList = document.querySelector("#classificationList")

classificationList.addEventListener("change", () => {
    const classification_id = classificationList.value

    console.log(`classification_id is: ${classification_id}`)

    const classIdURL = "/inv/getInventory/" + classification_id

    fetch(classIdURL)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw Error("Network response was not OK");
        })
        .then((data) => {
            console.log(data);
            buildInventoryList(data);
        })
        .catch((error) => {
            console.log('There was a problem: ', error.message)
        })
})