'use strict'
class TableListSettings {
    constructor(elementID, tableHeader, innerLevel = '') {
        this.elementID = elementID
        this.tableHeader = tableHeader
        if (innerLevel) this.innerLevel = innerLevel
    }
}

function buildList(data, settings) {
    const display = document.getElementById(settings.elementID)

    const dataTable = data.reduce((acc, { id, make, model, approval }, i, arr) => {
        acc += `<tr><td>${make} ${model}</td>`;

        acc += `<td class='state'>${!approval ? '<span>Waiting for approval</span>' : '&nbsp;'}</td>`;
        acc += `<td><a href='/inv/edit/${id}' title='Click to update' data-update><i class="fi fi-br-pencil"></i>Modify</a></td>`;
        acc += `<td><a href='/inv/delete/${id}' title='Click to delete' data-delete><i class="fi fi-br-trash"></i>Delete</a></td></tr>`;

        if (i === arr.length - 1) acc += '</tbody>';

        return acc
    }, `<thead><tr><th>${settings.tableHeader}</th><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></thead><tbody>`)

    display.innerHTML = dataTable;
}

const classificationList = document.querySelector("#classificationList")

classificationList.addEventListener("change", () => {
    const classification_id = classificationList.value
    const settings = new TableListSettings('inventoryDisplay', 'Vehicle Name')

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
            buildList(data, settings)
        })
        .catch((error) => {
            console.log('There was a problem: ', error.message)
        })
})