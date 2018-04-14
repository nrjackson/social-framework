import { injectable } from 'inversify';

export interface JwtService {
  getToken(): String;
  saveToken(token: String);
  destroyToken();
}

@injectable()
export class JwtServiceImpl {

  public getToken(): String {
    console.log('getToken(): ls = %j', window.localStorage);
    let token = window.localStorage['jwtToken'];

    if (token && token !== 'undefined') {
      console.log('getToken(): return token: %j', token);
      return token;
    } else {
      this.destroyToken();
      console.log('getToken(): no token');
      return null;
    }
  }

  public saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  public destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
