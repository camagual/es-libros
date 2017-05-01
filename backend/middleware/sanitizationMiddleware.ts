
export const validateLoginRequest = (req: any, res: any, next: any) => {
  const {
    user,
    pass,
  } = req.body

  if (!user || user === "")
    res.status(422).send('User cannot be empty')
  else if (!pass || pass === "")
    res.status(422).send('Pass cannot be empty')
  else
    next()
}
