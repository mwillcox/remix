import React from "react";
import data from "../../bus-scheduling-input";
// eslint-disable-next-line no-unused-vars
import Board from "../Board";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.trips = data.map(trip => {
      return { ...trip, busId: trip.id };
    });
    this.buses = this.trips.map(t => t.id);
  }

  render() {
    return (
      <div className="container">
        <div className="time-wrapper">
          <div className="time-label">0:00</div>
          <div className="time-label">1:00</div>
          <div className="time-label">2:00</div>
          <div className="time-label">3:00</div>
          <div className="time-label">4:00</div>
          <div className="time-label">5:00</div>
          <div className="time-label">6:00</div>
          <div className="time-label">7:00</div>
          <div className="time-label">8:00</div>
          <div className="time-label">9:00</div>
        </div>
        <Board tripData={this.trips} busData={this.buses} />
      </div>
    );
  }
}

export default App;
