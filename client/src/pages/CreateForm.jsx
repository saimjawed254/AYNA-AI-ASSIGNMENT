import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/createform.mobile.css";
import "../styles/createform.desktop.css";

export default function CreateForm() {
    const navigate = useNavigate();
    const { token, isAuthenticated } = useAuth();
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [newQType, setNewQType] = useState("");
    const [newQText, setNewQText] = useState("");
    const [mcqOptions, setMcqOptions] = useState([""]);
    const [showBuilder, setShowBuilder] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) navigate("/");
    }, [isAuthenticated]);

    const handleAddOption = () => {
        setMcqOptions([...mcqOptions, ""]);
    };

    const handleOptionChange = (value, idx) => {
        const updated = [...mcqOptions];
        updated[idx] = value;
        setMcqOptions(updated);
    };

    const handleAddQuestion = () => {
        if (!newQText.trim()) return;

        const question = { type: newQType, question: newQText };
        if (newQType === "mcq") question.options = mcqOptions.filter(opt => opt.trim() !== "");

        setQuestions([...questions, question]);
        // Reset
        setNewQType("");
        setNewQText("");
        setMcqOptions([""]);
        setShowBuilder(false);
    };

    const handleDeleteQuestion = (index) => {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
    };


    const handleSubmit = async () => {
        if (!title || questions.length === 0) return alert("Please add title and at least one question.");

        try {
            await api.post("/forms", { title, questions }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Form created successfully!");
            window.location.href = "/dashboard";
        } catch (err) {
            alert("Failed to create form");
            console.error(err);
        }
    };

    return (
        <div className="create-container">
            <div className="create-builder">
                <h2>Build Your Form</h2>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter form title"
                    className="title-input"
                />

                <button onClick={() => setShowBuilder(true)} className="add-btn">+ Add Question</button>

                {showBuilder && (
                    <div className="question-builder">
                        <select value={newQType} onChange={(e) => setNewQType(e.target.value)}>
                            <option value="">Select question type</option>
                            <option value="text">Input (Text)</option>
                            <option value="mcq">Multiple Choice (Single Answer)</option>
                        </select>

                        <input
                            type="text"
                            value={newQText}
                            onChange={(e) => setNewQText(e.target.value)}
                            placeholder="Enter question"
                        />

                        {newQType === "mcq" && (
                            <div className="mcq-options">
                                {mcqOptions.map((opt, idx) => (
                                    <input
                                        key={idx}
                                        value={opt}
                                        onChange={(e) => handleOptionChange(e.target.value, idx)}
                                        placeholder={`Option ${idx + 1}`}
                                    />
                                ))}
                                <button onClick={handleAddOption}>+ Add Option</button>
                            </div>
                        )}

                        <button onClick={handleAddQuestion}>➕ Add to Form</button>
                    </div>
                )}

                <button onClick={handleSubmit} className="submit-btn">✅ Submit Form</button>
            </div>

            <div className="create-preview">
                <h3>Live Preview</h3>
                <h4>{title || "Form Title"}</h4>
                <ul>
                    {questions.map((q, i) => (
                        <li key={i}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <strong>Q{i + 1}: {q.question}</strong>
                                <button onClick={() => handleDeleteQuestion(i)} style={{ color: "red", marginLeft: "1rem" }}>🗑️</button>
                            </div>

                            {q.type === "mcq" && (
                                <ul>
                                    {q.options.map((opt, idx) => (
                                        <li key={idx}>◯ {opt}</li>
                                    ))}
                                </ul>
                            )}
                            {q.type === "text" && <p><em>Answer: __________</em></p>}
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
}
