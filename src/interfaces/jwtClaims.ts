import {JwtBodyJSON} from "njwt";

export interface JwtClaims extends JwtBodyJSON {
  sub: string | number;
  username: string;
}
