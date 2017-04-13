import crypto from 'crypto'
import * as BaseProvider from './BaseProvider'

/* Provider for User Registration */
const create = (model, body) => {
  return new Promise((resolve, reject) => {
    if (!body.first_name && !body.last_name && !body.email && !body.password) {
      reject('All fields are Required')
    } else if (!body.first_name) {
      reject('First Name is Required')
    } else if (!body.last_name) {
      reject('Last Name is Required')
    } else if (!body.email) {
      reject('Email is Required')
    } else if (!body.password) {
      reject('Password is Required')
    } else {
      let date = new Date()
      let salt = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      let password = crypto.createHash('sha256').update(body.password + ':' + salt).digest('base64')
      resolve({ ...body, ...{ salt }, ...{ password } })
    }
  })
}

/* Provider for User login */
const login = (body, salt) => {
  const password = crypto.createHash('sha256').update(`${body.password}:${salt}`).digest('base64')
  return { ...body, ...{ password } }
}
export default {
  ...BaseProvider,
  create,
  login
}