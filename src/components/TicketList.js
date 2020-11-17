import React from "react";
import Ticket from "./Ticket";


function TicketList(props) {
  return (
    <React.Fragment>
      <hr />
      {props.TicketList.map((ticket, index) =>
        <Ticket names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          key={index}/>
        )}
    </React.Fragment>
  );
}

// Add propTypes for ticketList.
TicketList.propTypes = {
  ticketList: PropTypes.array
};

export default TicketList;