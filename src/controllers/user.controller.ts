// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { authenticate, TokenService } from '@loopback/authentication';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import { inject } from '@loopback/core';
import { model, property, repository } from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
  SchemaObject,
} from '@loopback/rest';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import _ from 'lodash';
import { ArUser, ArUserCredentials } from '../models';
import { ArUserRepository } from '../repositories';
import { ArUserService } from '../services/ar-user.service';


const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['phone', 'password'],
  properties: {
    phone: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: ArUserService,
    @inject(SecurityBindings.USER, { optional: true })
    public user: UserProfile,
    @repository(ArUserRepository) protected userRepository: ArUserRepository,
  ) { }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: ArUserCredentials,
  ): Promise<object> {

    // console.log(credentials)
    // client.createNotification({})
    // ensure the user exists, and the password is correct
    const _user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(_user);

    let user = { ..._user };

    // console.log(userProfile)
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    user.token = token;
    return user;
  }

  @authenticate('jwt')
  @get('/whoAmI', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': ArUser,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArUser, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: ArUser,
  ): Promise<ArUser> {


    const password = await hash(newUserRequest.password, await genSalt());
    const savedUser = await this.userRepository.create(
      _.omit(newUserRequest, 'password'),
      // newUserRequest
    );
    // console.log(savedUser);

    await this.userRepository.arUserCredentials(savedUser.id).create({ password });

    return savedUser;
  }

  @patch('/ar-users/{id}')
  @response(204, {
    description: 'ArUser PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArUser, { partial: true }),
        },
      },
    })
    aruser: ArUser,
  ): Promise<any> {
    const updatedUser = await this.userRepository.updateById(id, aruser);
    return updatedUser;
  }





}
