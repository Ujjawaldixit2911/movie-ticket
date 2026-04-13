const TrailerModal = ({ isOpen, onClose, trailerUrl }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <iframe
          width="100%"
          height="400"
          src={trailerUrl}
          title="Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
