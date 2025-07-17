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

  useEffect(() => {
    const el = document.querySelectorAll('.form-textarea');
    el.forEach((ta) => {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    });
  }, [answers]);


  const handleChange = (val, idx) => {
    const updated = [...answers];
    updated[idx] = val;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    // Check if any answer is empty
    const isIncomplete = answers.some(ans => ans.trim() === "");

    if (isIncomplete) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      await api.post(`/forms/${publicId}/submit`, { answers });
      navigate("/submitted");
    } catch (err) {
      alert("Submission failed. Please try again.");
      console.error(err);
    }
  };

  const handleClearAll = () => {
    setAnswers(Array(form.questions.length).fill(""));
  };

  if (loading) return <p>Loading form...</p>;
  if (!form) return <p>Form not found</p>;

  return (
    <>
      <div className="public-form">
        <div className="public-form-container">
          <div className="public-form-header">Feedback form
            <span className="public-form-title"><br />{form.title}</span>
          </div>
          <div className="public-form-content">
            <form onSubmit={(e) => e.preventDefault()}>
              {form.questions.map((q, i) => (
                <div key={i} className="form-question">
                  <label style={{
                    fontSize: '1.25vw',
                    fontWeight: '500',
                    marginTop: '1vw'
                  }}><span>Q{i + 1}:</span> {q.question}</label>

                  {q.type === "text" && (
                    <textarea
                      value={answers[i]}
                      onChange={(e) => handleChange(e.target.value, i)}
                      placeholder="Your answer"
                      required
                      className="form-textarea"
                      rows={1}

                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                        }
                      }}
                    />

                  )}

                  {q.type === "mcq" && (
                    <div className="public-form-mcq-options">
                      {q.options.map((opt, idx) => (
                        <label key={idx} className="radio-option">
                          <input
                            type="radio"
                            name={`question-${i}`}
                            value={opt}
                            checked={answers[i] === opt}
                            onChange={() => handleChange(opt, i)}
                            required
                          />
                          <span className="custom-radio"></span>
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}


                </div>
              ))}
              <div className="form-buttons">
                <button
                  type="button"
                  className="clear-btn"
                  onClick={handleClearAll}
                >
                  Clear All
                </button>

                <button className="submit-btn" onClick={handleSubmit}>
                  Submit Response
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
