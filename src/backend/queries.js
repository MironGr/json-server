const fs = require('fs');

const readData = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${filename}.json`, (err, data) => {
      if(err) reject(err)
      resolve(JSON.parse(data))
    })
  })
}

const getAll = async (request, response) => {
  const {
    _start,
    _end
  } = request.query

  // Чтение данных из БД (json файлов)
  Promise.all([readData('promos'), readData('users')])
    .catch(err => {
      console.log('! ERROR - ', err)
      response.status(400)
    })
    .then(result => {
      const [ promos, users ] = result
      const usersObj = users.reduce((acc, current) => {
        acc[current.id] = current
        return acc
      }, {})
      const final = promos.map(prom => {
        const userId = prom['creator']
        return {
          ...prom,
          ...usersObj[userId]
        }
      })
      const forFront = final.slice(_start, _end)
      response.set('X-Total-Count', final.length)
      response.status(200).json(forFront)
    })
}

module.exports = {
  getAll
}