const SeatLayout = ({ seats, selectedSeats, onSelect }) => {
  return (
    <div>
      <div className="screen">SCREEN THIS WAY</div>
      <div className="seat-grid">
        {seats.map((seat) => {
          const selected = selectedSeats.includes(seat.seatNumber);
          return (
            <button
              key={seat.seatNumber}
              className={`seat ${seat.type.toLowerCase()} ${seat.isBooked ? 'booked' : ''} ${selected ? 'selected' : ''}`}
              disabled={seat.isBooked}
              onClick={() => onSelect(seat)}
            >
              {seat.seatNumber}
            </button>
          );
        })}
      </div>
      <div className="seat-legend">
        <span><i className="legend silver"></i>Silver</span>
        <span><i className="legend gold"></i>Gold</span>
        <span><i className="legend platinum"></i>Platinum</span>
        <span><i className="legend selected"></i>Selected</span>
        <span><i className="legend booked"></i>Booked</span>
      </div>
    </div>
  );
};

export default SeatLayout;
