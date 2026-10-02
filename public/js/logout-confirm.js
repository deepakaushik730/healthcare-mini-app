(function () {
  const openBtn = document.getElementById("logout-open")
  const modal = document.getElementById("logout-modal")
  const cancelBtn = document.getElementById("logout-cancel")
  const confirmBtn = document.getElementById("logout-confirm")

  if (!openBtn || !modal || !cancelBtn || !confirmBtn) return

  const blockDialogKeys = (event) => {
    if (modal.hidden) return
    if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const showModal = () => {
    modal.hidden = false
    modal.setAttribute("aria-hidden", "false")
    document.addEventListener("keydown", blockDialogKeys, true)
  }

  const hideModal = () => {
    modal.hidden = true
    modal.setAttribute("aria-hidden", "true")
    document.removeEventListener("keydown", blockDialogKeys, true)
  }

  openBtn.addEventListener("click", showModal)

  cancelBtn.addEventListener("click", hideModal)

  confirmBtn.addEventListener("click", () => {
    window.location.href = "/logout"
  })
})()
