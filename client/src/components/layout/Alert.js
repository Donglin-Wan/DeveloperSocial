import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const Alert = ({ alerts }) => (
  <div className='alert-wrapper'>
    {alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))}
  </div>
);

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

//fetch alert state from alert reducer fn in reducers/index.js => used in here
const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect (mapStateToProps)(Alert);
