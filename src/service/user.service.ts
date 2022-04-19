import UserModel, { User } from '../model/user.model'

/**
 * Service to interact with database
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createUser = async (input: Partial<User>) => await UserModel.create(input)
