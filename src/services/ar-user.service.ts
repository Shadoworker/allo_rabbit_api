import { UserService } from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { compare } from 'bcryptjs';
// User --> MyUser
import { ArUser, ArUserCredentials } from '../models';
// UserRepository --> ArUserRepository
import { ArUserCredentialsRepository, ArUserRepository } from '../repositories';

export type Credentials = {
  id: string;
  phone: string;
  password: string;

};

// User --> ArUser
export class ArUserService implements UserService<ArUser, ArUserCredentials> {
  constructor(
    // UserRepository --> ArUserRepository
    @repository(ArUserRepository) public arUserRepository: ArUserRepository,
    @repository(ArUserCredentialsRepository) public arUserCredentialsRepository: ArUserCredentialsRepository,
  ) { }

  // User --> ArUser
  async verifyCredentials(arusercredentials: ArUserCredentials): Promise<ArUser> {
    const invalidCredentialsError = 'Invalid phone or password.';

    const foundUser = await this.arUserRepository.findOne({
      where: { phone: arusercredentials.phone },
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }


    const credentialsFound = await this.arUserCredentialsRepository.findOne({ where: { arUserId: foundUser.id } })

    // console.log(credentialsFound);

    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      arusercredentials.password,
      credentialsFound.password,
    );

    // console.log(passwordMatched);


    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }


    return foundUser;
  }

  // User --> ArUser
  convertToUserProfile(user: ArUser): UserProfile {
    return {
      [securityId]: user.id.toString(),
      name: user.username,
      id: user.id,
      email: user.email,
    };
  }
}
