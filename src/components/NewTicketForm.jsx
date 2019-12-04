import React from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import { connect } from "react-redux";
import { v4 } from "uuid";

function NewTicketForm(props) {
  let _names = null;
  let _location = null;
  let _issue = null;

  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    const { dispatch } = props;
    const action = {
      type: "ADD_TICKET",
      names: _names.value,
      location: _location.value, 
      issue: _issue.value, 
      id: v4(),
      timeOpen: new Moment(),
      formattedWaitTime: new Moment().fromNow(true)
    };
    dispatch(action);
    _names.value = "";
    _location.value = "";
    _issue.value = "";
  }

  return (
    <div>
      <form onSubmit={handleNewTicketFormSubmission}>
        <input
          type='text'
          id='names'
          placeholder='Pair Names'
          ref={(input) => { _names = input; }} />
        <input
          type='text'
          id='location'
          placeholder='Location'
          ref={(input) => { _location = input; }} />
        <textarea
          id='issue'
          placeholder='Describe your issue.'
          ref={(textarea) => { _issue = textarea; }} />
        <button type='submit'>Help!</button>
      </form>
    </div>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func,
  dispatch: PropTypes.func
};

NewTicketForm = connect()(NewTicketForm);

export default NewTicketForm;