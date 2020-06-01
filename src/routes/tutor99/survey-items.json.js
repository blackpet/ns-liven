import surveys from './survey-items.json'

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(surveys))
}
