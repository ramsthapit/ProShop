import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @routes Post /api/users/login
// @access Public 
const authUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body
  
  const user = await User.findOne({ email })
  
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),

    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})


// @desc    Register user & get token
// @routes Post /api/users
// @access Public 
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  
  const userExists = await User.findOne({ email })
  
  if (userExists) {
    res.status(400)
    throw new Error('user already exits')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('invalid user data')
  }
})

// @desc    Get user profile
// @routes GET /api/users/profile
// @access private 
const getUserProfile = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})


// @desc    update user & get token
// @routes PUT /api/users/profile
// @access private 
const updateUserProfile = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),

    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

// @desc   Get all users
// @routes GET /api/users
// @access private/Admin
const getUsers = asyncHandler(async (req, res) => {
  
  const users = await User.find({})
  res.json(users)
  
})

// @desc   Delete users
// @routes DELETE /api/users/:id
// @access private/Admin
const deleteUsers = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
  
})

// @desc   Get user by id 
// @routes GET /api/users/:id
// @access private/Admin
const getUserById = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
  
  
})

// @desc    update user 
// @routes PUT /api/users/profile
// @access private 
const updateUser = asyncHandler(async (req, res) => {
  

  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin 
    
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,

    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})


export { authUser ,registerUser, getUserProfile, updateUserProfile, getUsers, deleteUsers, getUserById ,updateUser}
