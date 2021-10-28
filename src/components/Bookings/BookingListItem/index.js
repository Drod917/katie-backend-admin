import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import formStyles from '../../Form/form.module.css';

const StyledBookingListItem = styled.li`
  margin: 0;
  padding: 1rem;
  border: 3px solid #663399;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 1rem;
    color: #663399;
  }

  h2 {
    margin: 0;
    font-size: 0.75rem;
    color: #7c7c7c;
  }

  p {
    margin: 0;
  }

  :first-child {
    border-top: 3px solid #663399;
  }

  @media only screen and (min-width: 500px) {
    h1 {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 1rem;
    }
  }
`;

const BookingListItem = props => (
  <StyledBookingListItem bookingId={props.bookingId}>
    <div>
      <h1>{props.fullname}</h1>
      <h2>{props.service} - {new Date(props.date).toLocaleDateString()}</h2>
    </div>
    <div>
      {/* {
        (props.userId === props.creatorId)
          ? <p>{`Booking Owner`}</p>
          : <button
              className={formStyles[`form__button`]}
              onClick={props.onDetail.bind(this, props.bookingId)}
            >
              {`Details`}
            </button>
      } */}
      <button
        className={formStyles[`form__button`]}
        onClick={props.onDetail.bind(this, props.bookingId)}
      >
        {`Details`}
      </button>
      <button
        className={formStyles[`form__button`]}
        onClick={props.onDelete.bind(this, props.bookingId)}
      >
        {`Delete`}
      </button>
    </div>
  </StyledBookingListItem>
);

BookingListItem.propTypes = {
  bookingId: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  confirmed: PropTypes.bool,
  onDetail: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default BookingListItem;
