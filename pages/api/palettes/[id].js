import knex from '../../../clients/knex'
import { paletteSchema } from '../../../lib/schemas'

export default async (req, res) => {
  const { id } = req.query
  switch (req.method) {
    case 'GET':
      try {
        const [palette] = await knex('palettes').where({ id }).limit(1)
        if (!palette) {
          return res.status(404).json({ message: 'Palette not found' })
        }

        return res.status(200).json(palette)
      } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
      }
    case 'PUT':
      try {
        await paletteSchema.validate(req.body)
      } catch (error) {
        return res.status(400).json({ message: error.message })
      }
      try {
        const [updatedPalette] = await knex('palettes')
          .where({ id })
          .update(req.body)
          .returning('*')
        return res.status(200).json(updatedPalette)
      } catch (error) {
        return res.status(500).json({ message: error.message })
      }
    case 'DELETE':
      try {
        const results = await knex('palettes').where({ id }).del()
        return res.status(200).json({ id })
      } catch (error) {
        return res.status(500).json({ message: error.message })
      }
    default:
      return res
        .status(404)
        .json({ error: `${req.method} endpoint does not exist` })
  }
}
