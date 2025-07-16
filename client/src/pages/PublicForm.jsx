import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/publicform.mobile.css";
import "../styles/publicform.desktop.css";

export default function PublicForm() {
  const { publicId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await api.get(`/forms/public/${publicId}`);
        setForm(res.data);
        setAnswers(Array(res.data.questions.length).fill(""));
      } catch (err) {
        alert("Form not found.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [publicId]);

  const handleChange = (val, idx) => {
    const updated = [...answers];
    updated[idx] = val;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    try {
      await api.post(`/forms/${publicId}/submit`, { answers });
      navigate("/submitted");
    } catch (err) {
      alert("Submission failed. Please check all answers.");
      console.error(err);
    }
  };

  if (loading) return <p>Loading form...</p>;
  if (!form) return <p>Form not found</p>;

  return (
    <div className="public-form-container">
      <h2>{form.title}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {form.questions.map((q, i) => (
          <div key={i} className="form-question">
            <label><strong>Q{i + 1}:</strong> {q.question}</label>

            {q.type === "text" && (
              <input
                type="text"
                value={answers[i]}
                onChange={(e) => handleChange(e.target.value, i)}
                required
              />
            )}

            {q.type === "mcq" && (
              <select
                value={answers[i]}
                onChange={(e) => handleChange(e.target.value, i)}
                required
              >
                <option value="">-- Select an option --</option>
                {q.options.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            )}
          </div>
        ))}

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Response
        </button>
      </form>
    </div>
  );
}
