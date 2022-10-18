import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const navPerms = {
  locationPerm: false,
  conferencePerm: false,
};

const loadJstCookie = async () => {
  const payloadCookie = await window.cookieStore.get("jwt_access_payload");

  if (payloadCookie) {
    const payload = JSON.parse(atob(payloadCookie.value));

    if (payload.user.perms.includes("events.add_location"))
      navPerms.locationPerm = true;
    if (payload.user.perms.includes("events.add_conference"))
      navPerms.conferencePerm = true;
  }
};
loadJstCookie();

const loadAttendees = async () => {
  const response = await fetch('http://localhost:8001/api/attendees/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App attendees={data.attendees} navPerms={navPerms} />
      </React.StrictMode>
    );
  } else {
    console.error(response);
  }
};
loadAttendees();

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
