window.addEventListener('DOMContentLoaded', async () => {
  const loadingTag = document.getElementById('loading-conference-spinner');
  const selectTag = document.getElementById('conference');
  const url = 'http://localhost:8000/api/conferences/';
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();

    for (let conference of data.conferences) {
      const option = document.createElement('option');
      option.value = conference.href;
      option.innerHTML = conference.name;
      selectTag.appendChild(option);
    }

    loadingTag.classList.add('d-none');
    selectTag.classList.remove('d-none');
  }

  const successTag = document.getElementById('success-message');
  const formTag = document.getElementById('create-attendee-form');
  formTag.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(formTag));
    const json = JSON.stringify(formData);

    const locationUrl = `http://localhost:8001/api/attendees/`;
    const fetchConfig = {
      method: "post",
      body: json,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      formTag.classList.add('d-none');
      successTag.classList.remove('d-none');
    }
  });
});
