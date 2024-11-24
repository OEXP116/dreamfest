import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import request from 'supertest'

import { connection } from '../db/index.ts'
import server from '../server.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('Getting Performers', () => {
  it('serves performers', async () => {
    const res = await request(server).get('/api/v1/performers')
    expect(res.body).toMatchInlineSnapshot(`{}`)
  })
})
