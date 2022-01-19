import { isResponseOk, isBrowser } from './helpers';

const isValidBooking = (booking) => {
  const { fullname, phone, date, service, comment } = booking;
  return !(fullname.trim().length === 0 ||
      phone.trim().length === 0 ||
      date.trim().length === 0 ||
      service.trim().length === 0 ||
      comment.trim().length === 0);
}

export const createBooking = async (token, booking) => {
  if (!isBrowser) return false;

  if (!isValidBooking(booking)) {
    return false;
  }

  const requestBody = {
    query: `
      mutation CreateBooking(
          $fullname: String!,
          $phone: String!,
          $email: String!,
          $date: String!,
          $service: String!,
          $comment: String!,
        ) {
        createBooking(bookingInput: {
          fullname: $fullname,
          phone: $phone,
          email: $email,
          date: $date,
          service: $service,
          comment: $comment
        }) {
          _id
          fullname
          phone
          email
          date
          service
          comment
          confirmed
        }
      }
    `,
    variables: {
      ...booking
    }
  };

  try {
    const response = await fetch('https://katie-backend.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!isResponseOk(response)) {
      throw new Error('Create Booking Failed!');
    }

    let { data } = await response.json();
    // There may be an edge case where there's a failing client token
    if (!data.createBooking) {
      console.log("Authentication Error");
      return false;
    }
    return { ...data.createBooking };
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const fetchBookings = async (filterConfirmed) => {
  const requestBody = {
    query: `
      query Bookings($confirmed: Boolean) {
        bookings(confirmed: $confirmed) {
          _id
          fullname
          phone
          email
          date
          service
          comment
          confirmed
        }
      }
    `,
    variables: {
      confirmed: filterConfirmed,
    }
  };

  try {
    const response = await fetch('https://katie-backend.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!isResponseOk(response)) {
      throw new Error('Fetch Bookings Failed!');
    }

    const { data } = await response.json();
    return data.bookings;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const confirmBooking = async (token, bookingId) => {
  if (!isBrowser) return false;

  const requestBody = {
    query: `
      mutation ConfirmBooking($bookingId: ID!) {
        confirmBooking(bookingId: $bookingId) {
          _id
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      bookingId
    }
  };

  try {
    const response = await fetch('https://katie-backend.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    if (!isResponseOk(response)) {
      throw new Error('Confirm Booking Failed!');
    }

    const { data } = await response.json();

    if (!data.confirmBooking) return false;
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const deleteBooking = async (token, bookingId) => {
  if (!isBrowser) return false;

  const requestBody = {
    query: `
      mutation DeleteBooking($bookingId:ID!){
        deleteBooking(bookingId:$bookingId) {
          _id
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      bookingId
    }
  };

  try {
    const response = await fetch('https://katie-backend.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    if (!isResponseOk(response)) {
      throw new Error('Delete Booking Failed!');
    }

    const { data } = await response.json();

    if (!data) return false;
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}