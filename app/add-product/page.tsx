'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { UploadButton } from '@/lib/uploadthings'
import { addProduct } from './actions'
import { Loader2 } from 'lucide-react'

const categories = ['ELECTRONICS', 'GROCERY', 'CLOTHING', 'BOOKS', 'OTHER'] as const

type Category = (typeof categories)[number]

export default function AddProductPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState<Category | ''>('')
  const [available, setAvailable] = useState(true)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await addProduct({
      name,
      description,
      pricePerKg: parseFloat(price),
      category,
      available,
      imageUrls
    })

    setLoading(false)

    if (res.success) {
      router.push('/products')
    } else {
      alert(res.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            placeholder="e.g. Fresh Apples"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Write a short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price">Price per Kg</Label>
          <Input
            id="price"
            type="number"
            placeholder="100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category}   onValueChange={(val) => setCategory(val as Category)} required>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="available"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          <Label htmlFor="available">Available</Label>
        </div>

        <div className="grid gap-2">
          <Label>Product Images</Label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res ) => {
              if (!res) return
              const urls = res.map((f) => f.ufsUrl)
              setImageUrls((prev) => [...prev, ...urls])
              alert('Upload completed.')
            }}
            onUploadError={(err: Error) => alert(`Upload failed: ${err.message}`)}
          />
        </div>

        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin w-4 h-4" />}
          {loading ? 'Adding...' : 'Add Product'}
        </Button>
      </form>
    </div>
  )
}
