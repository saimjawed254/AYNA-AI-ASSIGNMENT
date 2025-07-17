import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../utils/api";
import Sidebar from "../components/Sidebar";
import FormCard from "../components/FormCard";
import "../styles/dashboard.mobile.css";
import "../styles/dashboard.desktop.css";
import ActivityLineChart from "../components/ActivityLineChart";
import Last24HoursChart from "../components/Last24HoursChart";

export default function Dashboard() {
    const { token, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
    const [responses, setResponses] = useState([]);
    const [email, setEmail] = useState("");
    const [enrichedForms, setEnrichedForms] = useState([]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (!token) return;

        const fetchForms = async () => {
            try {
                const res = await api.get("/forms", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setForms(res.data);
            } catch (err) {
                console.error("Failed to fetch forms", err);
            }
        };

        const fetchResponses = async () => {
            try {
                const res = await api.get("/responses/all-dates", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setResponses(res.data);
            } catch (err) {
                console.error("Failed to fetch forms", err);
            }
        };

        const fetchProfile = () => {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setEmail(payload?.email || "Admin");
        };

        fetchForms();
        fetchResponses();
        fetchProfile();
    }, [token]);

    useEffect(() => {
        if (forms.length === 0 || responses.length === 0) return;

        const responseMap = new Map();
        responses.forEach(({ formId }) => {
            responseMap.set(formId, (responseMap.get(formId) || 0) + 1);
        });

        const combined = forms.map((form) => ({
            ...form,
            totalResponses: responseMap.get(form._id) || 0,
        }));

        setEnrichedForms(combined);
    }, [forms, responses]);

    const handleDeleteForm = async (formId) => {
        try {
            await api.delete(`/forms/${formId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setForms(forms.filter((f) => f._id !== formId));
        } catch (err) {
            alert("Failed to delete form");
            console.error(err);
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar email={email} totalForms={forms.length} />
            <div className="dashboard-header">
                <div className="dashboard-heading">Dashboard
                    <span className="dashboard-text"><br />Below is a list of all your forms</span>
                </div>
                <a href="/dashboard/create" className="create-btn">+ Create New Form</a>
            </div>
            <div className="dashboard-stats">
                <div className="dashboard-box">
                    <div className="dashboard-box-content">
                        <div className="dashboard-box-heading">Total Forms</div>
                        <div className="dashboard-box-number">{forms.length}</div>
                        <div className="dashboard-box-text">Your data is secure in our database</div>
                    </div>
                </div>
                <div className="dashboard-box">
                    <div className="dashboard-box-content">
                        <div className="dashboard-box-heading">Total Responses</div>
                        <div className="dashboard-box-number">{responses.length}</div>
                        <div className="dashboard-box-text">Click on the respective forms to view the responses</div>
                    </div>
                </div>
                <div className="dashboard-box">
                    <ActivityLineChart />
                </div>
                <div className="dashboard-box">
                      <Last24HoursChart />
                </div>
            </div>
            <div className="dashboard-main">
                <div className="dashboard-main-header">
                    <div className="dashboard-main-header-item">Title</div>
                    <div className="dashboard-main-header-item">Public Id</div>
                    <div className="dashboard-main-header-item">Responses</div>
                    <div className="dashboard-main-header-item">Share Link</div>
                    <div className="dashboard-main-header-item">Delete</div>
                </div>
                <div className="form-grid">
                    {enrichedForms.map((form) => (
                        <FormCard key={form._id} form={form} onDelete={handleDeleteForm} />
                    ))}
                </div>
            </div>
        </div>
    );
}
