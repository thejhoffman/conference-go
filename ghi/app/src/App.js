import React from 'react';
import Nav from './Nav';
import AttendeesList from './AttendeesList';

const App = (props) => {
  if (props.attendees === undefined)
    return null;
  return (
    <React.Fragment>
      <Nav navItems={props.navItems} />
      <AttendeesList attendees={props.attendees} />
      <div className="container">
      </div>
    </React.Fragment>
  );
};

export default App;
