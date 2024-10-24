class HandlerSettings {
    constructor(mainItem, innerLevel = '') {
        this.reject = {
            url: `/inv/${innerLevel ? `${innerLevel}/` : ''}delete`,
            title: `Reject ${mainItem}`
        }

        this.approve = {
            url: `/inv/${innerLevel ? `${innerLevel}/` : ''}confirm`,
            title: `Approve ${mainItem}`
        }
    }
}

function approveHandler(event, settings) {
    const chkbox = event.currentTarget
    const form = chkbox.parentElement.parentElement.parentElement
    const btn = form.querySelector('button')

    const key = chkbox.checked ? 'approve' : 'reject'

    form.setAttribute('action', settings[key].url)
    btn.innerText = settings[key].title
}

const approveChkBox = document.getElementById('inv_approval') ?? document.getElementById('classification_approval')

const options = {
    inventory: ['Vehicle', ''],

    classification: ['Classification', 'type']
}

const settings = new HandlerSettings(...options[approveChkBox.dataset.modifier])

approveChkBox.addEventListener('change', event => approveHandler(event, settings))