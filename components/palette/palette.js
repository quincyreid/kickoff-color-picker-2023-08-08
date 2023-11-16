import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { paletteSchema } from '../../lib/schemas'

export default function Palette({ palette = {} }) {
  const router = useRouter()
  const toast = useToast()
  const isExistingPalette = Object.keys(palette).length > 0
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(paletteSchema),
    defaultValues: isExistingPalette ? palette : {},
  })

  useEffect(() => {
    if (isExistingPalette) {
      reset(palette)
    }
  }, [palette])

  const onSubmit = async (data) => {
    if (isExistingPalette) {
      const { status } = await axios.put(`/api/palettes/${palette.id}`, {
        id: palette.id,
        name: data.name,
        color1: data.color1,
        color2: data.color2,
        color3: data.color3,
        color4: data.color4,
        color5: data.color5,
      })

      if (status === 200) {
        toast({
          title: 'Palette updated.',
          description: 'Your palette has been updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push('/')
      }
      return
    } else {
      const { status } = await axios.post('/api/palettes', {
        name: data.name,
        color1: data.color1,
        color2: data.color2,
        color3: data.color3,
        color4: data.color4,
        color5: data.color5,
      })

      if (status === 201) {
        toast({
          title: 'Palette created.',
          description: 'Your palette has been created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push('/')
      }
    }
  }

  const onDelete = async (id) => {
    const response = await axios.delete(`/api/palettes/${id}`)
    if (response.status === 200) {
      toast({
        title: 'Palette deleted.',
        description: 'Your palette has been deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/')
    }
  }

  const paletteColors = ['color1', 'color2', 'color3', 'color4', 'color5']
  const watchColorFields = watch(paletteColors)

  return (
    <Box maxW="70%" m="auto" p="6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Palette Name</FormLabel>
            <Input id="name" placeholder="Name" {...register('name')} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <Grid
            templateColumns="repeat(5, 1fr)"
            gap={0}
            mt="8"
            border="1px solid lightgrey"
          >
            {watchColorFields.map((color, i) => (
              <GridItem w="100%" h="300" bg={`rgb(${color})`} key={i} />
            ))}
          </Grid>
        </Box>
        <Stack m="auto" py="4">
          <Box>
            {paletteColors.map((color, i) => (
              <Box my="4" key={i}>
                <FormControl isInvalid={errors[color]} key={color}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Box bg={`rgb(${watchColorFields[i]})`} w="6" h="6" />
                    </InputLeftElement>
                    <Input
                      id={color}
                      placeholder="Enter rgb color. Ex. 255,0,0"
                      {...register(color)}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors[color]?.message}</FormErrorMessage>
                </FormControl>
              </Box>
            ))}
          </Box>
        </Stack>
        <Button
          mt={4}
          borderRadius="2"
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          {isExistingPalette ? 'Update' : 'Create'} Palette
        </Button>
        {isExistingPalette && (
          <Button
            ml={4}
            mt={4}
            borderRadius="2"
            colorScheme="red"
            isLoading={isSubmitting}
            onClick={() => onDelete(palette.id)}
          >
            Delete Palette
          </Button>
        )}
      </form>
    </Box>
  )
}
