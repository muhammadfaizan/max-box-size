import test from 'ava'
import request from 'supertest'
import app from '../app'
import { performance } from 'perf_hooks'

test('Test api is props', async (t) => {
  performance.mark('A')
  await request(app)
    .get('/')
    .then(({ body }) => {
      t.true(Object.prototype.hasOwnProperty.call(body, 'flights'), 'response does not contain flights attribute')
      t.true(Array.isArray(body.flights), 'Flights attribute is array')
    })
    .catch(err => {
      t.fail(err)
    })
})

test('Test api response time', async (t) => {
  performance.mark('A')
  await request(app)
    .get('/')
    .then(() => {
      performance.mark('B')
      const measure = performance.measure('A to B', 'A', 'B')
      t.true(measure.duration < 1000, 'response time does not exceed 1 second')
    })
    .catch(err => {
      t.fail(err)
    })
})
