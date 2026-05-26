import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import client from "./services/apolloClient";
import { DashboardProvider } from "./context/DashboardContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <DashboardProvider>
        <BrowserRouter>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      </DashboardProvider>
    </ApolloProvider>
  );
}
