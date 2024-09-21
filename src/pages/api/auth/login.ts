import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const client = new MongoClient(process.env.MONGODB_URI as string)

  try {
    await client.connect()
    const db = client.db('login-signup-system')
    const users = db.collection('users')

    const user = await users.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' })

    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  } finally {
    await client.close()
  }
}