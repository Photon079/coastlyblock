import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar } from './ui/avatar';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Satellite, 
  Bot, 
  Award, 
  BarChart3, 
  MapPin, 
  Calendar,
  FileText,
  Upload,
  Users
} from 'lucide-react';

export function AdminPortal() {
  const [submissions] = useState([
    {
      id: 1,
      name: "Sundarbans Mangrove Restoration",
      ngo: "Green Earth Foundation",
      location: "West Bengal",
      area: "500 hectares",
      aiScore: 94,
      satelliteScore: 96,
      status: "pending_review",
      submittedDate: "2025-09-01",
      estimatedCarbon: 2500,
      species: 25,
      ndviCurrent: 0.72,
      ndviBaseline: 0.35,
      ndviTarget: 0.85,
      ndviTrend: "increasing",
      ndviChangeRate: 0.12
    },
    {
      id: 2,
      name: "Bhitarkanika Mangrove Conservation",
      ngo: "Coastal Bloom NGO",
      location: "Odisha",
      area: "300 hectares",
      aiScore: 89,
      satelliteScore: 91,
      status: "ai_verification",
      submittedDate: "2025-08-28",
      estimatedCarbon: 1800,
      species: 18,
      ndviCurrent: 0.58,
      ndviBaseline: 0.28,
      ndviTarget: 0.78,
      ndviTrend: "stable",
      ndviChangeRate: 0.08
    },
    {
      id: 3,
      name: "Andaman Mangrove Recovery",
      ngo: "Ocean Guardians",
      location: "Andaman & Nicobar Islands",
      area: "200 hectares",
      aiScore: 96,
      satelliteScore: 94,
      status: "approved",
      submittedDate: "2025-08-25",
      estimatedCarbon: 3200,
      species: 12,
      ndviCurrent: 0.84,
      ndviBaseline: 0.42,
      ndviTarget: 0.90,
      ndviTrend: "increasing",
      ndviChangeRate: 0.15
    }
  ]);

  const [analytics] = useState({
    totalSubmissions: 156,
    pendingReview: 23,
    approved: 89,
    rejected: 12,
    avgAiScore: 92,
    avgSatelliteScore: 89,
    avgNdviScore: 0.71,
    avgNdviImprovement: 0.28,
    totalCarbonOffset: 45600,
    certificatesIssued: 67
  });

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [approvedSubmissions, setApprovedSubmissions] = useState(new Set());
  const [rejectedSubmissions, setRejectedSubmissions] = useState(new Set());
  const [showApprovalNotification, setShowApprovalNotification] = useState(null);
  const [showRejectionNotification, setShowRejectionNotification] = useState(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'ai_verification':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'approved':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'Pending Review';
      case 'ai_verification':
        return 'AI Verification';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const handleApproveSubmission = (id: number) => {
    // Add to approved submissions
    setApprovedSubmissions(prev => new Set([...prev, id]));
    
    // Show approval notification
    const submission = submissions.find(s => s.id === id);
    setShowApprovalNotification({
      id,
      name: submission?.name || 'Project',
      timestamp: new Date().toLocaleTimeString()
    });
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowApprovalNotification(null);
    }, 5000);
  };

  const handleRejectSubmission = (id: number) => {
    // Add to rejected submissions
    setRejectedSubmissions(prev => new Set([...prev, id]));
    
    // Show rejection notification
    const submission = submissions.find(s => s.id === id);
    setShowRejectionNotification({
      id,
      name: submission?.name || 'Project',
      timestamp: new Date().toLocaleTimeString()
    });
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowRejectionNotification(null);
    }, 5000);
  };

  const handleMintCertificate = (id: number) => {
    // Mock NFT minting logic
    console.log(`Minting certificate for submission ${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="submissions" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Submissions
            </TabsTrigger>
            <TabsTrigger value="verification" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              AI/Satellite
            </TabsTrigger>
            <TabsTrigger value="certificates" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Certificates
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Total Submissions</p>
                  <p className="text-3xl text-white">{analytics.totalSubmissions}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Pending Review</p>
                  <p className="text-3xl text-white">{analytics.pendingReview}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Approved Projects</p>
                  <p className="text-3xl text-white">{analytics.approved}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Certificates Issued</p>
                  <p className="text-3xl text-white">{analytics.certificatesIssued}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                System Analytics
              </h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white/70 text-sm">Average AI Verification Score</p>
                    <p className="text-white">{analytics.avgAiScore}%</p>
                  </div>
                  <Progress value={analytics.avgAiScore} className="h-2 bg-white/10" />
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white/70 text-sm">Average Satellite Score</p>
                    <p className="text-white">{analytics.avgSatelliteScore}%</p>
                  </div>
                  <Progress value={analytics.avgSatelliteScore} className="h-2 bg-white/10" />
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white/70 text-sm">Average NDVI Score</p>
                    <p className="text-white">{analytics.avgNdviScore}</p>
                  </div>
                  <Progress value={analytics.avgNdviScore * 100} className="h-2 bg-white/10" />
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-white/70 text-sm">Avg NDVI Improvement</p>
                    <p className="text-white">+{analytics.avgNdviImprovement} ↗</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-white/70 text-sm">Total Carbon Offset Verified</p>
                    <p className="text-white">{analytics.totalCarbonOffset.toLocaleString()}t CO₂</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6">Recent Activities</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Approved Mangrove Recovery project</p>
                    <p className="text-white/60 text-xs">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">AI verification completed</p>
                    <p className="text-white/60 text-xs">3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Certificate minted as NFT</p>
                    <p className="text-white/60 text-xs">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Satellite className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Satellite data analysis started</p>
                    <p className="text-white/60 text-xs">1 day ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-white">NGO Submissions</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Search submissions..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 w-64"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {submissions.map((submission) => (
                <Card key={submission.id} className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-white">{submission.name}</h3>
                        <Badge className={getStatusColor(submission.status)}>
                          {getStatusText(submission.status)}
                        </Badge>
                        {approvedSubmissions.has(submission.id) && (
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 animate-pulse">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Reviewed & Verified
                          </Badge>
                        )}
                        {rejectedSubmissions.has(submission.id) && (
                          <Badge className="bg-red-500/20 text-red-300 border-red-400/30 animate-pulse">
                            <XCircle className="w-3 h-3 mr-1" />
                            Project Rejected
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-white/70 text-sm mb-3">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {submission.ngo}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {submission.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {submission.submittedDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Area</p>
                      <p className="text-white">{submission.area}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">AI Score</p>
                      <p className="text-white flex items-center">
                        {submission.aiScore}%
                        <Bot className="w-3 h-3 ml-1 text-blue-400" />
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Satellite Score</p>
                      <p className="text-white flex items-center">
                        {submission.satelliteScore}%
                        <Satellite className="w-3 h-3 ml-1 text-green-400" />
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Carbon Offset</p>
                      <p className="text-white">{submission.estimatedCarbon}t</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedSubmission(submission.id)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Review Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Approval Notification */}
            {showApprovalNotification && (
              <div className="fixed top-4 right-4 z-50">
                <Card className="backdrop-blur-md bg-emerald-500/20 border border-emerald-400/40 p-6 min-w-80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500/30 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-emerald-300" />
                      </div>
                      <div>
                        <h4 className="text-white mb-1">Project Approved!</h4>
                        <p className="text-emerald-300 text-sm">{showApprovalNotification.name}</p>
                        <p className="text-white/60 text-xs">Reviewed and verified at {showApprovalNotification.timestamp}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowApprovalNotification(null)}
                      className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4 bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/20">
                    <div className="flex items-center gap-2 text-sm text-emerald-300">
                      <Award className="w-4 h-4" />
                      <span>Ready for NFT certificate minting</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Rejection Notification */}
            {showRejectionNotification && (
              <div className="fixed top-4 right-4 z-50">
                <Card className="backdrop-blur-md bg-red-500/20 border border-red-400/40 p-6 min-w-80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500/30 rounded-full flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-red-300" />
                      </div>
                      <div>
                        <h4 className="text-white mb-1">Project Rejected</h4>
                        <p className="text-red-300 text-sm">{showRejectionNotification.name}</p>
                        <p className="text-white/60 text-xs">Reviewed and rejected at {showRejectionNotification.timestamp}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowRejectionNotification(null)}
                      className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4 bg-red-500/10 rounded-lg p-3 border border-red-400/20">
                    <div className="flex items-center gap-2 text-sm text-red-300">
                      <FileText className="w-4 h-4" />
                      <span>NGO will be notified of rejection</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Detailed Submission Modal */}
            {selectedSubmission && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <div 
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setSelectedSubmission(null)}
                />
                
                {/* Modal Content */}
                <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                  <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-8">
                    {(() => {
                      const submission = submissions.find(s => s.id === selectedSubmission);
                      if (!submission) return null;
                      
                      return (
                        <>
                          {/* Header */}
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl text-white">{submission.name}</h2>
                                <Badge className={getStatusColor(submission.status)}>
                                  {getStatusText(submission.status)}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-white/70 text-sm mb-4">
                                <span className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {submission.ngo}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {submission.location}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {submission.submittedDate}
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => setSelectedSubmission(null)}
                              className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          {/* Project Description */}
                          <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
                            <p className="text-white/70 text-sm mb-2">Project Description</p>
                            <p className="text-white">
                              Large-scale forest restoration project focusing on native species reforestation, 
                              biodiversity conservation, and community engagement for sustainable environmental impact. 
                              This comprehensive initiative aims to restore degraded forest ecosystems while providing 
                              sustainable livelihoods for local communities and measurable carbon sequestration benefits.
                            </p>
                          </div>

                          {/* Enhanced Metrics Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <p className="text-white/70 text-xs mb-1">Area Restored</p>
                              <p className="text-white text-xl">{submission.area}</p>
                              <p className="text-emerald-400 text-xs">Target achieved</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <p className="text-white/70 text-xs mb-1">AI Verification</p>
                              <p className="text-white flex items-center text-xl">
                                {submission.aiScore}%
                                <Bot className="w-5 h-5 ml-2 text-blue-400" />
                              </p>
                              <p className="text-blue-400 text-xs">High confidence</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <p className="text-white/70 text-xs mb-1">Satellite Analysis</p>
                              <p className="text-white flex items-center text-xl">
                                {submission.satelliteScore}%
                                <Satellite className="w-5 h-5 ml-2 text-green-400" />
                              </p>
                              <p className="text-green-400 text-xs">Verified growth</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <p className="text-white/70 text-xs mb-1">Carbon Offset</p>
                              <p className="text-white text-xl">{submission.estimatedCarbon}t CO₂</p>
                              <p className="text-purple-400 text-xs">Certified volume</p>
                            </div>
                          </div>

                          {/* Additional Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                              <div className="flex items-center mb-3">
                                <FileText className="w-5 h-5 text-blue-400 mr-2" />
                                <p className="text-white">Documentation</p>
                              </div>
                              <div className="space-y-2 text-sm">
                                <p className="text-white/70">• Environmental Impact Report</p>
                                <p className="text-white/70">• Species Inventory (24 documents)</p>
                                <p className="text-white/70">• Progress Photos (156 images)</p>
                                <p className="text-white/70">• Community Engagement Records</p>
                                <p className="text-white/70">• Soil Analysis Reports</p>
                                <p className="text-white/70">• Wildlife Monitoring Data</p>
                              </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                              <div className="flex items-center mb-3">
                                <BarChart3 className="w-5 h-5 text-emerald-400 mr-2" />
                                <p className="text-white">Impact Metrics</p>
                              </div>
                              <div className="space-y-2 text-sm">
                                <p className="text-white/70">Tree Survival Rate: 94%</p>
                                <p className="text-white/70">Species Diversity: {submission.species} types</p>
                                <p className="text-white/70">Local Jobs Created: 45</p>
                                <p className="text-white/70">Community Beneficiaries: 1,200</p>
                                <p className="text-white/70">Water Sources Protected: 8</p>
                                <p className="text-white/70">Wildlife Species Returned: 23</p>
                              </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                              <div className="flex items-center mb-3">
                                <Award className="w-5 h-5 text-purple-400 mr-2" />
                                <p className="text-white">Certifications</p>
                              </div>
                              <div className="space-y-2 text-sm">
                                <p className="text-emerald-400">✓ FSC Certification Ready</p>
                                <p className="text-emerald-400">✓ Carbon Credit Verified</p>
                                <p className="text-emerald-400">✓ Biodiversity Compliant</p>
                                <p className="text-emerald-400">✓ Community Impact Verified</p>
                                <p className="text-yellow-400">⏳ Government Approval Pending</p>
                                <p className="text-blue-400">📋 REDD+ Standards Met</p>
                              </div>
                            </div>
                          </div>

                          {/* Verification Progress */}
                          <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                              <p className="text-white">Verification Progress</p>
                              <p className="text-white">{Math.round((submission.aiScore + submission.satelliteScore) / 2)}% Complete</p>
                            </div>
                            <Progress value={Math.round((submission.aiScore + submission.satelliteScore) / 2)} className="h-4 bg-white/10 mb-4" />
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div className="text-center">
                                <div className="w-4 h-4 bg-emerald-500 rounded-full mx-auto mb-2"></div>
                                <p className="text-emerald-400">Submitted</p>
                                <p className="text-white/60 text-xs">Complete</p>
                              </div>
                              <div className="text-center">
                                <div className="w-4 h-4 bg-emerald-500 rounded-full mx-auto mb-2"></div>
                                <p className="text-emerald-400">AI Verified</p>
                                <p className="text-white/60 text-xs">{submission.aiScore}% confidence</p>
                              </div>
                              <div className="text-center">
                                <div className="w-4 h-4 bg-emerald-500 rounded-full mx-auto mb-2"></div>
                                <p className="text-emerald-400">Satellite Confirmed</p>
                                <p className="text-white/60 text-xs">{submission.satelliteScore}% verified</p>
                              </div>
                              <div className="text-center">
                                <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                                <p className="text-yellow-400">Admin Review</p>
                                <p className="text-white/60 text-xs">In Progress</p>
                              </div>
                            </div>
                          </div>

                          {/* Timeline & Milestones */}
                          <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
                            <h3 className="text-white mb-4 flex items-center">
                              <Calendar className="w-5 h-5 mr-2" />
                              Project Timeline & Milestones
                            </h3>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-white text-sm">Project Initiation</span>
                                <span className="text-emerald-400 text-sm">✓ March 2025</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-white text-sm">First Planting Phase</span>
                                <span className="text-emerald-400 text-sm">✓ April 2025</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-white text-sm">Mid-term Assessment</span>
                                <span className="text-blue-400 text-sm">⏳ September 2025</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-white text-sm">Final Certification</span>
                                <span className="text-white/60 text-sm">📅 March 2026</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-4 justify-end">
                            <Button 
                              variant="ghost"
                              onClick={() => setSelectedSubmission(null)}
                              className="text-white hover:bg-white/10"
                            >
                              Close
                            </Button>
                            <Button 
                              variant="ghost"
                              className="text-white hover:bg-white/10"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Download Report
                            </Button>
                            <Button 
                              onClick={() => {
                                handleRejectSubmission(submission.id);
                                setSelectedSubmission(null);
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                            <Button 
                              onClick={() => {
                                handleApproveSubmission(submission.id);
                                setSelectedSubmission(null);
                              }}
                              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve Project
                            </Button>
                          </div>
                        </>
                      );
                    })()}
                  </Card>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="verification">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
                <h3 className="text-xl text-white mb-6 flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-blue-400" />
                  AI Analysis Dashboard
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white/70 text-sm">Image Recognition Accuracy</p>
                      <p className="text-white">97.5%</p>
                    </div>
                    <Progress value={97.5} className="h-2 bg-white/10" />
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white/70 text-sm">Species Identification</p>
                      <p className="text-white">94.2%</p>
                    </div>
                    <Progress value={94.2} className="h-2 bg-white/10" />
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white/70 text-sm">Growth Pattern Analysis</p>
                      <p className="text-white">89.8%</p>
                    </div>
                    <Progress value={89.8} className="h-2 bg-white/10" />
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/70 text-sm mb-2">Recent AI Checks</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">Amazon Project</span>
                        <span className="text-emerald-400">Verified</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white">Sahel Initiative</span>
                        <span className="text-yellow-400">Processing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
                <h3 className="text-xl text-white mb-6 flex items-center">
                  <Satellite className="w-5 h-5 mr-2 text-green-400" />
                  Satellite Monitoring
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white/70 text-sm">Vegetation Index (NDVI)</p>
                      <p className="text-white">0.82</p>
                    </div>
                    <Progress value={82} className="h-2 bg-white/10" />
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white/70 text-sm">Forest Cover Change</p>
                      <p className="text-white">+15.3%</p>
                    </div>
                    <Progress value={78} className="h-2 bg-white/10" />
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white/70 text-sm">Deforestation Risk</p>
                      <p className="text-white">Low (12%)</p>
                    </div>
                    <Progress value={12} className="h-2 bg-white/10" />
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/70 text-sm mb-2">Satellite Updates</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">Weekly Scan</span>
                        <span className="text-emerald-400">Completed</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white">Change Detection</span>
                        <span className="text-blue-400">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6">Verification Queue</h3>
              <div className="space-y-4">
                {submissions.filter(s => s.status === 'ai_verification' || s.status === 'pending_review').map((submission) => (
                  <div key={submission.id} className="bg-white/5 rounded-xl p-4 border border-white/10 flex justify-between items-center">
                    <div>
                      <p className="text-white">{submission.name}</p>
                      <p className="text-white/60 text-sm">AI: {submission.aiScore}% • Satellite: {submission.satelliteScore}%</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                        <Bot className="w-4 h-4 mr-2" />
                        Run AI Check
                      </Button>
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        <Satellite className="w-4 h-4 mr-2" />
                        Satellite Analysis
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certificates">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-white">Certificate Management</h2>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Upload className="w-4 h-4 mr-2" />
                Mint New Certificate
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {submissions.filter(s => s.status === 'approved').map((submission) => (
                <Card key={submission.id} className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl text-white mb-2">{submission.name}</h3>
                      <p className="text-white/70 text-sm">{submission.ngo}</p>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                      Ready for Minting
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Carbon Verified</p>
                      <p className="text-white text-lg">{submission.estimatedCarbon}t CO₂</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Verification Score</p>
                      <p className="text-white text-lg">{Math.round((submission.aiScore + submission.satelliteScore) / 2)}%</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Area Restored</p>
                      <p className="text-white text-lg">{submission.area}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Species Count</p>
                      <p className="text-white text-lg">{submission.species}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleMintCertificate(submission.id)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Mint NFT Certificate
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-white hover:bg-white/10"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6">Issued Certificates</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-white">Certificate #NFT-001-2025</p>
                    <p className="text-white/60 text-sm">Coastal Mangrove Recovery • Issued: Sep 5, 2025</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                      Minted
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                      View on Blockchain
                    </Button>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-white">Certificate #NFT-002-2025</p>
                    <p className="text-white/60 text-sm">Mountain Forest Restoration • Issued: Sep 3, 2025</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                      Minted
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                      View on Blockchain
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}