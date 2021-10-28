import React from 'react';

import View from './View';
import Modal from './Modal';
import BackDrop from './BackDrop';
import AuthContext from '../context/auth-context';
import BookingsList from './Bookings/BookingsList';
import Spinner from './Spinner';
import CustomSwitch from './CustomSwitch';
import CreateBookingButton from './Buttons/CreateBooking';
// import AddBookingForm from './Form/AddBooking';
import { createBooking, deleteBooking, fetchBookings, confirmBooking } from '../utils/bookings.js';

class Bookings extends React.Component {
  static contextType = AuthContext;
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      phone: '',
      email: '',
      date: '',
      service: '',
      comment: '',
      confirmed: '',
      
      creating: false,
      bookings: [],
      isLoading: false,
      selectedBooking: false,
      deleting: false,
      checked: false,
      startDate: new Date(),
      endDate: new Date(),
    }

    // this.handleUpdate = this.handleUpdate.bind(this);
    // this.onConfirmCreateBooking = this.onConfirmCreateBooking.bind(this);
    this.confirmBookingHandler = this.confirmBookingHandler.bind(this);
    this.confirmDeletionHandler = this.confirmDeletionHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getBookings(false);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  startCreateBookingHandler = () => {
    this.setState({ creating: true });
  }

  onCancelAction = () => {
    this.setState({ creating: false, selectedBooking: null, deleting: false });
  }

  sortBookingsByDate(bookings) {
    bookings.sort(function(a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    return bookings;
  }

  getBookings = async (filterConfirmed = false) => {
    this.setState({ isLoading: true });

    let bookings = await fetchBookings(filterConfirmed);

    if (!bookings) {
      this.setState({ isLoading: false });
      return;
    }

    bookings = this.sortBookingsByDate(bookings);

    this.setState({ bookings, isLoading: false });
  }

  // handleUpdate(booking){
  //   // this.setState({
  //   //   // [booking.target.name]: booking.target.value,
  //   // });
  //   this.getBookings();
  // }

  handleDateChange = date => {
    this.setState({
      endDate: date,
      date: date.toISOString(),
    });
  };

  showDetailHandler = bookingId => {
    this.setState(prevState => {
      const selectedBooking = prevState.bookings.find(e => e._id === bookingId);
      return { selectedBooking: selectedBooking };
    })
  };

  showDeletionHandler = bookingId => {
    this.setState(prevState => {
      const selectedBooking = prevState.bookings.find(e => e._id === bookingId);
      return { selectedBooking: selectedBooking, deleting: true };
    })
  };

  async confirmDeletionHandler() {
    const { token } = this.context;
    if (!token) {
      this.setState({ selectedBooking: null });
      return;
    }
    const selectedBookingId = this.state.selectedBooking._id;
    const response = await deleteBooking(token, selectedBookingId);

    if (!response) return;

    this.setState({ creating: false, selectedBooking: null, deleting: false });
    this.getBookings();
  }

  async confirmBookingHandler() {
    const { token } = this.context;
    if (!token) {
      this.setState({ selectedBooking: null });
      return;
    }
    const selectedBookingId = this.state.selectedBooking._id;
    const response = await confirmBooking(token, selectedBookingId);

    if (!response) return;

    this.setState({ selectedBooking: null });
    this.getBookings();
  }

  handleChange(checked) {
    this.setState({ checked });
    this.getBookings(checked);
  }

  render() {
    return (
      <View title="Bookings">
        <CustomSwitch
          onChange={this.handleChange}
          checked={this.state.checked}
        />
        {this.state.selectedBooking &&
          <Modal
            title={this.state.selectedBooking.fullname}
            canCancel
            canConfirm
            onCancel={this.onCancelAction}
            onConfirm={this.confirmBookingHandler}
            confirmText={this.context.token ? "Confirm This Booking" : "Confirm"}
          >
            <h2>{this.state.selectedBooking.service} - {new Date(this.state.selectedBooking.date).toLocaleDateString()}</h2>
            <p>{this.state.selectedBooking.phone}</p>
            <p>{this.state.selectedBooking.email}</p>
            <p>{this.state.selectedBooking.comment}</p>
          </Modal>
        }
        {this.state.deleting &&
          <Modal
            title={this.state.selectedBooking.fullname}
            canCancel
            canConfirm
            onCancel={this.onCancelAction}
            onConfirm={this.confirmDeletionHandler}
            confirmText={this.context.token ? "Delete This Booking" : "Confirm"}
          >
            <h2>{this.state.selectedBooking.service} - {new Date(this.state.selectedBooking.date).toLocaleDateString()}</h2>
            <p>{this.state.selectedBooking.phone}</p>
            <p>{this.state.selectedBooking.email}</p>
            <p>{this.state.selectedBooking.comment}</p>
          </Modal>
        }
        {/* {this.context.token && (
          <CreateBookingButton
            buttonText={`New Booking`} onClick={this.startCreateBookingHandler}
          />
        )} */}

        {this.state.isLoading
          ? <Spinner />
          : (
            <BookingsList
              bookings={this.state.bookings}
              authUserId={this.context.userId + ""}
              onViewDetail={this.showDetailHandler}
              onDeleteDetail={this.showDeletionHandler}
            />
          )
        }
      </View>
    );
  }
}

export default Bookings;
