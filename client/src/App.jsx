import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateForm from "./pages/CreateForm";
import FormDetail from "./pages/FormDetail";
import PublicForm from "./pages/PublicForm";
import SubmitSuccess from "./pages/SubmitSuccess";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/create" element={<CreateForm />} />
        <Route path="/dashboard/form/:formId" element={<FormDetail />} />
        <Route path="/form/:publicId" element={<PublicForm />} />
        <Route path="/submitted" element={<SubmitSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}