import React from "react";

class PresentationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presenterName: '',
      presenterEmail: '',
      companyName: '',
      title: '',
      synopsis: '',
      conference: '',
      conferences: []
    };
    this.handlePresenterNameChange = this.handlePresenterNameChange.bind(this);
    this.handlePresenterEmailChange = this.handlePresenterEmailChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSynopsisChange = this.handleSynopsisChange.bind(this);
    this.handleConferenceChange = this.handleConferenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePresenterNameChange(event) { this.setState({ presenterName: event.target.value }); }
  handlePresenterEmailChange(event) { this.setState({ presenterEmail: event.target.value }); }
  handleCompanyNameChange(event) { this.setState({ companyName: event.target.value }); }
  handleTitleChange(event) { this.setState({ title: event.target.value }); }
  handleSynopsisChange(event) { this.setState({ synopsis: event.target.value }); }
  handleConferenceChange(event) { this.setState({ conference: event.target.value }); }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    const conferenceHREF = data.conference;
    data.presenter_name = data.presenterName;
    data.presenter_email = data.presenterEmail;
    data.company_name = data.companyName;
    delete data.presenterName;
    delete data.presenterEmail;
    delete data.companyName;
    delete data.conference;
    delete data.conferences;

    const locationUrl = `http://localhost:8000${conferenceHREF}presentations/`;
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
        presenterName: '',
        presenterEmail: '',
        companyName: '',
        title: '',
        synopsis: '',
        conference: '',
      });
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
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={this.handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handlePresenterNameChange}
                  value={this.state.presenterName}
                  className="form-control"
                  placeholder="presenter_name"
                  required
                  type="text"
                  id="presenter_name"
                  name="presenter_name"
                />
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handlePresenterEmailChange}
                  value={this.state.presenterEmail}
                  className="form-control"
                  placeholder="presenter_email"
                  required
                  type="text"
                  id="presenter_email"
                  name="presenter_email"
                />
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleCompanyNameChange}
                  value={this.state.companyName}
                  className="form-control"
                  placeholder="company_name"
                  type="text"
                  id="company_name"
                  name="company_name"
                />
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleTitleChange}
                  value={this.state.title}
                  className="form-control"
                  placeholder="title"
                  required
                  type="text"
                  id="title"
                  name="title"
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="form mb-3">
                <label htmlFor="synopsis" className="form-label">Synopsis</label>
                <textarea
                  onChange={this.handleSynopsisChange}
                  value={this.state.synopsis}
                  className="form-control"
                  required
                  form="create-presentation-form"
                  name="synopsis"
                  id="synopsis"
                  cols="30"
                  rows="4"
                />
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleConferenceChange}
                  value={this.state.conference}
                  className="form-select"
                  required
                  id="conference"
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
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PresentationForm;
