import { getSeatPrice } from '../utils/priceHelper';

const BookingSummary = ({ show, selectedSeatObjects }) => {
  const total = selectedSeatObjects.reduce((sum, seat) => sum + getSeatPrice(seat.type, show?.basePrices), 0);

  return (
    <div className="summary-card glass">
      <h3>Booking Summary</h3>
      <div className="summary-list">
        {selectedSeatObjects.map((seat) => (
          <div key={seat.seatNumber} className="summary-item">
            <span>{seat.seatNumber} ({seat.type})</span>
            <span>₹{getSeatPrice(seat.type, show?.basePrices)}</span>
          </div>
        ))}
      </div>
      <div className="summary-total">
        <span>Total</span>
        <strong>₹{total}</strong>
      </div>
    </div>
  );
};

export default BookingSummary;
