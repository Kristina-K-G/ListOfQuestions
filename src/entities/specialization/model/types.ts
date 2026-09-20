export type Specialization = {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
  slug?: string
  imageSrc?: string
}

export type SpecializationsParams = {
  page?: number
  limit?: number
}