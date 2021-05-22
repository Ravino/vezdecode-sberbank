import {unlink, readFile, writeFile} from 'fs'
import path from 'path'
import {promisify} from 'util'
import glob from 'glob';


const PUnlink = promisify(unlink);
const pReadFile = promisify(readFile);
const PWriteFile = promisify(writeFile);
const PGlob = promisify(glob);
const workDir = path.resolve(__dirname, "../src/graphql")
const pathNameSchema = path.resolve(workDir, 'main.graphql');
const template = path.resolve(workDir, '*.graphql');


const start = async () => {

  try {
    await PUnlink(pathNameSchema);
  }
  catch(err) {}


  const filesToBuild = await PGlob(template);
  const schemaChunk = [];


  for (const file of filesToBuild) {
    const fullSource = path.resolve(workDir, file);
    const source = await pReadFile(fullSource, {encoding: 'utf8'});
    schemaChunk.push(source);
  }


  const schema = schemaChunk.join('\n');
  await PWriteFile(pathNameSchema, schema);
}

start().catch((error) => {
    console.error(error)
    process.exit(1)
})
