import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InventarisAset from './pages/InventarisAset';
import MutasiAset from './pages/MutasiAset';
import Barcode from './pages/Barcode';
import Laporan from './pages/Laporan';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/asets"
            element={
              <ProtectedRoute>
                <Layout>
                  <InventarisAset />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mutasi"
            element={
              <ProtectedRoute>
                <Layout>
                  <MutasiAset />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/barcode"
            element={
              <ProtectedRoute>
                <Layout>
                  <Barcode />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/laporan"
            element={
              <ProtectedRoute>
                <Layout>
                  <Laporan />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
