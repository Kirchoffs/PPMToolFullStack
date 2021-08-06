import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Alert extends Component {
    render() {
        const style = {
            width: "60%",
            margin: "10px auto"
        };
        const alerts = this.props.alerts;
        if (alerts !== null && alerts.length > 0) {
            return alerts.map((alert) => (
                <div style={style} key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>
            ));
        }
        return null;
    }
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alerts
})

export default connect(mapStateToProps)(Alert);