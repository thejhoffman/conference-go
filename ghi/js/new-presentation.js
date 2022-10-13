window.addEventListener('DOMContentLoaded', async () => {
  const url = 'http://localhost:8000/api/conferences/';
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    const selectTag = document.querySelector('#conference');

    for (let conference of data.conferences) {
      const option = document.createElement('option');
      option.value = conference.href;
      option.innerHTML = conference.name;
      selectTag.appendChild(option);
    }
  }

  const formTag = document.getElementById('create-presentation-form');
  formTag.addEventListener('submit', async event => {
    event.preventDefault();

    const conference = document.querySelector('#conference');
    const conferenceHREF = conference.value;
    const formData = Object.fromEntries(new FormData(formTag));
    const json = JSON.stringify(formData);

    const locationUrl = `http://localhost:8000${conferenceHREF}presentations/`;
    const fetchConfig = {
      method: "post",
      body: json,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      formTag.reset();
    }
  });
});
