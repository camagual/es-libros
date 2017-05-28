import { addFields } from "./admin";

const argv = process.argv
const argc = argv.length
if (argc < 5) {
  console.error('Need at least 3 arguments: data type, field name and default value')
  process.exit(1)
}

if ((argc - 2) % 3 !== 0) {
  console.log((argc - 1))
  console.error('Number of arguments must be a multiple of 3')
  process.exit(1)
}

const getDefaultValue = (type: string, rawValue: string): number | string | boolean => {
  if (type === '-s') return rawValue
  if (type === '-n') return parseFloat(rawValue)
  if (type === '-b') return rawValue === 'true'
  throw Error('Unknown type:' + type)
}

const fieldsToAdd = {}
for (let i = 2; i < argc; i = i + 3) {
  const dataType = argv[i]
  const fieldName = argv[i + 1]
  const value = getDefaultValue(dataType, argv[i + 2])
  fieldsToAdd[fieldName] = value
}


addFields(fieldsToAdd, (err, numAffected) => {
  if (err) throw err
  const recordWord = numAffected === 1 ? 'record' : 'records'
  console.log(`Fields successfully added. ${numAffected} ${recordWord} updated.`)
})
