import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc fetch all products
// @routes GET /api/products
// @access Public 
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
 
  res.json(products)
})

// @desc fetch all products
// @routes GET /api/products
// @access Public 
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Delete a Product
// @routes DELETE /api/products
// @access Private/Admin 
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed'})
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {getProductById, getProducts, deleteProduct}
