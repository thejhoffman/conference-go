import React from "react";

class AttendConferenceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conference: '',
      name: '',
      email: '',
      hasSignedUp: false,
      conferences: []
    };
    this.handleConferenceChange = this.handleConferenceChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleConferenceChange(event) { this.setState({ conference: event.target.value }); }
  handleNameChange(event) { this.setState({ name: event.target.value }); }
  handleEmailChange(event) { this.setState({ email: event.target.value }); }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.hasSignedUp;
    delete data.conferences;

    const locationUrl = `http://localhost:8001/api/attendees/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      this.setState({ hasSignedUp: true });
    }
  }

  async componentDidMount() {
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ conferences: data.conferences });
    }
  }

  render() {
    return (
      <div className="my-5">
        <div className="row">
          <div className="col col-sm-auto">
            <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" width="300" alt="logo" />
          </div>
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form
                  className={(this.state.hasSignedUp ? " d-none" : "")}
                  onSubmit={this.handleSubmit}
                  id="create-attendee-form"
                >
                  <h1 className="card-title">It's Conference Time!</h1>
                  <p className="mb-3">
                    Please choose which conference
                    you'd like to attend.
                  </p>
                  <div
                    className={
                      "d-flex justify-content-center mb-3" +
                      (this.state.conferences.length > 0 ? " d-none" : "")
                    }
                    id="loading-conference-spinner">
                    <div className="spinner-grow text-secondary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <select
                      onChange={this.handleConferenceChange}
                      value={this.state.conference}
                      className={
                        "form-select" +
                        (this.state.conferences.length > 0 ? "" : " d-none")
                      }
                      required
                      id="conference"
                      name="conference"
                    >
                      <option value="">Choose a conference</option>
                      {this.state.conferences.map(conference => {
                        return (
                          <option key={conference.href} value={conference.href}>
                            {conference.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <p className="mb-3">
                    Now, tell us about yourself.
                  </p>
                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          onChange={this.handleNameChange}
                          value={this.state.name}
                          className="form-control"
                          required
                          placeholder="Your full name"
                          type="text"
                          id="name"
                          name="name"
                        />
                        <label htmlFor="name">Your full name</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          onChange={this.handleEmailChange}
                          value={this.state.email}
                          className="form-control"
                          required
                          placeholder="Your email address"
                          type="email"
                          id="email"
                          name="email"
                        />
                        <label htmlFor="email">Your email address</label>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-lg btn-primary">I'm going!</button>
                </form>
                <div
                  className={
                    "alert alert-success mb-0" +
                    (this.state.hasSignedUp ? "" : " d-none")}
                  id="success-message">
                  Congratulations! You're all signed up!
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    );
  }
}

export default AttendConferenceForm;
