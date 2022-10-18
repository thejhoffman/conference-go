import React from 'react';
import Nav from './Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import AttendeesList from './AttendeesList';
import AttendConferenceForm from './AttendConferenceForm';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import PresentationForm from './PresentationForm';

const App = (props) => {
  if (props.attendees === undefined)
    return null;
  return (
    <BrowserRouter>
      <Nav navPerms={props.navPerms} />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="attendees">
          <Route index element={<AttendeesList attendees={props.attendees} />} />
          <Route path="new" element={<AttendConferenceForm />} />
        </Route>
        <Route path="locations">
          <Route path="new" element={<LocationForm />} />
        </Route>
        <Route path="conferences">
          <Route path="new" element={<ConferenceForm />} />
        </Route>
        <Route path="presentations">
          <Route path="new" element={<PresentationForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
