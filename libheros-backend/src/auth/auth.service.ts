import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userData: any) {
    // ✅ Check if user already exists
    const existingUser = await this.usersService.findByEmail(userData.email);

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // ✅ Create user
    const user = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    // ✅ Remove password from response
    const { password, ...result } = user;

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    const { password: _, ...result } = user;

    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };  
  }
}