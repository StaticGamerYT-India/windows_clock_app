import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import { useToast } from '../components/UI/Toast'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [remember, setRemember] = useState(false)
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Form validation
    if (!email.trim()) {
      showToast('Please enter your email address', { type: 'error' })
      setIsLoading(false)
      return
    }
    
    if (!password) {
      showToast('Please enter your password', { type: 'error' })
      setIsLoading(false)
      return
    }
    
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false)
      showToast('Successfully signed in!', { type: 'success' })
      
      // For demo purposes, redirect to home after "signin"
      setTimeout(() => navigate('/'), 500)
    }, 1500)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-80px)] p-4"
    >
      <div className="w-full max-w-sm">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-mica-component backdrop-blur-mica rounded-xl p-6 border border-[#333] shadow-lg"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  type="checkbox" 
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-600 bg-[#2a2a2a] text-customColor-blue focus:ring-customColor-blue"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-customColor-blue hover:text-blue-400 transition-colors">Forgot password?</a>
              </div>
            </div>
            <Button 
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              className="mt-2"
            >
              Sign In
            </Button>
          </form>
        </motion.div>
        <div className="mt-4 text-center">
          <span className="text-gray-400">Don't have an account?</span>
          <Link to="/signin" className="ml-1 text-customColor-blue hover:text-blue-400 transition-colors">
            Create one
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Signin