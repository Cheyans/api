export class Model {
  public static getAuthorizationCode() {
    return {
      code: "n2cyt78bvyf2c8hd72",
      client: {id: "foobar"},
      expiresAt: new Date("December 25, 2020 23:15:30"),
      user: {}
    };
  }

  public static saveToken() {
    return {
      accessToken: "123dsd21eydgeweg2e",
      accessTokenExpiresAt: new Date("December 25, 2020 23:15:30"),
      client: {test: "data"},
      user: {test: "test"}
    };
  }

  public static getAccessToken(token: any) {
    return {
      accessToken: "123dsd21eydgeweg2e",
      accessTokenExpiresAt: new Date("December 25, 2020 23:15:30"),
      client: {test: "data"},
      user: {test: "test"}
    };
  }

  public static getClient(id: string, secret: string) {
    return {id, secret, grants: ["authorization_code"]};
  }

  public static generateToken() {
    return "123dsd21eydgeweg2e";
  }

  public static generateRefreshToken() {
    return "niut738by4uhfn2omc";
  }

  public static revokeAuthorizationCode() {
    return {authorizationCode: 12345, client: {id: "foobar"}, expiresAt: 1, user: {}};
  }

  public static saveAuthorizationCode() {
    return {authorizationCode: "n2cyt78bvyf2c8hd72"};
  }

  public static validateScope() {
    return true;
  }
}
