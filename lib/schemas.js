import { object, string } from 'yup'

const rgbRule = () =>
  string()
    .required()
    .test('is-valid-rgb-color', 'invalid rgb color', (value) => {
      const rgbValues = value.split(',')
      if (rgbValues.length !== 3) return false
      for (let rgbValue of rgbValues) {
        if (Number(rgbValue) === NaN) return false
        if (Number(rgbValue) > 255 || Number(rgbValue) < 0) return false
      }
      return true
    })

export const paletteSchema = object({
  name: string().min(3).max(24).required(),
  color1: rgbRule(),
  color2: rgbRule(),
  color3: rgbRule(),
  color4: rgbRule(),
  color5: rgbRule(),
})
