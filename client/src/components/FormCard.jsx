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
      <div className="form-card-item">{form.publicId}</div>
      <div className="form-card-item">{form.totalResponses}</div>
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
    </div>
  );
}
