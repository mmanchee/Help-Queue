import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterTicketList: [],
      selectedTicket: null,
      editing: false
    };
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMasterTicketList = this.state.masterTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
      masterTicketList: editedMasterTicketList,
      editing: false,
      selectedTicket: null
    });
  }
  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleDeletingTicket = (id) => {
    const newMasterTicketList = this.state.masterTicketList
      .filter(ticket => ticket.id !== id);
    this.setState({
      masterTicketList: newMasterTicketList,
      selectedTicket: null
    });
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.masterTicketList
      .filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket});
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMasterTicketList = this.state.masterTicketList
      .concat(newTicket);
    this.setState({
      masterTicketList: newMasterTicketList,
      formVisibleOnPage: false
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm 
        ticket = {this.state.selectedTicket} 
        onEditTicket =  {this.handleEditingTicketInList}/>
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket !== null) {
      currentlyVisibleState = <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickDelete = {this.handleDeletingTicket} 
        onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm 
        onNewTicketCreation={this.handleAddingNewTicketToList} />
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList 
        ticketList={this.state.masterTicketList} 
        onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

export default TicketControl;