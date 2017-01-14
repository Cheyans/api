import {JwtBodyJSON} from "njwt";

export interface Claims extends JwtBodyJSON {
  sub: string | number;
  username: string;
}
