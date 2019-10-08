import React from "react";
import PropTypes from "prop-types";
import Bus from "../Bus";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrip: null,
      busData: this.props.busData,
      tripData: this.props.tripData
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id, elementName) {
    const clickedId = parseInt(id);
    const currentTrip = this.state.selectedTrip;
    // Clicked on a trip
    if (elementName.includes("trip")) {
      this.onTripClick(clickedId, currentTrip);
    } else {
      // Clicked on a bus and has a trip selected
      if (currentTrip !== null) {
        this.onBusClick(clickedId, currentTrip, elementName);
      }
    }
  }

  onTripClick(clickedId, currentTrip) {
    const clickedTrip = this.state.tripData.find(t => t.id === clickedId);
    // Toggle the current trip if it is already selected
    if (currentTrip && currentTrip.id === clickedId) {
      this.setState({ selectedTrip: null });
    } else {
      this.setState({ selectedTrip: clickedTrip });
    }
  }

  onBusClick(clickedId, currentTrip) {
    // Adds bus to data when a trip is added to a provisional row
    if (clickedId === 0) {
      const currentBusData = this.state.busData;
      const maxBusId = Math.max(...currentBusData) + 1;
      const updatedBusList = [...currentBusData, maxBusId];
      this.setState({ busData: updatedBusList });
      clickedId = maxBusId;
    }
    // Fetch all trips assigned to the bus that was clicked on
    var clickedBusTrips = this.state.tripData.filter(
      b => b.busId === clickedId
    );
    // Determine if the trip intersects with the bus trips
    let hasConflict = false;
    clickedBusTrips.forEach(t => {
      if (
        t.startTime <= currentTrip.endTime &&
        currentTrip.startTime <= t.endTime
      ) {
        hasConflict = true;
      }
    });
    if (!hasConflict) {
      const trips = this.state.tripData;
      var updatedTrips = trips.map(trip => {
        if (trip.id === currentTrip.id) {
          return {
            ...trip,
            busId: clickedId
          };
        } else {
          return trip;
        }
      });
      // Update state to reflect the newly assigned trip
      this.setState({ tripData: updatedTrips, selectedTrip: null });
    }
  }

  renderProvisionalBusRow() {
    return (
      this.state.selectedTrip && (
        <Bus key={0} id={0} label={0} handleClick={this.handleClick} />
      )
    );
  }

  render() {
    let counter = 1;
    const busRows = this.state.busData.map(id => {
      // Fetch all trips that are assigned to a bus
      var busTrips = this.state.tripData.filter(t => t.busId === id);
      // When there are no trips assigned to a bus, don't display it
      if (busTrips.length < 1) return null;
      return (
        <Bus
          key={id}
          id={id}
          label={counter++}
          handleClick={this.handleClick}
          selectedTrip={this.state.selectedTrip}
          busTrips={busTrips}
        />
      );
    });

    return (
      <React.Fragment>
        {busRows}
        {this.renderProvisionalBusRow()}
      </React.Fragment>
    );
  }
}

Board.propTypes = {
  tripData: PropTypes.arrayOf(PropTypes.object).isRequired,
  busData: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Board;
