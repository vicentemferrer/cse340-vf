const form = document.querySelector("#updateForm")

form.addEventListener("change", () => {
    const updateBtn = document.querySelector("button")
    updateBtn.removeAttribute("disabled")
})