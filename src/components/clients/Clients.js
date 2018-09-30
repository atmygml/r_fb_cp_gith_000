import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";


class Clients extends Component {
  //put state here
  state = {
    totalOwed: null
  }

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if(clients) {
      //Add the balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0)

      return { totalOwed: total };
    }
    return null;
  }

  render() {
   
    //destructuring, pulling out clients from this.props
    const { clients } = this.props;
    const { totalOwed } = this.state;

    //check if collection can be loaded / exists
    if(clients){
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                &nbsp;
                <i className="fas fa-users"></i> 
                &nbsp; Clients &nbsp; 
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed : &nbsp;
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>

            <table className="table table-striped">
              <thead className="thead-inverse">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td> {client.firstName} {client.lastName} </td>
                    <td> {client.email} </td>
                    <td> ${parseFloat(client.balance).toFixed(2)} </td>
                    <td>
                      <Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm">
                        <i className="fas fas-arrow-circle-right"></i>  Details
                      </Link>
                    </td> 
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      )
    } else {
      return <Spinner />;
    }    
  }
}

//proptypes - name of component: Clients
Clients.propTypes = {
  //firestore prop
  firestore: PropTypes.object.isRequired,
  //clients is a property
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'clients'}]),
  connect((state, props) => ({    
    //we can access the above clients state via clients props using this.props.clients
    clients: state.firestore.ordered.clients    
  }))
)(Clients);