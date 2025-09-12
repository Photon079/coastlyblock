import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  UserPlus, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Shield,
  User,
  Wallet,
  Building,
  Mail,
  Phone,
  MapPin,
  FileText,
  ArrowLeft
} from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
  onRegistrationSuccess: () => void;
}

export function RegistrationModal({ 
  isOpen, 
  onClose, 
  onBackToLogin,
  onRegistrationSuccess 
}: RegistrationModalProps) {
  const [registrationStep, setRegistrationStep] = useState<'role' | 'details' | 'verification'>('role');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'ngo' | 'investor' | ''>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    
    // Organization Info (for NGO/Admin)
    organizationName: '',
    organizationType: '',
    registrationNumber: '',
    address: '',
    
    // Investment Info (for Investor)
    investmentCapacity: '',
    interests: '',
    
    // Additional
    description: '',
    website: '',
    documents: []
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'from-blue-500 to-indigo-500';
      case 'ngo': return 'from-emerald-500 to-teal-500';
      case 'investor': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-6 h-6" />;
      case 'ngo': return <User className="w-6 h-6" />;
      case 'investor': return <Wallet className="w-6 h-6" />;
      default: return null;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'admin': 
        return 'Government officials responsible for verifying and approving forest restoration projects';
      case 'ngo': 
        return 'Non-profit organizations implementing forest restoration and conservation projects';
      case 'investor': 
        return 'Individuals or organizations investing in carbon credits and restoration projects';
      default: return '';
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Basic validation
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Role-specific validation
    if (selectedRole === 'ngo' || selectedRole === 'admin') {
      if (!formData.organizationName) newErrors.organizationName = 'Organization name is required';
      if (!formData.organizationType) newErrors.organizationType = 'Organization type is required';
    }

    if (selectedRole === 'investor') {
      if (!formData.investmentCapacity) newErrors.investmentCapacity = 'Investment capacity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRoleSelect = (role: 'admin' | 'ngo' | 'investor') => {
    setSelectedRole(role);
    setRegistrationStep('details');
  };

  const handleSubmitRegistration = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Mock registration process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock success
      setRegistrationStep('verification');
      
      // Auto-complete after verification step
      setTimeout(() => {
        onRegistrationSuccess();
      }, 3000);

    } catch (error: any) {
      setErrors({ submit: error.message || 'Registration failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setRegistrationStep('role');
    setSelectedRole('');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
      organizationName: '',
      organizationType: '',
      registrationNumber: '',
      address: '',
      investmentCapacity: '',
      interests: '',
      description: '',
      website: '',
      documents: []
    });
    setErrors({});
    setIsSubmitting(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl text-white mb-2">Join Forest Guardian</h2>
            <p className="text-white/70 text-sm">Create your account to access the platform</p>
          </div>

          {/* Step 1: Role Selection */}
          {registrationStep === 'role' && (
            <div className="space-y-6">
              <h3 className="text-xl text-white text-center mb-6">Select Your Role</h3>
              
              <div className="space-y-4">
                {(['admin', 'ngo', 'investor'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-6 transition-all duration-300 text-left"
                  >
                    <div className="flex items-start">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getRoleColor(role)} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                        {getRoleIcon(role)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white text-lg mb-2 capitalize">{role === 'ngo' ? 'NGO' : role}</h4>
                        <p className="text-white/70 text-sm">{getRoleDescription(role)}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <button 
                  onClick={onBackToLogin}
                  className="text-blue-400 hover:text-blue-300 text-sm underline flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Details Form */}
          {registrationStep === 'details' && (
            <div className="space-y-6">
              {/* Role Badge */}
              <div className="flex items-center justify-between mb-6">
                <Badge className={`bg-gradient-to-r ${getRoleColor(selectedRole)} text-white`}>
                  {selectedRole === 'ngo' ? 'NGO' : selectedRole} Registration
                </Badge>
                <button 
                  onClick={() => setRegistrationStep('role')}
                  className="text-white/70 hover:text-white text-sm underline"
                >
                  Change Role
                </button>
              </div>

              {errors.submit && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 flex items-center">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{errors.submit}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Information */}
                <div className="md:col-span-2">
                  <h4 className="text-white mb-4 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Basic Information
                  </h4>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Full Name *</label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Email *</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Phone</label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Username *</label>
                  <Input
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                  {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Password *</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Confirm Password *</label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Organization Info (for NGO and Admin) */}
                {(selectedRole === 'ngo' || selectedRole === 'admin') && (
                  <>
                    <div className="md:col-span-2">
                      <h4 className="text-white mb-4 mt-6 flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        Organization Information
                      </h4>
                    </div>

                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Organization Name *</label>
                      <Input
                        type="text"
                        placeholder="Enter organization name"
                        value={formData.organizationName}
                        onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                      {errors.organizationName && <p className="text-red-400 text-xs mt-1">{errors.organizationName}</p>}
                    </div>

                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Organization Type *</label>
                      <Select 
                        value={formData.organizationType} 
                        onValueChange={(value) => setFormData({ ...formData, organizationType: value })}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedRole === 'ngo' ? (
                            <>
                              <SelectItem value="environmental-ngo">Environmental NGO</SelectItem>
                              <SelectItem value="conservation-org">Conservation Organization</SelectItem>
                              <SelectItem value="research-institute">Research Institute</SelectItem>
                              <SelectItem value="community-group">Community Group</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="government-department">Government Department</SelectItem>
                              <SelectItem value="environmental-ministry">Environmental Ministry</SelectItem>
                              <SelectItem value="forest-department">Forest Department</SelectItem>
                              <SelectItem value="regulatory-body">Regulatory Body</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      {errors.organizationType && <p className="text-red-400 text-xs mt-1">{errors.organizationType}</p>}
                    </div>

                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Registration Number</label>
                      <Input
                        type="text"
                        placeholder="Official registration number"
                        value={formData.registrationNumber}
                        onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>

                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Website</label>
                      <Input
                        type="url"
                        placeholder="https://your-website.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                  </>
                )}

                {/* Investment Info (for Investor) */}
                {selectedRole === 'investor' && (
                  <>
                    <div className="md:col-span-2">
                      <h4 className="text-white mb-4 mt-6 flex items-center">
                        <Wallet className="w-4 h-4 mr-2" />
                        Investment Information
                      </h4>
                    </div>

                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Investment Capacity *</label>
                      <Select 
                        value={formData.investmentCapacity} 
                        onValueChange={(value) => setFormData({ ...formData, investmentCapacity: value })}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select capacity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">Under $10,000</SelectItem>
                          <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                          <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                          <SelectItem value="over-1m">Over $1,000,000</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.investmentCapacity && <p className="text-red-400 text-xs mt-1">{errors.investmentCapacity}</p>}
                    </div>

                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Investment Interests</label>
                      <Input
                        type="text"
                        placeholder="e.g., Mangrove restoration, Carbon credits"
                        value={formData.interests}
                        onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                  </>
                )}

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="text-white/70 text-sm mb-2 block">Address</label>
                  <Textarea
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    rows={2}
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="text-white/70 text-sm mb-2 block">Description</label>
                  <Textarea
                    placeholder="Tell us about yourself or your organization"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    rows={3}
                  />
                </div>
              </div>

              <Button 
                onClick={handleSubmitRegistration}
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r ${getRoleColor(selectedRole)} hover:opacity-90 text-white h-12`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-3" />
                    Create Account
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Step 3: Verification */}
          {registrationStep === 'verification' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              
              <div>
                <h3 className="text-2xl text-white mb-2">Registration Successful!</h3>
                <p className="text-white/70">
                  Your account has been created and is being verified. You'll receive an email confirmation shortly.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                <p className="text-blue-300 text-sm">
                  You can now log in with your credentials. Some features may require admin approval.
                </p>
              </div>

              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-white/70" />
              </div>
            </div>
          )}

          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </Card>
      </div>
    </div>
  );
}