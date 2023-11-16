import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import PaletteGrid from '../components/palette/paletteGrid'
import Link from 'next/link'

const Home = () => {
  return (
    <Box>
      <Stack
        as={Box}
        textAlign="center"
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight="110%"
        >
          Kickoff Color <br />
          <Text as={'span'} color="teal">
            Picker
          </Text>
        </Heading>
        <Text color="gray.500">
          Get started with Kickoff Color Picker, a place where you can create
          and edit your own color palettes.
        </Text>
        <Stack direction="column" spacing={3} align="center" alignSelf="center">
          <Button
            as={Link}
            href="/palettes/new"
            colorScheme="teal"
            borderRadius="2"
            px="6"
          >
            Create a New Palette
          </Button>
        </Stack>
      </Stack>
      <Stack align="center" alignSelf="center" mb="8">
        <Heading
          fontWeight={600}
          fontSize={{ base: 'lg', sm: '2xl', md: '4xl' }}
        >
          Your Palettes
        </Heading>
      </Stack>
      <PaletteGrid />
    </Box>
  )
}

export default Home
