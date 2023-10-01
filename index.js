const express = require('express');
const index = express();
const port = process.env.PORT || 8089;

index.use(express.json());

index.get('/hello', (req, res) => {
  res.send('Hello Express JS');
});

index.get('/user', (req, res) => {
  const { firstname, lastname } = req.query;
  res.send({ firstname, lastname });
});

index.post('/user/:firstname/:lastname', (req, res) => {
  const { firstname, lastname } = req.params;
  res.send({ firstname, lastname });
});

index.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
