import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);
    // Create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { client, firestore, history } = this.props;

    const zero = 0;
    const zeroToString = zero.toString();

    //updated Client
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? zeroToString
          : this.balanceInput.current.value
    };

    //update client in firestore and redirect to dashboard
    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      .then(history.push("/"));
  };

  render() {
    const { client } = this.props;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" />
              </Link>

              {/* Adding a span to separate the icon
            and the link */}
              <span>
                <Link to="/" className="btn btn-link">
                  Back to Dashboard
                </Link>
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card-header font-weight-bold">Edit Client</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    //assign a property called ref to connect to the "state" of the input
                    //as we are not able to access its state anymore because it is in the props
                    //when we get the form input details from firebase
                    ref={this.firstNameInput}
                    defaultValue={client.firstName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    required
                    //assign a property called ref to connect to the "state" of the input
                    //as we are not able to access its state anymore because it is in the props
                    //when we get the form input details from firebase
                    ref={this.lastNameInput}
                    defaultValue={client.lastName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    //assign a property called ref to connect to the "state" of the input
                    //as we are not able to access its state anymore because it is in the props
                    //when we get the form input details from firebase
                    ref={this.emailInput}
                    defaultValue={client.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    minLength="8"
                    required
                    //assign a property called ref to connect to the "state" of the input
                    //as we are not able to access its state anymore because it is in the props
                    //when we get the form input details from firebase
                    ref={this.phoneInput}
                    defaultValue={client.phone}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    //assign a property called ref to connect to the "state" of the input
                    //as we are not able to access its state anymore because it is in the props
                    //when we get the form input details from firebase
                    ref={this.balanceInput}
                    defaultValue={client.balance}
                  />
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    //we can access the above clients state via clients props using this.props.clients
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);
