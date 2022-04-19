/**
 * Validate a request when we are going to create a user
 */
import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required'
    }),
    lastName: string({
      required_error: 'Last name is required'
    }),
    password: string({
      required_error: 'Password is required'
    }).min(6, 'Password is too short - should be min 6 characters'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required'
    }),
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email')
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })
})

/**
 * We can extract the TypeScript type of any schema with `TypeOf<typeof schema>`
 * @link https://github.com/colinhacks/zod#type-inference
 * @link https://colinhacks.com/essays/zod
 */
export type CreateUserInput = TypeOf<typeof createUserSchema>['body']
