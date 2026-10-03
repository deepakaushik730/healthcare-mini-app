(function () {
  const form = document.getElementById("logout-form")
  const openBtn = document.getElementById("logout-open")
  const modal = document.getElementById("logout-modal")
  const cancelBtn = document.getElementById("logout-cancel")
  const confirmBtn = document.getElementById("logout-confirm")

  // Without these the form still submits natively, so logout keeps working.
  if (!form || !openBtn || !modal || !cancelBtn || !confirmBtn) return

  const dialog = modal.querySelector('[role="dialog"]')
  const confirmLabel = confirmBtn.textContent
  let lastFocused = null
  let submitting = false

  const getFocusable = () =>
    Array.from(dialog.querySelectorAll("button:not([disabled])"))

  const onKeydown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault()
      hideModal()
      return
    }

    if (event.key === "Tab") {
      const focusable = getFocusable()
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  const showModal = () => {
    if (!modal.hidden) return
    lastFocused = document.activeElement
    modal.hidden = false
    modal.setAttribute("aria-hidden", "false")
    openBtn.setAttribute("aria-expanded", "true")
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeydown)
    // Default to the non-destructive action so a stray Enter doesn't log out.
    cancelBtn.focus()
  }

  const hideModal = () => {
    if (modal.hidden || submitting) return
    modal.hidden = true
    modal.setAttribute("aria-hidden", "true")
    openBtn.setAttribute("aria-expanded", "false")
    document.body.style.overflow = ""
    document.removeEventListener("keydown", onKeydown)
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus()
  }

  const resetState = () => {
    submitting = false
    confirmBtn.disabled = false
    cancelBtn.disabled = false
    confirmBtn.textContent = confirmLabel
    confirmBtn.removeAttribute("aria-busy")
    hideModal()
  }

  form.addEventListener("submit", (event) => {
    if (submitting) return
    event.preventDefault()
    showModal()
  })

  modal.querySelectorAll("[data-logout-dismiss]").forEach((el) => {
    el.addEventListener("click", hideModal)
  })

  confirmBtn.addEventListener("click", () => {
    if (submitting) return
    submitting = true
    confirmBtn.disabled = true
    cancelBtn.disabled = true
    confirmBtn.textContent = "Logging out..."
    confirmBtn.setAttribute("aria-busy", "true")
    form.submit()
  })

  // Restored from back/forward cache: don't leave the modal stuck in "Logging out...".
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) resetState()
  })
})()
