import { DocumentType, getModelForClass, modelOptions, pre, prop, Severity } from '@typegoose/typegoose'
import argon2 from 'argon2'
import { nanoid } from 'nanoid'
import log from '../utils/logger'

/**
 * Here we use `@pre` hook decorator to hash the user password
 */
@pre<User>('save', async function (): Promise<undefined> {
  if (!this.isModified('password')) return

  const hash = await argon2.hash(this.password)

  this.password = hash
})
@modelOptions({
  schemaOptions: {
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})

export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string

  @prop({ required: true })
  firstName: string

  @prop({ required: true })
  lastName: string

  @prop({ required: true })
  password: string

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string

  @prop()
  passwordResetCode: string | null

  @prop({ default: false })
  verified: boolean

  /**
   * Validates the password doing a verification with `argon2`
   * @param this `DocumentType<User>` (User model)
   * @param candidatePassword
   * @returns If could verify the password
   */
  async validatePassword (this: DocumentType<User>, candidatePassword: string): Promise<boolean> {
    try {
      return await argon2.verify(this.password, candidatePassword)
    } catch (err) {
      log.error(err, 'Could not validate the password')
      return false
    }
  }
}

const UserModel = getModelForClass(User)

export default UserModel
