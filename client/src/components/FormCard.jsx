import { useNavigate } from "react-router-dom";

export default function FormCard({ form, onDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/form/${form._id}`);
  };

  const handleShare = () => {
    const link = `${window.location.origin}/form/${form.publicId}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="form-card">
      <div onClick={handleClick} className="form-card-item">{form.title}</div>
      <div className="form-card-item">Title</div>
      <div className="form-card-item">Title</div>
      <div className="form-card-item">
        <button
          onClick={handleShare}
          className="form-share-button"
        >
          🔗 Share
        </button>
      </div>
      <div className="form-card-item">
        <button
          onClick={() => {
            const confirmed = window.confirm("Are you sure you want to delete this form?");
            if (confirmed) onDelete(form._id);
          }}
          className="form-delete-button"
        >
          🗑 Delete
        </button>
      </div>
      {/* <h3 onClick={handleClick} style={{ cursor: "pointer" }}>{form.title}</h3>
      <p>Created: {new Date(form.createdAt).toLocaleDateString()}</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
        <button
          onClick={handleShare}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          🔗 Share
        </button>

        <button
          onClick={() => {
            const confirmed = window.confirm("Are you sure you want to delete this form?");
            if (confirmed) onDelete(form._id);
          }}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          🗑 Delete
        </button>
      </div> */}
    </div>
  );
}
