function createCard(name, description, pictureUrl, start, end, location) {
  return `
    <div class="card shadow mb-4">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
        <p class="card-text">${description}</p>
        <div class="card-footer">${start} - ${end}</div>
      </div>
    </div>
  `;
}

function sendAlert(message) {
  return `
    <div class="alert alert-danger d-flex align-items-center" role="alert">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        ${message}
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const alert = document.querySelector('.container');
      alert.innerHTML = sendAlert("Unable to retrieve list of conferences");
      console.log("ALERT SENT");

    } else {
      const data = await response.json();

      let columnPosition = 0;
      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const name = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const startDate = new Date(details.conference.starts).toLocaleDateString();
          const endDate = new Date(details.conference.ends).toLocaleDateString();
          const location = details.conference.location.name;
          const html = createCard(name, description, pictureUrl, startDate, endDate, location);

          const columns = document.querySelectorAll('.col');
          columns[columnPosition].innerHTML += html;
          columnPosition++;
          if (columnPosition === 3)
            columnPosition = 0;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

});
