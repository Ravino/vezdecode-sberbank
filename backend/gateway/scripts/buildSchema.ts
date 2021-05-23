import {unlink, readFile, writeFile} from 'fs'
import path from 'path'
import {promisify} from 'util'
import glob from 'glob';


const PUnlink = promisify(unlink);
const pReadFile = promisify(readFile);
const PWriteFile = promisify(writeFile);
const PGlob = promisify(glob);

const workDirGateway = path.resolve(__dirname, "../src/graphql/gateway");
const gateway = {
  workDir: workDirGateway,
  pathNameSchema: path.resolve(workDirGateway, 'main.graphql'),
  template: path.resolve(workDirGateway, '*.graphql')
};


const workDirBackoffice = path.resolve(__dirname, "../src/graphql/backoffice");
const backoffice = {
  workDir: workDirBackoffice,
  pathNameSchema: path.resolve(workDirBackoffice, 'main.graphql'),
  template: path.resolve(workDirBackoffice, '*.graphql')
};

const arr = [
  gateway,
  backoffice
];


const start = async () => {

  for(let t of arr) {
    try {
      await PUnlink(t.pathNameSchema);
    }
    catch(err) {}


    const filesToBuild = await PGlob(t.template);
    const schemaChunk = [];


    for (const file of filesToBuild) {
      const fullSource = path.resolve(t.workDir, file);
      const source = await pReadFile(fullSource, {encoding: 'utf8'});
      schemaChunk.push(source);
    }


    const schema = schemaChunk.join('\n');
    await PWriteFile(t.pathNameSchema, schema);
  }
}

start().catch((error) => {
    console.error(error)
    process.exit(1)
})
