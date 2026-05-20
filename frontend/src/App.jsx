import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Layout from "./Components/Layout"
import Home from "./Components/Home"
import Contact from "./Components/Contact"
import Terms from "./Components/Terms"
import Privacy from "./Components/Privacy"
import ScrollToTop from "./Components/ScrollToTop"

import Profile from "./pages/Profile"
import Leaderboard from "./pages/Leaderboard"
import CategorySelection from "./pages/CategorySelection"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PlayQuiz from "./pages/PlayQuiz"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/Dashboard"
import Categories from "./pages/admin/Categories"
import { Questions } from "./pages/admin/Questions"
import { Quizzes } from "./pages/admin/Quizzes"
import Users from "./pages/admin/Users"
import AdminLayout from "./Components/AdminLayout"
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute"
import DeleteAccount from "./Components/DeleteAccount"

// import PrivateRoute from "./PrivateRoute"

function App() {


    
  
  return (
    <Router>
      <ScrollToTop>
      <Routes>


        {/* Public Website Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          {/* <Route path="ContactAdmin" element={<ContactAdmin />} /> */}
          <Route path="Profile" element={<Profile />} />
          <Route path="Leaderboard" element={<Leaderboard/>} />
          <Route path="Categories" element={<CategorySelection/>} />
          <Route path="Login" element={<Login/>} />
          <Route path="Register" element={<Register/>} />
          <Route path="DeleteAccount" element={<DeleteAccount/>} />
          <Route path="admin" element={<AdminLogin/>} />
          
          <Route path="/play/:categoryId" element={<PlayQuiz />} />
        </Route>

        {/* Admin Routes */}
        <Route path="admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="questions" element={<ProtectedAdminRoute><Questions /></ProtectedAdminRoute>} />
          <Route path="categories" element={<ProtectedAdminRoute><Categories /></ProtectedAdminRoute>} />
          <Route path="users" element={<ProtectedAdminRoute><Users /></ProtectedAdminRoute>} />
          <Route path="quizzes" element={<ProtectedAdminRoute><Quizzes /></ProtectedAdminRoute>} />
        </Route>
      </Routes>
      </ScrollToTop>
    </Router>
  )
}

export default App
