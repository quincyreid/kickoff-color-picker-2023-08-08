import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Palette from '../../components/palette/palette'
import { Skeleton, Spinner } from '@chakra-ui/react'

const ExistingPalette = () => {
  const router = useRouter()
  const [palette, setPalette] = useState({})
  const { id } = router.query

  useEffect(() => {
    const fetchPalette = async () => {
      const { status, data } = await axios.get(`/api/palettes/${id}`)
      if (status === 200) {
        setPalette(data)
      } else {
        throw new Error('Error connecting to server')
      }
    }
    fetchPalette()
  }, [id, setPalette, axios])

  if (Object.keys(palette).length === 0) return <Spinner />

  return (
    <Palette
      palette={{
        id: palette.id,
        name: palette.name,
        color1: palette.color1,
        color2: palette.color2,
        color3: palette.color3,
        color4: palette.color4,
        color5: palette.color5,
      }}
    />
  )
}

export default ExistingPalette
