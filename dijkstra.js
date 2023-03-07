let table = document.querySelector(".table");
let destinationSet = false;
let dim = 10;

//init table
for (let i = 0; i < dim; i++) {
  for (let j = 0; j < dim; j++) {
    let box = document.createElement("DIV");
    box.style.width = "50px";
    box.style.height = "50px";
    box.style.border = "1px solid black";

    if (i + j === 0) {
      box.style.backgroundColor = "green";
    }

    box.addEventListener("click", () => {
      box.style.backgroundColor = "brown";
      viz[i][j] = 1;
    });

    box.addEventListener("contextmenu", async (e) => {
      e.preventDefault();

      if (!destinationSet) {
        box.style.backgroundColor = "yellow";
        destinationSet = true;
        di = i;
        dj = j;

        // setTimeout(dijkstra, 1000);
        await dijkstra();
      }
    });

    table.appendChild(box);
  }
}

let boxes = table.childNodes;

//challenging part: Dijkstra in JS
let inf = 9999999;
let d = new Array(dim).fill(inf);

let viz = new Array(dim);
for (let i = 0; i < dim; i++) {
  viz[i] = new Array(dim).fill(0);
}
viz[0][0] = 1;

let di, dj;
let coada = new Array();

let dx = [0, -1, 0, 1];
let dy = [-1, 0, 1, 0];

let tata = new Array(dim * dim).fill(0);
tata[0] = -1;

const dijkstra = async () => {
  coada.push([0, 0]);

  while (coada.length) {
    let nod = coada.shift();

    await sleep(50);

    for (let i = 0; i < 8; i++) {
      let newX = nod[0] + dx[i];
      let newY = nod[1] + dy[i];
      if (
        newX >= 0 &&
        newX < dim &&
        newY >= 0 &&
        newY < dim &&
        viz[newX][newY] === 0
      ) {
        tata[newX * dim + newY] = nod[0] * dim + nod[1];

        if (newX === di && newY === dj) {
          drum();
          return;
        }

        viz[newX][newY] = 1;
        boxes[newX * dim + newY].style.backgroundColor = "blue";
        coada.push([newX, newY]);
      }
    }
  }
};

const drum = () => {
  let t = di * dim + dj;
  console.log(t);
  console.log(tata);
  while (tata[t] != -1) {
    boxes[tata[t]].style.backgroundColor = "green";

    t = tata[t];
  }
};

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
