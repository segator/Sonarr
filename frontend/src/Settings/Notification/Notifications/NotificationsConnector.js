import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchNotifications, deleteNotification } from 'Stores/Actions/settingsActions';
import Notifications from './Notifications';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.notifications,
    (notifications) => {
      return {
        ...notifications
      };
    }
  );
}

const mapDispatchToProps = {
  fetchNotifications,
  deleteNotification
};

class NotificationsConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchNotifications();
  }

  //
  // Listeners

  onConfirmDeleteNotification = (id) => {
    this.props.deleteNotification({ id });
  }

  //
  // Render

  render() {
    return (
      <Notifications
        {...this.props}
        onConfirmDeleteNotification={this.onConfirmDeleteNotification}
      />
    );
  }
}

NotificationsConnector.propTypes = {
  fetchNotifications: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(NotificationsConnector);
