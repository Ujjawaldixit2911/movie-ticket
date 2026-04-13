import { useMemo, useState } from "react";
import BookingTabs from "../components/BookingTabs";

const MyBookings = () => {
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("myBookings")) || []
  );
  const [activeTab, setActiveTab] = useState("upcoming");

  const isUpcomingShow = (showDate) => {
    const today = new Date();
    const bookingDate = new Date(showDate);

    today.setHours(0, 0, 0, 0);
    bookingDate.setHours(0, 0, 0, 0);

    return bookingDate >= today;
  };

  const formatPrettyDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const upcoming = isUpcomingShow(booking.showDate);
      return activeTab === "upcoming" ? upcoming : !upcoming;
    });
  }, [bookings, activeTab]);

  const cancelBooking = (id) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id
        ? { ...booking, status: "Cancelled" }
        : booking
    );

    setBookings(updatedBookings);
    localStorage.setItem("myBookings", JSON.stringify(updatedBookings));
  };

  return (
    <section className="section narrow-top">
      <div className="section-head">
        <h2>My Bookings</h2>
      </div>

      <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="list-stack">
        {filteredBookings.map((booking) => {
          const canCancel =
            booking.status === "Confirmed" && isUpcomingShow(booking.showDate);

          return (
            <div className="glass booking-card" key={booking.id}>
              <div>
                <h3>{booking.movieTitle}</h3>
                <p className="muted">
                  {formatPrettyDate(booking.showDate)} • {booking.showTime}
                </p>
                <p className="muted">Seats: {booking.seats.join(", ")}</p>
                <p className="muted">Total: ₹{booking.total}</p>
              </div>

              <div className="booking-actions">
                <span
                  className={`status ${
                    booking.status === "Confirmed"
                      ? "confirmed"
                      : "cancelled"
                  }`}
                >
                  {booking.status}
                </span>

                {canCancel && (
                  <button
                    className="btn btn-outline"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filteredBookings.length === 0 && (
          <div className="glass panel">
            No {activeTab} bookings found.
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBookings;