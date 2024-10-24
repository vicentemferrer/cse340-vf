class TableListSettings {
    constructor(elementID, tableHeader, innerLevel = '') {
        this.elementID = elementID
        this.tableHeader = tableHeader
        if (innerLevel) this.innerLevel = innerLevel
    }
}

module.exports = { TableListSettings }