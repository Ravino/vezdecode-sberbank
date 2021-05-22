import {readFile} from 'fs';
import path from "path"
import {promisify} from "util"
import write from 'write';


const PReadFile = promisify(readFile)
const root = path.resolve(__dirname, "../")
const dest = path.resolve(root, "lib")
const src = path.resolve(root, 'src');


const filesToCopy = [
    "graphql/main.graphql",
    "jwtRS256.key",
    "jwtRS256.key.pub"
]

const start = async () => {

  for (const file of filesToCopy) {
    const fullSource = path.resolve(src, file)
    const fullDest = path.resolve(dest, file)
    console.log(`Copy ${fullSource} -> ${fullDest}`)
    const data = await PReadFile(fullSource, {encoding: 'utf8'})
    await write(fullDest, data)
  }
}

start().catch((error) => {
    console.error(error)
    process.exit(1)
})
