const passwordInputSettings = {
    password: {
        type: "text",
        iconClass: "fi fi-br-eye-crossed"
    },
    text: {
        type: "password",
        iconClass: "fi fi-br-eye"
    }
}

function iconHandler(event) {
    const icon = event.currentTarget
    const input = icon.parentNode.querySelector('#account_password')

    const currentType = input.getAttribute('type')

    const { type, iconClass } = passwordInputSettings[currentType]

    input.setAttribute('type', type)
    icon.setAttribute('class', iconClass)
}

document.querySelector("form label:has(#account_password) i").addEventListener("click", iconHandler)