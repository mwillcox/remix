import React from "react";
import Trip from "../Trip";
import "./styles.css";
import PropTypes from "prop-types";

class Bus extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.handleClick(e.target.id, e.target.className);
  }

  render() {
    const { id, label, busTrips, selectedTrip } = this.props;
    const busLabel = label !== 0 ? `Bus ${label}` : "New Bus";
    const trips = busTrips.map(trip => {
      const isSelected = selectedTrip ? selectedTrip.id === trip.id : false;
      return (
        <Trip
          key={trip.id}
          id={trip.id}
          busId={trip.busId}
          start={trip.startTime}
          end={trip.endTime}
          isSelected={isSelected}
        />
      );
    });
    return (
      <div className="bus-container" id={id} onClick={this.onClick}>
        <div className="bus-label">{busLabel}</div>
        <div className="bus-data">{trips}</div>
      </div>
    );
  }
}

Bus.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedTrip: PropTypes.object,
  busTrips: PropTypes.arrayOf(PropTypes.object)
};

Bus.defaultProps = {
  selectedTrip: null,
  busTrips: []
};

export default Bus;
