import e, { Request, Response } from 'express'
import { CreateUserInput } from '../schema/user.schema'
import { createUser } from '../service/user.service'

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const body = req.body

  try {
    const user = await createUser(body)

    return res.send('User successfully created')
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send('Account already exists')
    }

    return res.status(500).send(err)
  }
}
