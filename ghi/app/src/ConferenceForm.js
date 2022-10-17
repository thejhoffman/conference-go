import React from "react";

class ConferenceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      starts: '',
      ends: '',
      description: '',
      maxPresentations: '',
      maxAttendees: '',
      location: '',
      locations: []
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStartsChange = this.handleStartsChange.bind(this);
    this.handleEndsChange = this.handleEndsChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleMaxPresentationsChange = this.handleMaxPresentationsChange.bind(this);
    this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) { this.setState({ name: event.target.value }); }
  handleStartsChange(event) { this.setState({ starts: event.target.value }); }
  handleEndsChange(event) { this.setState({ ends: event.target.value }); }
  handleDescriptionChange(event) { this.setState({ description: event.target.value }); }
  handleMaxPresentationsChange(event) { this.setState({ maxPresentations: event.target.value }); }
  handleMaxAttendeesChange(event) { this.setState({ maxAttendees: event.target.value }); }
  handleLocationChange(event) { this.setState({ location: event.target.value }); }

  async handleSubmit(event) {
    event.preventDefault();

    const data = { ...this.state };
    data.max_presentations = data.maxPresentations;
    data.max_attendees = data.maxAttendees;
    delete data.maxPresentations;
    delete data.maxAttendees;
    delete data.locations;

    console.log(JSON.stringify(data));

    const locationUrl = 'http://localhost:8000/api/conferences/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      this.setState({
        name: '',
        starts: '',
        ends: '',
        description: '',
        maxPresentations: '',
        maxAttendees: '',
        location: '',
      });
    }
  }

  async componentDidMount() {
    const url = 'http://localhost:8000/api/locations/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ locations: data.locations });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleNameChange}
                  value={this.state.name}
                  className="form-control"
                  placeholder="Name"
                  required
                  type="text"
                  id="name"
                  name="name"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleStartsChange}
                  value={this.state.starts}
                  className="form-control"
                  required
                  type="date"
                  id="starts"
                  name="starts"
                />
                <label htmlFor="starts">starts</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleEndsChange}
                  value={this.state.ends}
                  className="form-control"
                  required
                  type="date"
                  id="ends"
                  name="ends"
                />
                <label htmlFor="ends">ends</label>
              </div>
              <div className="form mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  onChange={this.handleDescriptionChange}
                  value={this.state.description}
                  className="form-control"
                  required
                  form="create-conference-form"
                  id="description"
                  name="description"
                  cols="30"
                  rows="4"
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleMaxPresentationsChange}
                  value={this.state.maxPresentations}
                  className="form-control"
                  placeholder="Maximum presentations"
                  required
                  type="number"
                  id="max_presentations"
                  name="max_presentations"
                />
                <label htmlFor="max_presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleMaxAttendeesChange}
                  value={this.state.maxAttendees}
                  className="form-control"
                  placeholder="Maximum attendees"
                  required
                  type="number"
                  id="max_attendees"
                  name="max_attendees"
                />
                <label htmlFor="max_attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleLocationChange}
                  value={this.state.location}
                  className="form-select"
                  required
                  id="location"
                  name="location"
                >
                  <option value="">Choose a location</option>
                  {this.state.locations.map(location => {
                    return (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ConferenceForm;
