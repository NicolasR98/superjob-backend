import mongoose from 'mongoose'
import config from 'config'
import log from './logger'

const connectToDB = async (): Promise<void> => {
  const dbUri = config.get<string>('dbUri')

  try {
    await mongoose.connect(dbUri)
    log.info('Connected to DB')
  } catch (err) {
    process.exit(1)
  }
}

export default connectToDB
