function placeholderCard() {
  return `
    <div class="card shadow mb-4">
      <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect></svg>
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
      </div>
    </div>
  `;
}


function createCard(name, description, pictureUrl, start, end, location) {
  return `
    <img src="${pictureUrl}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
      <p class="card-text">${description}</p>
      <div class="card-footer">${start} - ${end}</div>
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

  const columns = document.querySelectorAll('.col');
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
      for (let i = 1; i <= data.conferences.length; i++) {
        columns[columnPosition].innerHTML += placeholderCard();
        columnPosition++;
        if (columnPosition === 3)
          columnPosition = 0;
      }

      const cards = document.querySelectorAll('.card');

      columnPosition = 0;
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
          const conferenceCard = createCard(name, description, pictureUrl, startDate, endDate, location);

          cards[columnPosition].innerHTML = conferenceCard;
          columnPosition++;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

});
