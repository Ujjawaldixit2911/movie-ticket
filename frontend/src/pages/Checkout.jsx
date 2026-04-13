import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div className="section">No booking data found.</div>;
  }

  const { show, movie, selectedSeats } = state;

  const total = selectedSeats.length * (movie.price || show.price || 0);

  const confirmBooking = () => {
    const existingBookings =
      JSON.parse(localStorage.getItem("myBookings")) || [];

    const newBooking = {
      id: Date.now(),
      movieTitle: movie.title,
      moviePoster: movie.poster,
      showDate: show.showDate,
      showTime: show.showTime,
      seats: selectedSeats,
      total,
      status: "Confirmed",
      bookedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "myBookings",
      JSON.stringify([...existingBookings, newBooking])
    );

    alert("Booking Confirmed!");
    navigate("/my-bookings");
  };

  return (
    <section className="section narrow-top">
      <div className="checkout-card glass">
        <h1>Checkout</h1>

        <p className="muted">{movie.title}</p>
        <p className="muted">
          {new Date(show.showDate).toDateString()} • {show.showTime}
        </p>

        <div className="summary-list">
          {selectedSeats.map((seat) => (
            <div key={seat} className="summary-item">
              <span>{seat}</span>
              <span>₹{movie.price}</span>
            </div>
          ))}
        </div>

        <div className="summary-total">
          <span>Total</span>
          <strong>₹{total}</strong>
        </div>

        <button className="btn btn-primary w-full" onClick={confirmBooking}>
          Confirm Booking
        </button>
      </div>
    </section>
  );
};

export default Checkout;