import knex from '../../clients/knex'

export default async (req, res) => {
  if (req.method === 'GET') {
    const [greeting] = await knex('greetings').limit(1)

    res.status(200).json(greeting)
  } else if (req.method === 'PUT') {
    await knex('greetings')
      .where({ id: req.body.id })
      .update({ body: req.body.body })

    const [greeting] = await knex('greetings')
      .where({ id: req.body.id })
      .limit(1)

    res.status(200).json(greeting)
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` })
  }
}
