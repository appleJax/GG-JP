import path from 'path'

export default (app) => {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/main.html'))
  })
}
