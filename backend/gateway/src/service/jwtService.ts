import {readFileSync, realpathSync} from 'fs';
import {Secret, verify as jwtVerify, decode as jwtDecode} from 'jsonwebtoken';

export class JWTService {

  private privateKey: Secret;
  private publicKey: Secret;


  public constructor() {

    const privateKeyPath = realpathSync(`${__dirname}/../jwtRS256.key`);
    const publicKeyPath = realpathSync(`${__dirname}/../jwtRS256.key.pub`);


    this.privateKey = readFileSync(privateKeyPath, {encoding: "utf8"});
    this.publicKey = readFileSync(publicKeyPath, {encoding: "utf8"});
  }


  public async verify(token: string): Promise<boolean> {

    let result;
    try {
      result = await jwtVerify(token, this.privateKey, { algorithms: ['RS256'] });
    }
    catch(err) {
      console.log(err);
      return false;
    }


    if(!result) {
      return false;
    }


    return true;
  }


  public async decode(token: string): Promise<any> {

    let result;
    try {
      result = await jwtDecode(token);
    }
    catch(err) {
      console.log(err);
      return undefined;
    }


    if(!result) {
      return undefined;
    }


    return result;
  }
}
