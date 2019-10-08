import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Trip = ({ id, start, end, isSelected }) => {
  const divStyle = {
    container: {
      width: end - start,
      left: start + 100
    }
  };
  return (
    <div
      id={id}
      style={divStyle.container}
      className={`trip ${isSelected ? "selected" : ""}`}
    >
      {id}
    </div>
  );
};

Trip.propTypes = {
  id: PropTypes.number.isRequired,
  busId: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default Trip;
