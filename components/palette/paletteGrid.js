import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import Link from 'next/link'

const PaletteGrid = () => {
  const [palettes, setPalettes] = useState([])

  useEffect(() => {
    const fetchPalettes = async () => {
      const { status, data } = await axios.get('/api/palettes')

      if (status === 200) {
        setPalettes(data)
      } else {
        throw new Error('Error connecting to server')
      }
    }

    fetchPalettes()
  }, [setPalettes, axios])

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      justifyContent="center"
      spacing={10}
      maxW="70%"
      m="auto"
      p="6"
    >
      {palettes.map((palette, i) => (
        <Card direction="column" overflow="hidden" variant="outline">
          <Box key={i} bg="white" fontWeight="400">
            <Grid
              templateColumns="repeat(5, 1fr)"
              gap={0}
              border="1px solid lightgrey"
            >
              <GridItem w="100%" h="150" bg={`rgb(${palette.color1})`} />
              <GridItem w="100%" h="150" bg={`rgb(${palette.color2})`} />
              <GridItem w="100%" h="150" bg={`rgb(${palette.color3})`} />
              <GridItem w="100%" h="150" bg={`rgb(${palette.color4})`} />
              <GridItem w="100%" h="150" bg={`rgb(${palette.color5})`} />
            </Grid>
          </Box>
          <Stack justifyContent="center" alignItems="center">
            <CardBody>
              <Heading size="md" textTransform="capitalize">
                {palette.name}
              </Heading>
            </CardBody>

            <CardFooter>
              <Button
                as={Link}
                href={`/palettes/${palette.id}`}
                borderRadius="2"
                colorScheme="teal"
              >
                Edit Palette
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  )
}

export default PaletteGrid
