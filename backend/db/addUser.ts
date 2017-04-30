import { addUser } from "./admin";

if (process.argv.length < 3) {
  console.error('Need at least 2 arguments: user and password')
  process.exit(1)
}
const user: string = process.argv[2]
const pass: string = process.argv[3]

addUser(user, pass, (err, user) => {
  if (err) throw err
  console.log(`User: ${user.username} successfully added!`)
})
