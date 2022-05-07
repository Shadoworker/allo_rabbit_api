import { UserService } from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { compare } from 'bcryptjs';
// User --> MyUser
import { ArUser } from '../models';
// UserRepository --> ArUserRepository
import { ArUserRepository } from '../repositories';

export type Credentials = {
  phone: string;
  password: string;
};

// User --> ArUser
export class ArUserService implements UserService<ArUser, Credentials> {
  constructor(
    // UserRepository --> ArUserRepository
    @repository(ArUserRepository) public arUserRepository: ArUserRepository,
  ) { }

  // User --> ArUser
  async verifyCredentials(credentials: Credentials): Promise<ArUser> {
    const invalidCredentialsError = 'Invalid phone or password.';

    const foundUser = await this.arUserRepository.findOne({
      where: { phone: credentials.phone },
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }


    const credentialsFound = await this.arUserRepository.findCredentials(
      foundUser.id,
    );


    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      credentials.password,
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
