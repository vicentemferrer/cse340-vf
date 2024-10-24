const form = document.querySelector("form")

form.addEventListener("change", () => {
    const btn = document.querySelector("button")
    btn.removeAttribute("disabled")
})