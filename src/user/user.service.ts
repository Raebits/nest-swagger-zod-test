import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async doMeow() {
    return { message: 'rawrrrrr' }
  }
}

