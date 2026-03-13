import { useEffect, useState } from "react"
import type { Photo } from "../types/photo"

export default function useFetchPhotos() {

  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const fetchPhotos = async () => {

      try {

        const res = await fetch(
          "https://picsum.photos/v2/list?limit=30"
        )

        if (!res.ok) {
          throw new Error("Failed to fetch photos")
        }

        const data: Photo[] = await res.json()

        setPhotos(data)

      } catch (err) {

        if (err instanceof Error) {
          setError(err.message)
        }

      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()

  }, [])

  return { photos, loading, error }
}