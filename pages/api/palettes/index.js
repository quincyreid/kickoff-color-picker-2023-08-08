import knex from '../../../clients/knex'

export default async (req, res) => {
	switch (req.method) {
		case 'GET':
			try {
				const palettes = await knex('palettes')
				return res.status(200).json(palettes)
			} catch (error) {
				return res.status(500).json({ message: error.message })
			}
		case 'POST':
			try {
				const [palette] = await knex('palettes').insert(req.body).returning('*')
				return res.status(201).json(palette)
			} catch (error) {
				return res.status(500).json({ message: error.message })
			}
		default:
			return res
				.status(404)
				.json({ error: `${req.method} endpoint does not exist` })
	}
}
