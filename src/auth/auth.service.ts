import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface User{
  id : string;
  name : string;
}


@Injectable()
export class AuthService{
  constructor(){}
  async validateUser(userId : string, userPassword : string) : Promise<any>{
    return jwt.sign({
      foo : "bar",
      bar : "foo"
    },"secret", {algorithm : 'RS256'});
  }

  sign(userId : string) : string {
    const payload = {
      id : userId,
      role : 'test'
    };

    return jwt.sign(payload, "secret", {
      algorithm : 'HS256',
      expiresIn : '1h'
    });
  }
  verify(token : any){
    try {
      const decoded = jwt.verify(token, "secret");
      
    } catch (error) {
      
    }
  }

}
