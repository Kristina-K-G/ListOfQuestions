export type WithId = {
  id: string | number
}

export type AdjacentQuestions<T extends WithId> = {
  prev: T | null
  next: T | null
}

export function getAdjacentQuestions<T extends WithId>(
  questions: T[],
  currentId: string | number | undefined,
): AdjacentQuestions<T> {
  const index = questions.findIndex(
    (question) => String(question.id) === String(currentId),
  )

  if (index === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: questions[index - 1] ?? null,
    next: questions[index + 1] ?? null,
  }
}
