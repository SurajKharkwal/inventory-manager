'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
type Category = 'ELECTRONICS' | 'GROCERY' | 'CLOTHING' | 'BOOKS' | 'OTHER'
export async function addProduct(data: {
  name: string
  description: string
  pricePerKg: number
  category: string
  available: boolean
  imageUrls: string[]
}) {
  try {
    const { userId } = await auth()
    console.log(data)
    // if (!userId) return { success: false, message: 'Unauthorized' }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        pricePerKg: data.pricePerKg,
        category: data.category as Category,
        available: data.available,
        userId: userId ??"",
        images: {
          create: data.imageUrls.map((url) => ({ url }))
        }
      }
    })

    return { success: true, product }
  } catch (err) {
    console.error(err)
    return { success: false, message: 'Something went wrong' }
  }
}
