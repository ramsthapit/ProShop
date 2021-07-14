import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Ram',
    email: 'ramsthapit50@gmail.com',
    password: bcrypt.hashSync('123456',10),
    isAdmin: true,
  },
  {
    name: 'Laxman',
    email: 'kathmandu123laxman@gmail.com',
    password: bcrypt.hashSync('123456',10),
  },
  {
    name: 'Hari',
    email: 'hari@hari.com',
    password: bcrypt.hashSync('123456',10),
  },
]

export default users