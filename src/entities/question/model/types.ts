export type QuestionUser = {
  id: string
  username: string
}

export type QuestionSkill = {
  id: number
  title: string
  description: string
  imageSrc?: string
  createdAt: string
  updatedAt: string
}

export type QuestionSpecialization = {
  id: number
  title: string
  description: string
  slug?: string
  imageSrc?: string
  createdAt: string
  updatedAt: string
  createdBy?: QuestionUser
}

export type Question = {
  id: number
  title: string
  description: string
  createdById: string
  createdAt: string
  updatedAt: string
  createdBy: QuestionUser
  questionSpecializations: QuestionSpecialization[]
  questionSkills: QuestionSkill[]

  slug?: string
  code?: string
  imageSrc?: string
  keywords?: string[]
  longAnswer?: string
  shortAnswer?: string
  status?: string
  rate?: number
  complexity?: number
  updatedById?: string
  updatedBy?: QuestionUser
}

export type PublicQuestionsParams = {
  page?: number
  limit?: number
  specializationId?: number
  skills?: number[]
  complexity?: number[]
  rate?: number[]
  title?: string
}