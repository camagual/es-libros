import { removeFields } from "./admin";

const argc = process.argv.length
if (argc < 3) {
  console.error('Need at least 1 arguments: field name')
  process.exit(1)
}

const fieldsToRemove = {}
for (let i = 2; i < argc; i++)
  fieldsToRemove[process.argv[i]] = true


removeFields(fieldsToRemove, (err, numAffected) => {
  if (err) throw err
  const recordWord = numAffected === 1 ? 'record' : 'records'
  console.log(`Fields successfully removed. ${numAffected} ${recordWord} updated.`)
})
