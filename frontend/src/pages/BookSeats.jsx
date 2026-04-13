import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movies } from "../assets/data";

const seats = [
  "A1", "A2", "A3", "A4",
  "B1", "B2", "B3", "B4",
  "C1", "C2", "C3", "C4",
  "D1", "D2", "D3", "D4"
];

const BookSeats = () => {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState("7:30 PM");

  const movie = useMemo(() => {
    return movies.find((item) => String(item.id) === String(showId));
  }, [showId]);

  const totalAmount = useMemo(() => {
    return selectedSeats.length * (movie?.price || 0);
  }, [selectedSeats, movie]);

  const handleSeatSelect = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const goCheckout = () => {
    if (!selectedSeats.length) {
      alert("Please select at least one seat");
      return;
    }

    navigate("/checkout", {
      state: {
        show: {
          showDate: selectedDate,
          showTime: selectedTime,
          price: movie.price,
        },
        movie,
        selectedSeats,
      },
    });
  };

  if (!movie) return <div className="section">Movie not found.</div>;

  return (
    <section className="section narrow-top">
      <div className="section-head">
        <h2>{movie.title}</h2>
      </div>

      <p className="muted">
        {movie.genre} • {movie.duration} • {movie.language}
      </p>

      <div className="booking-layout">
        <div className="glass panel">
          <h3>Select Date</h3>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              marginTop: "12px",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "#111827",
              color: "white",
            }}
          />

          <h3 style={{ marginTop: "20px" }}>Select Time</h3>
          <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
            {["10:00 AM", "2:00 PM", "7:30 PM", "10:30 PM"].map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className="btn"
                style={{
                  background: selectedTime === time ? "#dc2626" : "#1f2937",
                  color: "white",
                  borderRadius: "10px",
                  padding: "10px 16px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {time}
              </button>
            ))}
          </div>

          <h3 style={{ marginTop: "24px" }}>Select Seats</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 70px)",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            {seats.map((seat) => {
              const isSelected = selectedSeats.includes(seat);

              return (
                <button
                  key={seat}
                  onClick={() => handleSeatSelect(seat)}
                  className="btn"
                  style={{
                    background: isSelected ? "#dc2626" : "#1f2937",
                    color: "white",
                    borderRadius: "10px",
                    padding: "14px 0",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="glass panel">
            <h3>Booking Summary</h3>
            <p><strong>Movie:</strong> {movie.title}</p>
            <p><strong>Date:</strong> {selectedDate}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Ticket Price:</strong> ₹{movie.price}</p>
            <p><strong>Selected Seats:</strong> {selectedSeats.join(", ") || "None"}</p>
            <p><strong>Total:</strong> ₹{totalAmount}</p>
          </div>

          <button
            className="btn btn-primary w-full"
            disabled={!selectedSeats.length}
            onClick={goCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookSeats;