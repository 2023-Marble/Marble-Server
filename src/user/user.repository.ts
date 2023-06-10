import { AuthCredentialDto } from './dto/user-credential.dto';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { User } from './schemas/user.schema';
import { Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { name, email } = authCredentialDto;
    const user = this.create({ name, email });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Existing email');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
