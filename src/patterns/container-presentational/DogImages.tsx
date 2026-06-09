import { useEffect, useState } from 'react'

const MOCK_DOGS = [
  { name: 'Buddy', breed: 'Labrador', emoji: '🐕' },
  { name: 'Luna', breed: 'Golden Retriever', emoji: '🐕‍🦺' },
  { name: 'Max', breed: 'Poodle', emoji: '🐩' },
  { name: 'Bella', breed: 'Husky', emoji: '🐺' },
  { name: 'Charlie', breed: 'Beagle', emoji: '🐶' },
  { name: 'Daisy', breed: 'Corgi', emoji: '🐕' },
]

interface DogImagesProps {
  dogs: typeof MOCK_DOGS
  loading: boolean
}

export function DogImages({ dogs, loading }: DogImagesProps) {
  if (loading) {
    return (
      <div className="flex gap-3 flex-wrap justify-center">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-28 h-32 rounded-lg bg-surface-800 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {dogs.map((dog, i) => (
        <div key={i} className="w-28 rounded-lg bg-surface-800 border border-surface-700 p-3 text-center">
          <div className="text-3xl mb-2">{dog.emoji}</div>
          <div className="text-sm font-medium text-white">{dog.name}</div>
          <div className="text-xs text-surface-400">{dog.breed}</div>
        </div>
      ))}
    </div>
  )
}

export function useDogImages() {
  const [dogs, setDogs] = useState<typeof MOCK_DOGS>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDogs(MOCK_DOGS)
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return { dogs, loading }
}