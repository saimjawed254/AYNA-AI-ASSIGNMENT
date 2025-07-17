import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/createform.mobile.css";
import "../styles/createform.desktop.css";
import { FaDeleteLeft } from "react-icons/fa6";

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
        if (!newQType) {
            alert("Please select a question type before adding.");
            return;
        }
        if (!newQText.trim()) {
            alert("Please write the question before adding.");
            return;
        }

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

    const handleDeleteOption = (idx) => {
        const updated = [...mcqOptions];
        updated.splice(idx, 1);
        setMcqOptions(updated);
    };


    return (
        <div className="create-container">
            <div className="create-builder">
                <div className="create-builder-header">Build your form here
                </div>
                <div className="create-builder-text">Real-time forms with zero friction. Built for control, designed for speed.</div>

                <div className="create-builder-form">
                    <div className="title-input-text">Enter Title for your form here</div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter form title"
                        className="title-input"
                    />

                    <div className="question-input-text">Add your questions here</div>

                    <button onClick={() => setShowBuilder(true)} className="add-btn">+ Add Question</button>

                    {showBuilder && (
                        <div className="question-builder">
                            <select className="question-builder-select" value={newQType} onChange={(e) => setNewQType(e.target.value)}>
                                <option value="" disabled hidden>
                                    Select question type
                                </option>
                                <option value="text">Input (Text)</option>
                                <option value="mcq">Multiple Choice (Single Answer)</option>
                            </select>


                            <input className="question-builder-input"
                                type="text"
                                value={newQText}
                                onChange={(e) => setNewQText(e.target.value)}
                                placeholder="Enter question"
                            />

                            {newQType === "mcq" && (
                                <div className="mcq-options">
                                    {mcqOptions.map((opt, idx) => (
                                        <div className="mcq-option" key={idx} style={{ display: "flex", alignItems: "center" }}>
                                            <input
                                                value={opt}
                                                onChange={(e) => handleOptionChange(e.target.value, idx)}
                                                placeholder={`Option ${idx + 1}`}
                                                style={{ flex: 1 }}
                                            />
                                            {mcqOptions.length > 1 && (
                                                <button className="option-delete"
                                                    onClick={() => handleDeleteOption(idx)}
                                                    title="Delete option"
                                                >
                                                    <FaDeleteLeft />
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button className="addoption-button" onClick={handleAddOption}>+ Add Option</button>
                                </div>
                            )}

                            <button className="addtoform-button" onClick={handleAddQuestion}>+ Add to Form</button>
                        </div>
                    )}

                    <button onClick={handleSubmit} className="create-submit-btn">Submit Form</button>
                </div>

            </div>

            <div className="create-preview">
                <div className="create-preview-header">Live Preview
                </div>
                <div className="create-preview-text">{title || "Form Title"}</div>
                <div className="create-preview-form">
                    <ul>
                        {questions.map((q, i) => (
                            <li key={i}>
                                <div className="create-preview-question" >
                                    <span>Q{i + 1}: {q.question}</span>
                                    <button onClick={() => handleDeleteQuestion(i)} style={{
                                        color: "red",
                                        marginLeft: "5vw",
                                        background: 'none',
                                        position: 'relative',
                                        transform: 'scale(2.5)',
                                    }}>
                                        <FaDeleteLeft />
                                    </button>
                                </div>

                                {q.type === "mcq" && (
                                    <ul className="mcq-preview">
                                        {q.options.map((opt, idx) => (
                                            <li key={idx} > {opt}</li>
                                        ))}
                                    </ul>
                                )}
                                {q.type === "text" && <p className="text-preview" ><em>Answer: __________</em></p>}
                            </li>
                        ))}

                    </ul>
                </div>

            </div>
        </div>
    );
}
