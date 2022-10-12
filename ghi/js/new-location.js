window.addEventListener('DOMContentLoaded', async () => {
  const url = 'http://localhost:8000/api/states/';
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    const selectTag = document.querySelector('#state');

    for (let state of data.states) {
      const option = document.createElement('option');
      option.value = state.abbreviation;
      option.innerHTML = state.name;
      selectTag.appendChild(option);
    }
  }
});
