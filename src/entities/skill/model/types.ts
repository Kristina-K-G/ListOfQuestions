export type SkillSpecialization = {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
  slug?: string
  imageSrc?: string
}

export type Skill = {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
  specializations: SkillSpecialization[]
  imageSrc?: string
}

export type SkillsParams = {
  page?: number
  limit?: number
  specializations?: string | number
}