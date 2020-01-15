

function generateRandomString() {
  let rando = [];
  for (let i = 0; i <= 6; i++) {
    rando.push(Math.floor(Math.random() * 10));
  }
  rando = rando.join('');
  return rando;
};

console.log(generateRandomString());
