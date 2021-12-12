import { IProduct } from '@models/Product'
import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import Product from '@models/Product'
import database from '@middlewares/database'

const handler = nextConnect<NextApiRequest, NextApiResponse>()
handler.use(database)

interface BestProduct {
  mainCategory: string
  products: IProduct[]
}

handler.get(async (req, res) => {
  try {
    const categorys = ['best']
    if (req.query?.categorys || req.query.categorys.length) {
      categorys.push(...req.query.categorys.toString().split(','))
    }

    const limit = 10

    const results = await Promise.all(
      categorys.map((category) => {
        const request =
          category === 'best'
            ? Product.find().sort({ sold: -1 }).limit(limit).exec()
            : Product.find()
                .all('category', [category])
                .sort({ sold: -1 })
                .limit(limit)
                .exec()
        return request
      })
    )

    const bestProducts: BestProduct[] = []
    results.forEach((result, index) => {
      bestProducts.push({ mainCategory: categorys[index], products: result })
    })

    return res.status(200).json({ success: true, bestProducts })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
})

export default handler
