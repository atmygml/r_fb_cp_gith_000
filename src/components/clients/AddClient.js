import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//import { compose } from "redux";
//import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";


class AddClient extends Component {
  //put state here
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newClient = this.state;

    const { firestore, history } = this.props;

    //If no balance, make it as "0" as a string
    if(newClient.balance === '') {
      const zero = 0;
      const zeroNumToString = zero.toString();
      newClient.balance = zeroNumToString;
    }

    firestore.add({ collection: "clients" }, newClient)
      .then(() => history.push('/'));
  }

  render() {
    return <div>
        <div className="row">
          <div classname="col-md-6">
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
          <div className="card-header font-weight-bold">Add Client</div>
          <div className="card-body">

            <form onSubmit= {this.onSubmit} >
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" name="firstName" minLength="2" required onChange={this.onChange} value={this.state.firstName} />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" name="lastName" minLength="2" required onChange={this.onChange} value={this.state.lastName} />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" name="email" onChange={this.onChange} value={this.state.email} />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text" className="form-control" name="phone" minLength="8" required onChange={this.onChange} value={this.state.phone} />
              </div>

              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input type="text" className="form-control" name="balance" onChange={this.onChange} value={this.state.balance} />
              </div>

              <input 
                type="submit" 
                value="Submit" 
                className="btn btn-primary btn-block" 
              />

            </form>
          </div>
        </div>
      </div>;
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);