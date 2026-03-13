import {
  useState,
  useReducer,
  useCallback,
  useMemo,
  useEffect
} from "react"

import useFetchPhotos from "../hooks/useFetchPhotos"
import { favouritesReducer } from "../reducer/favouritesReducer"

import PhotoCard from "./PhotoCard"
import SearchBar from "./SearchBar"

export default function Gallery() {

  const { photos, loading, error } = useFetchPhotos()

  const [search, setSearch] = useState("")

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    JSON.parse(localStorage.getItem("favourites") || "[]")
  )

  useEffect(() => {
    localStorage.setItem(
      "favourites",
      JSON.stringify(favourites)
    )
  }, [favourites])

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    },
    []
  )

  const filteredPhotos = useMemo(() => {

    return photos.filter(photo =>
      photo.author
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  }, [photos, search])

  const toggleFav = (id: string) => {
    dispatch({
      type: "TOGGLE_FAV",
      payload: id
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        {error}
      </p>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-black">

      <SearchBar
        value={search}
        onChange={handleSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {filteredPhotos.map(photo => (

          <PhotoCard
            key={photo.id}
            photo={photo}
            isFav={favourites.includes(photo.id)}
            toggleFav={toggleFav}
          />

        ))}

      </div>

    </div>
  )
}