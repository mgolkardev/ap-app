// items
function storeTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getItemsFromStore() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function addItemToStore(todo) {
  const items = getItemsFromStore();
  console.log(items);
  items.push(todo);
  storeTodos(items);
}

function updateItemInStore(todo, i) {
  const items = getItemsFromStore();
  items.splice(i, 1, todo);
  storeTodos(items);
}

function removeItemFromStore(i) {
  const items = getItemsFromStore();
  items.splice(i, 1);
  storeTodos(items);
}
//

// count
function storeAddedCount(count) {
  localStorage.setItem("count", count);
}
function getAddedCount() {
  return (items = parseInt(localStorage.getItem("count")) || 0);
}
//
