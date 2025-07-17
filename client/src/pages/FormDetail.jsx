import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import "../styles/formdetail.mobile.css";
import "../styles/formdetail.desktop.css";
import ResponsesLast24HoursChart from "../components/ResponsesLast24HoursChart";
import ResponsesPerDayChart from "../components/ResponsesPerDayChart";

export default function FormDetail() {
    const { formId } = useParams();
    const { token, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [formTitle, setFormTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [summary, setSummary] = useState([]);
    const [last24HourCount, setLast24HourCount] = useState(0);

    useEffect(() => {
        const now = new Date();
        const recent = responses.filter((r) => {
            const submitted = new Date(r.submittedAt);
            return submitted >= new Date(now.getTime() - 24 * 60 * 60 * 1000);
        });
        setLast24HourCount(recent.length);
    }, [responses]);

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

            setResponses(responses.filter((r) => r._id !== responseId));
        } catch (err) {
            alert("Failed to delete response");
            console.error(err);
        }
    };

    const downloadCSV = () => {
        if (responses?.length === 0 || questions?.length === 0) {
            alert("No data to export.");
            return;
        }

        const headers = questions.map((q, i) => `Q${i + 1}: ${q.question}`);
        headers.push("Submitted At");

        const rows = responses.map((r) => {
            const row = [...r.answers];
            row.push(new Date(r.submittedAt).toLocaleString());
            return row;
        });

        const csvContent = [
            headers.join(","),
            ...rows.map((r) => r.map((cell) => `"${cell}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${formTitle.replace(/\s+/g, "_")}_responses.csv`;
        link.click();
    };

    return (
        <div className="form-detail-container">
            <div className="stats-sidebar">
                <div className="stats-sidebar-box">
                    <div className="stats-sidebar-box-content">
                        <div className="stats-sidebar-box-heading">Total Responses</div>
                        <div className="stats-sidebar-box-number">{responses.length}</div>
                        <div className="stats-sidebar-box-text">Your data is secure in our database</div>
                    </div>
                </div>
                <div className="stats-sidebar-box">
                    <div style={{
                        color: "#008cff"
                    }} className="stats-sidebar-box-content">
                        <div className="stats-sidebar-box-heading">Last 24 hours</div>
                        <div className="stats-sidebar-box-number">{last24HourCount}</div>
                        <div style={{
                            color: "#000"
                        }} className="stats-sidebar-box-text">Your form has {last24HourCount} new responses in the last 24 hours</div>
                    </div>
                </div>
                <div className="stats-sidebar-box">
                    <ResponsesPerDayChart responses={responses} formId={formId} />
                </div>
                <div className="stats-sidebar-box">
                    <ResponsesLast24HoursChart responses={responses} formId={formId} />
                </div>
            </div>

            <div className="view-title">
                <div style={{
                    width: "82.5%"
                }}>
                    {formTitle}
                </div>
                <button onClick={downloadCSV} className="csv-btn">
                    📤 Export to CSV
                </button>
            </div>

            <div className="tabular">
                <table className="tabular-table">
                    <thead>
                        <tr>
                            <th>Response Id</th>
                            {questions.map((q, i) => (
                                <th key={i}>Q{i + 1}</th>
                            ))}
                            <th>Submitted&nbsp;At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responses.map((r) => (
                            <tr key={r._id}>
                                <td>{r._id}</td>
                                {r.answers.map((ans, idx) => (
                                    <td key={idx}>{ans}</td>
                                ))}
                                <td>{new Date(r.submittedAt).toLocaleString()}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteResponse(r._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="raw">
                <div className="raw-header">Raw JSON Data</div>
                <pre style={{ background: "#fff", padding: "1vw", marginTop: "1vw", overflowX: "auto", borderRadius: '1vw' }}>
                    {JSON.stringify(responses, null, 2)}
                </pre>
            </div>


        </div>
    );
}