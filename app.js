const todoContainer = document.getElementById('todo-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let startId = 1;
const limit = 200;

async function fetchData(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const data = await response.json();
  return data;
}

async function renderData(id) {
  const todo = await fetchData(id);

  const todoElement = document.createElement('div');
  todoElement.innerHTML = `
    <h3>Title: ${todo.title}</h3>
    <p>ID: ${todo.id}</p>
    <p>User ID: ${todo.userId}</p>
    <p>Completed: ${todo.completed}</p>
  `;

  todoContainer.innerHTML = '';
  todoContainer.appendChild(todoElement);
}

async function handlePrevButtonClick() {
  if (startId > 1) {
    startId--;
    await renderData(startId);
  }
}

async function handleNextButtonClick() {
  if (startId < limit) {
    startId++;
    await renderData(startId);
  }
}

prevButton.addEventListener('click', handlePrevButtonClick);
nextButton.addEventListener('click', handleNextButtonClick);

renderData(startId);

async function fetchPhotos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos');
  const photos = await response.json();
  return photos;
}

async function displayPhotos() {
  const photos = await fetchPhotos();
  const photoContainer = document.getElementById('photo-container');

  for (let i = 0; i < 20; i++) {
    const photo = photos[i];

    const photoElement = document.createElement('div');
    photoElement.innerHTML = `
      <img src="${photo.url}" alt="${photo.title}" />
      <p>${photo.title}</p>
    `;
    photoContainer.appendChild(photoElement);
  }
}

displayPhotos();