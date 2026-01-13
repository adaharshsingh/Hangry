import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import ChooseRegister from '../pages/auth/ChooseRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import Saved from '../pages/general/Saved';
import UserProfile from '../pages/general/UserProfile';
import CreateFood from '../pages/food-partner/CreateFood';
import EditFood from '../pages/food-partner/EditFood';
import Profile from '../pages/food-partner/Profile';
import FoodPartnerProfile from '../pages/food-partner/FoodPartnerProfile';
import Landing from '../pages/Landing';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthGuard from '../components/AuthGuard'
import { useDisableScroll } from '../hooks/useDisableScroll'
import { useAuth } from '../contexts/AuthContext'

const AppRoutes = () => {
    useDisableScroll()
    const { isAuthenticated, userType } = useAuth()

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/choose" element={<AuthGuard protectAuthPages={true}><ChooseRegister /></AuthGuard>} />
            <Route path="/user/register" element={<AuthGuard protectAuthPages={true}><UserRegister /></AuthGuard>} />
            <Route path="/user/login" element={<AuthGuard protectAuthPages={true}><UserLogin /></AuthGuard>} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/food/register" element={<AuthGuard protectAuthPages={true}><FoodPartnerRegister /></AuthGuard>} />
            <Route path="/food/login" element={<AuthGuard protectAuthPages={true}><FoodPartnerLogin /></AuthGuard>} />
            <Route path="/food/profile" element={<FoodPartnerProfile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/create-food" element={<ProtectedRoute><CreateFood /></ProtectedRoute>} />
            <Route path="/edit-food/:id" element={<ProtectedRoute><EditFood /></ProtectedRoute>} />
            <Route path="/food/:id" element={<Profile />} />
        </Routes>
    )
}

export default AppRoutes