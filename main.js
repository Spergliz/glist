// My list

//html elements
let iteminputE1 = document.getElementById("list-input");
let menuE1 = document.getElementById("menu");
let itemsE1 = document.getElementById("lists");

let lists = loadItem();
displayall();
iteminputE1.addEventListener("keydown", listsubmitHandler);

function listsubmitHandler(e) {
  console.log(e.code);
  if (e.code === "Enter") {
  
    let description = iteminputE1.value;
    lists.push(newitem(description));
    savelists();
    displayall();
    iteminputE1.value = "";
  }
}

function newitem(Itemdesc) {
  return {
    description: Itemdesc,
    completed: false,
  };
}
function displayall() {
  itemsE1.innerHTML = "";
  for (let i = 0; i < lists.length; i++) {
    itemsE1.appendChild(getItemhtml(lists[i], i));
  }
}
function getItemhtml(Item, index) {
  let divE1 = document.createElement("div");

  let checkboxE1 = document.createElement("input");
  checkboxE1.type = "Checkbox";
  checkboxE1.dataset.index = index;
  checkboxE1.addEventListener("input", checkboxchecker);
  checkboxE1.checked = Item.completed;
 
  let textspanE1 = document.createElement("span");
  textspanE1.innerHTML = Item.description;
  if (Item.completed) {
    textspanE1.className = "completed";
  }

  let buttonE1 = document.createElement("button");
  buttonE1.innerHTML = "Remove";
  buttonE1.dataset.index = index;
  buttonE1.addEventListener("click", removebtnhandler);
  

  divE1.appendChild(checkboxE1);
  divE1.appendChild(textspanE1);
  divE1.appendChild(buttonE1);
  return divE1;
}
function savelists() {
  localStorage.setItem("lists", JSON.stringify(lists));
}
function loadItem() {
  let liststr = localStorage.getItem("lists");
  return JSON.parse(liststr) ?? [];
}

function checkboxchecker(e) {
  let index = +e.target.dataset.index;
  let Item = lists[index];
  Item.completed = !Item.completed;
  savelists();
  displayall();
  console.log(e.target);
}

function removebtnhandler(e) {
  let index = +e.target.dataset.index;
  console.log(e.target);
  lists.splice(index, 1);
  savelists();
  displayall();
}
