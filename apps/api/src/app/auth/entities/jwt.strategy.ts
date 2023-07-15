import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@tazagroup/shared/datatype";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "../auth.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'hderma') {
    constructor (private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "site.hderma.vn"
        });
    }
    async validate(payload: any) {
        return payload;
      }
    // async validate(user:User): Promise<any> {
    //     const data = await this.authService.validateUser(user);
    //     if (!data) {
    //       throw new UnauthorizedException();
    //     }
    //     return data;
    //   }
}
@Injectable()
export class JwtCustomStrategy extends PassportStrategy(Strategy,'hderma') {
    constructor (private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "hderma"
        });
    }
    async validate(payload: any) {
        console.error(payload);
        return payload;        
      }
    // async validate(user:User): Promise<any> {
    //     const data = await this.authService.validateUser(user);
    //     if (!data) {
    //       throw new UnauthorizedException();
    //     }
    //     return data;
    //   }
}
