export const validateEmail = (email) => {
  if (!email) {
    return "Email is required"
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address"
  }
  return ""
}

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required"
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters"
  }
  return ""
}

export const validateTicket = (ticket) => {
  const errors = {}

  if (!ticket.title || ticket.title.trim() === "") {
    errors.title = "Title is required"
  }

  if (!ticket.status || !["open", "in_progress", "closed"].includes(ticket.status)) {
    errors.status = "Invalid status selected"
  }

  return errors
}
