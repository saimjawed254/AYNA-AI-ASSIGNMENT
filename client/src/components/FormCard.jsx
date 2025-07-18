import { useNavigate } from "react-router-dom";

export default function FormCard({ form, onDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/form/${form._id}`);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Fill this form out!`,
      text: `${form.title}`,
      url: `${window.location.origin}/form/${form.publicId}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    }
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
