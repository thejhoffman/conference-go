import React from 'react';
import Nav from './Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';

const App = (props) => {
  if (props.attendees === undefined)
    return null;
  return (
    <BrowserRouter>
      <Nav navItems={props.navItems} />
      <div className="container">
        <Routes>
          <Route path="attendees" element={<AttendeesList attendees={props.attendees} />}>
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
      </div>
    </BrowserRouter>
  );
};

export default App;
