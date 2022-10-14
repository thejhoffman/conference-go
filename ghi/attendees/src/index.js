import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Nav from './Nav';
import reportWebVitals from './reportWebVitals';

const navItems = {
  rootHost: process.env.REACT_APP_ROOT_HOST,
  locationPerm: false,
  conferencePerm: false,
};

window.addEventListener('DOMContentLoaded', async () => {
  const payloadCookie = await window.cookieStore.get("jwt_access_payload");

  if (payloadCookie) {
    const payload = JSON.parse(atob(payloadCookie.value));

    if (payload.user.perms.includes("events.add_location"))
      navItems.locationPerm = true;
    if (payload.user.perms.includes("events.add_conference"))
      navItems.conferencePerm = true;
  }
});

const loadAttendees = async () => {
  const response = await fetch('http://localhost:8001/api/attendees/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <Nav navItems={navItems} />
        <App attendees={data.attendees} />
      </React.StrictMode>
    );
  } else {
    console.error(response);
  }
};
loadAttendees();

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
