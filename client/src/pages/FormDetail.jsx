import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import "../styles/formdetail.mobile.css";
import "../styles/formdetail.desktop.css";

export default function FormDetail() {
    const { formId } = useParams();
    const { token, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [formTitle, setFormTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [summary, setSummary] = useState([]);

    useEffect(() => {
        if (!isAuthenticated) navigate("/");

        const fetchData = async () => {
            try {
                const res = await api.get(`/forms/${formId}/responses`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setResponses(res.data.responses);
                setSummary(res.data.summary);
                setFormTitle(res.data.title || "Untitled Form");
                setQuestions(res.data.questions || []);
            } catch (err) {
                console.error("Failed to load form responses", err);
            }
        };

        fetchData();
    }, [formId]);

    const handleDeleteResponse = async (responseId) => {
        const confirm = window.confirm("Are you sure you want to delete this response?");
        if (!confirm) return;

        try {
            await api.delete(`/responses/${responseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // remove it from local state
            setResponses(responses.filter((r) => r._id !== responseId));
        } catch (err) {
            alert("Failed to delete response");
            console.error(err);
        }
    };

    const downloadCSV = () => {

        console.log(responses)
        if (responses?.length === 0 || questions?.length === 0) {
            alert("No data to export.");
            return;
        }

        // 1. Generate headers
        const headers = questions.map((q, i) => `Q${i + 1}: ${q.question}`);
        headers.push("Submitted At");

        // 2. Generate rows
        const rows = responses.map((r) => {
            const row = [...r.answers];
            row.push(new Date(r.submittedAt).toLocaleString());
            return row;
        });

        // 3. Combine into CSV string
        const csvContent = [
            headers.join(","),
            ...rows.map((r) => r.map((cell) => `"${cell}"`).join(","))
        ].join("\n");

        // 4. Trigger download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${formTitle.replace(/\s+/g, "_")}_responses.csv`;
        link.click();
    };

    return (
        <div className="form-detail-container">
            <h2>{formTitle}</h2>
            <p>Total Responses: {responses.length}</p>

            <div className="summary-section">
                <h3>Summary (MCQs)</h3>
                {summary?.length === 0 && <p>No MCQs in this form.</p>}
                {summary?.map((q, i) => (
                    <div key={i} className="summary-card">
                        <strong>{q.question}</strong>
                        <ul>
                            {Object.entries(q.stats).map(([opt, count], idx) => (
                                <li key={idx}>{opt}: {count}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button onClick={downloadCSV} className="csv-btn">
                📤 Download CSV
            </button>
            <div className="responses-section">
                <h3>Raw Responses</h3>
                {responses.map((r, i) => (
                    <div key={r._id} className="response-card">
                        {r.answers.map((ans, idx) => (
                            <p key={idx}>
                                <strong>Q{idx + 1}:</strong> {ans}
                            </p>
                        ))}
                        <small>Submitted: {new Date(r.submittedAt).toLocaleString()}</small>

                        {/* 🗑 Delete Button */}
                        <button
                            style={{ marginTop: "0.5rem", color: "white", backgroundColor: "red", border: "none", padding: "6px", borderRadius: "4px" }}
                            onClick={() => handleDeleteResponse(r._id)}
                        >
                            Delete Response
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
}
