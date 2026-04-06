import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { Client } from 'pg'

const app = new Hono()

// Database connection setup
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/testdb',
})

// Connect to PostgreSQL
client.connect().then(() => {
  console.log('Connected to PostgreSQL database')
}).catch(err => {
  console.error('Connection error', err.stack)
})

// Simple hello world endpoint
app.get('/', (c) => {
  return c.text('Hello World from Hono!')
})

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', message: 'API is running' })
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})