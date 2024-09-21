import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    console.log('MONGODB_URI:', process.env.MONGODB_URI);

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

    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await users.insertOne({ email, password: hashedPassword })

    const token = jwt.sign({ userId: result.insertedId }, process.env.JWT_SECRET as string, { expiresIn: '1h' })

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Signup Confirmation',
      text: 'Thank you for signing up!',
    })

    res.status(201).json({ message: 'User created successfully', token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  } finally {
    await client.close()
  }
}