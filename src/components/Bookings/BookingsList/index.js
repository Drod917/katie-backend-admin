import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BookingListItem from '../BookingListItem';

const StyledBookingsList = styled.ul`
  width: 40rem;
  max-width: 100%;
  margin: 0 auto;
  list-style: none;
  padding: 0;
`;

const BookingsList = props => {
  const bookings = props.bookings.map(booking => {
    return (
      <BookingListItem
        key={booking._id}
        bookingId={booking._id}
        fullname={booking.fullname}
        phone={booking.phone}
        date={booking.date}
        service={booking.service}
        comment={booking.comment}
        confirmed={booking.confirmed}
        userId={props.authUserId}
        createdAt={booking.createdAt}
        updatedAt={booking.updatedAt}
        // creatorId={booking.creator._id}
        onDetail={props.onViewDetail}
        onDelete={props.onDeleteDetail}
      />
    );
  })

  return (
    <StyledBookingsList>
      {bookings}
    </StyledBookingsList>
  )
}

BookingsList.propTypes = {
  bookings: PropTypes.array.isRequired,
  authUserId: PropTypes.string.isRequired,
  onViewDetail: PropTypes.func.isRequired,
  onDeleteDetail: PropTypes.func.isRequired,
}

export default BookingsList;
