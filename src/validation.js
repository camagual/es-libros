
export const validarLogin = (user, pass) => {
  if (user === "")
    return "User cannot be empty"
  if (pass === "")
    return "Password cannot be empty"
  return null
}
