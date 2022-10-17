import React from 'react';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
// import LocationForm from './LocationForm';
// import ConferenceForm from './ConferenceForm';
// import AttendConferenceForm from './AttendConferenceForm';
// import PresentationForm from './PresentationForm';

const App = (props) => {
  if (props.attendees === undefined)
    return null;
  return (
    <React.Fragment>
      <Nav navItems={props.navItems} />
      <div className="container">
        {/* <PresentationForm /> */}
        {/* <AttendConferenceForm /> */}
        {/* <ConferenceForm /> */}
        {/* <LocationForm /> */}
        <AttendeesList attendees={props.attendees} />
      </div>
    </React.Fragment>
  );
};

export default App;
