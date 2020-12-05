// tags
const main = document.getElementsByTagName("main")[0];
const form = document.getElementsByTagName("form")[0];
const input = document.getElementsByTagName("input")[0];
const cancelBtn = document.getElementsByClassName("cancelBtn")[0];
const ul = document.querySelector("ul");
const video = document.getElementsByTagName("video")[0];

const itemTemplate = `<li>
<span class="title">{title}</span>
<span class="actions">
  <i class="material-icons edit">edit</i>
  <i class="material-icons delete">delete</i>
</span>
</li>`;

let addedCount = getAddedCount();
let currentUpdate = {
  i: -1,
  item: null,
};

// add events
form.addEventListener("submit", addUpdateTodo);
cancelBtn.addEventListener("click", cancelUpdate);

// add/update btn
function addUpdateTodo(event) {
  event.preventDefault();

  var inputValue = input.value;
  if (!inputValue) {
    alert("invalid todo title!");
    return;
  }

  input.value = "";
  input.focus();

  // update mode
  if (currentUpdate.i > -1) {
    updateItem(inputValue);
    return;
  }

  // insert mode
  addItemTemplate(inputValue);
  addedCount++;
  addItemToStore(inputValue);
  storeAddedCount(addedCount);

  if (addedCount > 4) {
    getVideosAPI();
  }
}

// template
function addItemTemplate(todo) {
  ul.insertAdjacentHTML("beforeend", itemTemplate.replace("{title}", todo));
}

// get item index
function getItemIndex(item) {
  return Array.prototype.indexOf.call(item.parentNode.children, item);
}

// edit item
function updateItem(todo) {
  console.log("updateItem");
  currentUpdate.item.children[0].innerText = todo;
  updateItemInStore(todo, currentUpdate.i);
  cancelUpdate();
}

function editItem(item) {
  const itemNode = item.closest("li");
  const i = getItemIndex(itemNode);
  const items = getItemsFromStore();
  input.value = items[i];
  currentUpdate = {
    i,
    item: itemNode,
  };
  main.classList.add("update-mode");
}

function cancelUpdate() {
  input.value = "";
  currentUpdate = {
    i: -1,
    item: null,
  };
  main.classList.remove("update-mode");
}
//

// delete item
function deleteItem(item) {
  if (confirm("are you sure?")) {
    const itemNode = item.closest("li");
    const i = getItemIndex(itemNode);
    item.closest("ul").removeChild(itemNode);
    removeItemFromStore(i);
  }
}

// init
function init() {
  const items = getItemsFromStore();

  // render
  items.forEach((item) => addItemTemplate(item));

  // event
  document.body.addEventListener("click", (e) => {
    if (e.target.matches(".edit")) {
      editItem(e.target);
    }
    if (e.target.matches(".delete")) {
      deleteItem(e.target);
    }
  });
}

// video api
const getVideosAPI = async () => {
  
  input.blur();

  // loading...
  main.classList.add("fetching");
  showModal();

  const response = await fetch(
    "http://api.aparat.com/fa/v1/video/video/mostViewedVideos",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();

  // sort
  const topVideo = result.data.sort(function (a, b) {
    return b.attributes.visit_cnt - a.attributes.visit_cnt;
  })[0];

  video.src = topVideo.attributes.preview_src;
  addedCount = 0;
  storeAddedCount(addedCount);
  main.classList.remove("fetching");
};

// call init
init();
