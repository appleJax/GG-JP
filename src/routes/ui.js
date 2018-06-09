export default (app) => {

  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/main.html')
  });

}
