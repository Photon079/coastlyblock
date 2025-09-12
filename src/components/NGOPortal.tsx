import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, MapPin, DollarSign, CheckCircle, Clock, AlertCircle, FileText, Camera, Leaf, BarChart3, Calendar, Users, TreePine, Droplets, Award, TrendingUp, Satellite, Bot, Wallet } from 'lucide-react';

export function NGOPortal() {
  const [projects] = useState([
    {
      id: 1,
      name: "Sundarbans Mangrove Restoration",
      location: "West Bengal",
      area: "500 hectares",
      earnings: 125000,
      aiScore: 94,
      certProgress: 75,
      status: "active",
      species: 25,
      carbonOffset: 2500,
      ndviCurrent: 0.72,
      ndviBaseline: 0.35,
      ndviTarget: 0.85,
      ndviTrend: "increasing"
    },
    {
      id: 2,
      name: "Kutch Mangrove Conservation",
      location: "Gujarat",
      area: "300 hectares",
      earnings: 87500,
      aiScore: 89,
      certProgress: 45,
      status: "pending",
      species: 18,
      carbonOffset: 1800,
      ndviCurrent: 0.58,
      ndviBaseline: 0.28,
      ndviTarget: 0.78,
      ndviTrend: "stable"
    },
    {
      id: 3,
      name: "Pichavaram Mangrove Recovery",
      location: "Tamil Nadu",
      area: "200 hectares",
      earnings: 95000,
      aiScore: 96,
      certProgress: 90,
      status: "verified",
      species: 12,
      carbonOffset: 3200,
      ndviCurrent: 0.84,
      ndviBaseline: 0.42,
      ndviTarget: 0.90,
      ndviTrend: "increasing"
    }
  ]);

  const [showNewProject, setShowNewProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    location: '',
    area: '',
    description: '',
    species: '',
    estimatedCarbon: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'verified':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const handleSubmitProject = () => {
    // Mock submission
    setShowNewProject(false);
    setNewProject({
      name: '',
      location: '',
      area: '',
      description: '',
      species: '',
      estimatedCarbon: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Projects
            </TabsTrigger>
            <TabsTrigger value="earnings" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Earnings
            </TabsTrigger>
            <TabsTrigger value="certificates" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Certificates
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Active Projects</p>
                  <p className="text-3xl text-white">{projects.length}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Total Earnings</p>
                  <p className="text-3xl text-white">${projects.reduce((sum, p) => sum + p.earnings, 0).toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Avg AI Score</p>
                  <p className="text-3xl text-white">{Math.round(projects.reduce((sum, p) => sum + p.aiScore, 0) / projects.length)}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Avg NDVI Score</p>
                  <p className="text-3xl text-white">{(projects.reduce((sum, p) => sum + p.ndviCurrent, 0) / projects.length).toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
                  <Satellite className="w-6 h-6 text-teal-400" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Carbon Offset</p>
                  <p className="text-3xl text-white">{projects.reduce((sum, p) => sum + p.carbonOffset, 0).toLocaleString()}t</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6">Recent Activities</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">AI verification completed for Sundarbans project</p>
                    <p className="text-white/60 text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Payment received: $15,000</p>
                    <p className="text-white/60 text-xs">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Certificate pending approval</p>
                    <p className="text-white/60 text-xs">3 days ago</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6">AI Verification Status</h3>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white text-sm">{project.name}</p>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white/70 text-xs">AI Confidence Score</p>
                      <p className="text-white text-sm">{project.aiScore}%</p>
                    </div>
                    <Progress value={project.aiScore} className="h-2 bg-white/10" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-white">My Projects</h2>
              <Button 
                onClick={() => setShowNewProject(true)}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>

            {showNewProject && (
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
                <h3 className="text-xl text-white mb-4">Register New Project</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Project Name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Input
                    placeholder="Location"
                    value={newProject.location}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Input
                    placeholder="Area (hectares)"
                    value={newProject.area}
                    onChange={(e) => setNewProject({...newProject, area: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Input
                    placeholder="Number of Species"
                    value={newProject.species}
                    onChange={(e) => setNewProject({...newProject, species: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <Textarea
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mb-4"
                />
                <div className="flex gap-4">
                  <Button 
                    onClick={handleSubmitProject}
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                  >
                    Submit for Review
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowNewProject(false)}
                    className="text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl text-white mb-2">{project.name}</h3>
                      <p className="text-white/70 text-sm flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location} • {project.area}
                      </p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">AI Score</p>
                      <p className="text-white text-lg">{project.aiScore}%</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">NDVI Current</p>
                      <p className="text-white text-lg">{project.ndviCurrent}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Species</p>
                      <p className="text-white text-lg">{project.species}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Carbon Offset</p>
                      <p className="text-white text-lg">{project.carbonOffset}t</p>
                    </div>
                  </div>

                  {/* NDVI Progress Bar */}
                  <div className="bg-white/5 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white/70 text-xs">NDVI Progress</p>
                      <div className="flex items-center gap-2">
                        <span className="text-white/60 text-xs">{project.ndviBaseline}</span>
                        <TrendingUp className={`w-3 h-3 ${project.ndviTrend === 'increasing' ? 'text-emerald-400' : 'text-yellow-400'}`} />
                        <span className="text-white text-xs">{project.ndviCurrent}</span>
                        <span className="text-white/60 text-xs">/ {project.ndviTarget}</span>
                      </div>
                    </div>
                    <Progress 
                      value={((project.ndviCurrent - project.ndviBaseline) / (project.ndviTarget - project.ndviBaseline)) * 100} 
                      className="h-2 bg-white/10" 
                    />
                  </div>

                  <Progress value={project.certProgress} className="mb-4 h-2 bg-white/10" />

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-white hover:bg-white/10"
                      onClick={() => {
                        setModalLoading(true);
                        setTimeout(() => {
                          setSelectedProject(project.id);
                          setModalLoading(false);
                        }, 100);
                      }}
                      disabled={modalLoading}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {modalLoading ? 'Loading...' : 'View Details'}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Images
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="earnings">
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
            <h2 className="text-2xl text-white mb-6">Earnings Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-white/70 text-sm mb-2">Total Earned</h3>
                <p className="text-3xl text-white mb-2">${projects.reduce((sum, p) => sum + p.earnings, 0).toLocaleString()}</p>
                <p className="text-emerald-400 text-sm">+12% from last month</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-white/70 text-sm mb-2">Pending Payments</h3>
                <p className="text-3xl text-white mb-2">$45,000</p>
                <p className="text-yellow-400 text-sm">3 payments pending</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-white/70 text-sm mb-2">Average per Project</h3>
                <p className="text-3xl text-white mb-2">${Math.round(projects.reduce((sum, p) => sum + p.earnings, 0) / projects.length).toLocaleString()}</p>
                <p className="text-blue-400 text-sm">Across {projects.length} projects</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl text-white">Payment History</h3>
              {projects.map((project) => (
                <div key={project.id} className="bg-white/5 rounded-xl p-4 border border-white/10 flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-white">{project.name}</p>
                    <p className="text-white/60 text-sm">Last payment: Sep 1, 2025</p>
                  </div>
                  <div className="text-right mr-4">
                    <p className="text-white text-lg">${project.earnings.toLocaleString()}</p>
                    <p className="text-emerald-400 text-sm">Verified</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/10"
                    onClick={() => setSelectedProject(`payment-${project.id}`)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              ))}
            </div>

            {/* Payment Details Modal */}
            {selectedProject && selectedProject.toString().startsWith('payment-') && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <div 
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setSelectedProject(null)}
                />
                
                {/* Modal Content */}
                <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-8">
                    {(() => {
                      const projectId = parseInt(selectedProject.toString().replace('payment-', ''));
                      const project = projects.find(p => p.id === projectId);
                      if (!project) return null;
                      
                      // Mock payment transactions data
                      const transactions = [
                        {
                          id: 1,
                          date: '2025-09-01',
                          amount: 15000,
                          type: 'Carbon Credit Payment',
                          status: 'Completed',
                          txHash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
                          blockNumber: 18542367,
                          gasUsed: '21,000',
                          gasFee: '0.002 ETH',
                          fromAddress: '0x742d...9C4A',
                          toAddress: '0x8ba1...f214'
                        },
                        {
                          id: 2,
                          date: '2025-08-15',
                          amount: 25000,
                          type: 'Milestone Payment',
                          status: 'Completed',
                          txHash: '0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a',
                          blockNumber: 18421893,
                          gasUsed: '21,000',
                          gasFee: '0.0018 ETH',
                          fromAddress: '0x742d...9C4A',
                          toAddress: '0x8ba1...f214'
                        },
                        {
                          id: 3,
                          date: '2025-07-30',
                          amount: 20000,
                          type: 'Initial Payment',
                          status: 'Completed',
                          txHash: '0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2',
                          blockNumber: 18298745,
                          gasUsed: '21,000',
                          gasFee: '0.0021 ETH',
                          fromAddress: '0x742d...9C4A',
                          toAddress: '0x8ba1...f214'
                        },
                        {
                          id: 4,
                          date: '2025-09-10',
                          amount: 18000,
                          type: 'Verification Bonus',
                          status: 'Pending',
                          txHash: '0xd4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3',
                          blockNumber: null,
                          gasUsed: 'N/A',
                          gasFee: 'N/A',
                          fromAddress: '0x742d...9C4A',
                          toAddress: '0x8ba1...f214'
                        }
                      ];
                      
                      return (
                        <>
                          {/* Header */}
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex-1">
                              <h2 className="text-2xl text-white mb-2">Payment Transaction Details</h2>
                              <h3 className="text-lg text-white/80 mb-4">{project.name}</h3>
                              <div className="flex items-center gap-4 text-white/70 text-sm">
                                <span>Total Earned: ${project.earnings.toLocaleString()}</span>
                                <span>•</span>
                                <span>Location: {project.location}</span>
                                <span>•</span>
                                <span>Area: {project.area}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => setSelectedProject(null)}
                              className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          {/* Payment Summary */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <p className="text-white/70 text-xs mb-1">Total Payments</p>
                              <p className="text-white text-xl">{transactions.filter(t => t.status === 'Completed').length}</p>
                              <p className="text-emerald-400 text-xs">Successful</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <p className="text-white/70 text-xs mb-1">Total Amount</p>
                              <p className="text-white text-xl">${project.earnings.toLocaleString()}</p>
                              <p className="text-blue-400 text-xs">USD received</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <p className="text-white/70 text-xs mb-1">Pending</p>
                              <p className="text-white text-xl">${transactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</p>
                              <p className="text-yellow-400 text-xs">Processing</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <p className="text-white/70 text-xs mb-1">Next Expected</p>
                              <p className="text-white text-xl">Oct 15</p>
                              <p className="text-purple-400 text-xs">Milestone</p>
                            </div>
                          </div>

                          {/* Transactions List */}
                          <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
                            <h3 className="text-white mb-4 flex items-center">
                              <DollarSign className="w-5 h-5 mr-2" />
                              Transaction History
                            </h3>
                            <div className="space-y-4">
                              {transactions.map((transaction) => (
                                <div key={transaction.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                  <div className="flex justify-between items-start mb-3">
                                    <div>
                                      <h4 className="text-white mb-1">{transaction.type}</h4>
                                      <p className="text-white/60 text-sm">{transaction.date}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-white text-lg">${transaction.amount.toLocaleString()}</p>
                                      <Badge className={transaction.status === 'Completed' ? 
                                        'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' : 
                                        'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                                      }>
                                        {transaction.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="text-white/70 mb-2">Transaction Hash:</p>
                                      <p className="text-blue-400 font-mono text-xs break-all mb-3">{transaction.txHash}</p>
                                      <div className="space-y-1">
                                        <div className="flex justify-between">
                                          <span className="text-white/70">From:</span>
                                          <span className="text-white font-mono text-xs">{transaction.fromAddress}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-white/70">To:</span>
                                          <span className="text-white font-mono text-xs">{transaction.toAddress}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-white/70">Block Number:</span>
                                          <span className="text-white">{transaction.blockNumber || 'Pending'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-white/70">Gas Used:</span>
                                          <span className="text-white">{transaction.gasUsed}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-white/70">Gas Fee:</span>
                                          <span className="text-white">{transaction.gasFee}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-white/70">Network:</span>
                                          <span className="text-white">Ethereum Mainnet</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {transaction.status === 'Completed' && (
                                    <div className="mt-3 pt-3 border-t border-white/10">
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        className="text-blue-400 hover:bg-blue-500/10"
                                      >
                                        View on Etherscan
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Payment Methods & Wallet Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                              <h4 className="text-white mb-4 flex items-center">
                                <Wallet className="w-5 h-5 mr-2" />
                                Payment Methods
                              </h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                                      <span className="text-blue-400 text-xs">ETH</span>
                                    </div>
                                    <div>
                                      <p className="text-white text-sm">Ethereum Wallet</p>
                                      <p className="text-white/60 text-xs">Primary payment method</p>
                                    </div>
                                  </div>
                                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                                    Active
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                                      <span className="text-green-400 text-xs">USD</span>
                                    </div>
                                    <div>
                                      <p className="text-white text-sm">Bank Transfer</p>
                                      <p className="text-white/60 text-xs">Backup method</p>
                                    </div>
                                  </div>
                                  <Badge className="bg-gray-500/20 text-gray-300 border-gray-400/30">
                                    Inactive
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                              <h4 className="text-white mb-4 flex items-center">
                                <BarChart3 className="w-5 h-5 mr-2" />
                                Payment Analytics
                              </h4>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-white/70 text-sm">Average Payment:</span>
                                  <span className="text-white">${Math.round(project.earnings / transactions.filter(t => t.status === 'Completed').length).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-white/70 text-sm">Payment Frequency:</span>
                                  <span className="text-white">Monthly</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-white/70 text-sm">Success Rate:</span>
                                  <span className="text-emerald-400">100%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-white/70 text-sm">Total Gas Fees:</span>
                                  <span className="text-white">0.0059 ETH</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-4 justify-end">
                            <Button 
                              variant="ghost"
                              onClick={() => setSelectedProject(null)}
                              className="text-white hover:bg-white/10"
                            >
                              Close
                            </Button>
                            <Button 
                              variant="ghost"
                              className="text-white hover:bg-white/10"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Export Transactions
                            </Button>
                            <Button 
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                            >
                              <DollarSign className="w-4 h-4 mr-2" />
                              Request Payment
                            </Button>
                          </div>
                        </>
                      );
                    })()}
                  </Card>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="certificates">
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
            <h2 className="text-2xl text-white mb-6">Government Certificates</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-white text-lg">{project.name}</h3>
                    <Badge className={getStatusColor(project.status)}>
                      {project.certProgress >= 90 ? 'Ready' : 'In Progress'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-white/70">Certificate Progress</p>
                    <p className="text-white">{project.certProgress}%</p>
                  </div>
                  <Progress value={project.certProgress} className="mb-4 h-2 bg-white/10" />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      disabled={project.certProgress < 90}
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:opacity-50"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Download Certificate
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                      View Status
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-8">
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;
                
                return (
                  <>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl text-white">{project.name}</h2>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-white/70 text-sm mb-4">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {project.location}
                          </span>
                          <span className="flex items-center">
                            <TreePine className="w-4 h-4 mr-1" />
                            {project.area}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Started: March 2025
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Project Overview */}
                    <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
                      <h3 className="text-white mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Project Overview
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        {project.name} is a comprehensive mangrove restoration initiative focusing on rehabilitating degraded coastal ecosystems. 
                        Our approach combines traditional ecological knowledge with modern restoration techniques to create sustainable mangrove forests 
                        that provide critical habitat for wildlife, protect coastlines from erosion, and sequester significant amounts of carbon. 
                        The project actively involves local communities, providing training and employment opportunities while ensuring long-term 
                        stewardship of the restored areas.
                      </p>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-white/70 text-xs mb-1">Project Area</p>
                        <p className="text-white text-xl">{project.area}</p>
                        <p className="text-emerald-400 text-xs">Active restoration</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-white/70 text-xs mb-1">AI Verification</p>
                        <p className="text-white flex items-center text-xl">
                          {project.aiScore}%
                          <Bot className="w-5 h-5 ml-2 text-blue-400" />
                        </p>
                        <p className="text-blue-400 text-xs">High confidence</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-white/70 text-xs mb-1">NDVI Current</p>
                        <p className="text-white flex items-center text-xl">
                          {project.ndviCurrent}
                          <Satellite className="w-5 h-5 ml-2 text-teal-400" />
                        </p>
                        <p className="text-teal-400 text-xs">{project.ndviTrend}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-white/70 text-xs mb-1">Species Count</p>
                        <p className="text-white text-xl">{project.species}</p>
                        <p className="text-green-400 text-xs">Native varieties</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-white/70 text-xs mb-1">Carbon Sequestered</p>
                        <p className="text-white text-xl">{project.carbonOffset}t</p>
                        <p className="text-purple-400 text-xs">CO₂ equivalent</p>
                      </div>
                    </div>

                    {/* NDVI Monitoring Section */}
                    <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
                      <div className="flex items-center mb-4">
                        <Satellite className="w-5 h-5 text-teal-400 mr-2" />
                        <h3 className="text-white">Satellite-Based Vegetation Monitoring (NDVI)</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-white/70 text-sm">Vegetation Recovery Progress</p>
                            <p className="text-white text-sm">
                              {Math.round(((project.ndviCurrent - project.ndviBaseline) / (project.ndviTarget - project.ndviBaseline)) * 100)}%
                            </p>
                          </div>
                          <Progress 
                            value={((project.ndviCurrent - project.ndviBaseline) / (project.ndviTarget - project.ndviBaseline)) * 100} 
                            className="h-3 bg-white/10 mb-3" 
                          />
                          <div className="flex justify-between text-xs">
                            <span className="text-white/60">Baseline: {project.ndviBaseline}</span>
                            <span className="text-white">Current: {project.ndviCurrent}</span>
                            <span className="text-white/60">Target: {project.ndviTarget}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/70 text-sm">Change Rate:</span>
                            <span className="text-emerald-400">+{((project.ndviCurrent - project.ndviBaseline) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70 text-sm">Trend:</span>
                            <span className={`${project.ndviTrend === 'increasing' ? 'text-emerald-400' : 'text-yellow-400'} flex items-center`}>
                              {project.ndviTrend}
                              <TrendingUp className={`w-3 h-3 ml-1 ${project.ndviTrend === 'increasing' ? 'text-emerald-400' : 'text-yellow-400'}`} />
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70 text-sm">Health Score:</span>
                            <span className="text-white">{(project.ndviCurrent * 100).toFixed(0)}/100</span>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <p className="text-white/70 text-xs mb-2">Latest Satellite Analysis</p>
                          <p className="text-white text-sm mb-1">Captured: Sept 8, 2025</p>
                          <p className="text-emerald-400 text-xs">✓ Verified by AI</p>
                          <p className="text-blue-400 text-xs mt-2">Next scan: Sept 22, 2025</p>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Information Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Environmental Impact */}
                      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                        <div className="flex items-center mb-4">
                          <Leaf className="w-5 h-5 text-emerald-400 mr-2" />
                          <p className="text-white">Environmental Impact</p>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Trees Planted:</span>
                            <span className="text-white">12,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Survival Rate:</span>
                            <span className="text-emerald-400">94%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Biodiversity Index:</span>
                            <span className="text-white">8.7/10</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Soil Quality Improvement:</span>
                            <span className="text-blue-400">+32%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Water Retention:</span>
                            <span className="text-cyan-400">+45%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">NDVI Improvement:</span>
                            <span className="text-teal-400">+{((project.ndviCurrent - project.ndviBaseline) * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Community Engagement */}
                      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                        <div className="flex items-center mb-4">
                          <Users className="w-5 h-5 text-blue-400 mr-2" />
                          <p className="text-white">Community Impact</p>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Local Jobs Created:</span>
                            <span className="text-white">45</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Families Benefited:</span>
                            <span className="text-white">1,200</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Training Programs:</span>
                            <span className="text-blue-400">8 completed</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Women Participation:</span>
                            <span className="text-purple-400">65%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Youth Involvement:</span>
                            <span className="text-yellow-400">180 students</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Timeline */}
                    <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
                      <h3 className="text-white mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Project Timeline & Milestones
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <div>
                            <span className="text-white text-sm">Site Preparation & Planning</span>
                            <p className="text-white/60 text-xs">Soil analysis, community consultation, permits</p>
                          </div>
                          <span className="text-emerald-400 text-sm">✓ March 2025</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <div>
                            <span className="text-white text-sm">First Planting Phase</span>
                            <p className="text-white/60 text-xs">5,000 mangrove saplings planted</p>
                          </div>
                          <span className="text-emerald-400 text-sm">✓ April 2025</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <div>
                            <span className="text-white text-sm">Community Training Program</span>
                            <p className="text-white/60 text-xs">Local capacity building and education</p>
                          </div>
                          <span className="text-emerald-400 text-sm">✓ June 2025</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border-2 border-blue-400/30">
                          <div>
                            <span className="text-white text-sm">Mid-term Assessment</span>
                            <p className="text-white/60 text-xs">Growth monitoring and adaptive management</p>
                          </div>
                          <span className="text-blue-400 text-sm">⏳ In Progress</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <div>
                            <span className="text-white text-sm">Second Planting Phase</span>
                            <p className="text-white/60 text-xs">Expansion to remaining areas</p>
                          </div>
                          <span className="text-white/60 text-sm">📅 November 2025</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <div>
                            <span className="text-white text-sm">Final Assessment & Certification</span>
                            <p className="text-white/60 text-xs">Government verification and NFT minting</p>
                          </div>
                          <span className="text-white/60 text-sm">📅 March 2026</span>
                        </div>
                      </div>
                    </div>

                    {/* Certification Progress */}
                    <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white flex items-center">
                          <Award className="w-5 h-5 mr-2" />
                          Certification Progress
                        </h3>
                        <p className="text-white">{project.certProgress}% Complete</p>
                      </div>
                      <Progress value={project.certProgress} className="h-4 bg-white/10 mb-4" />
                      <div className="grid grid-cols-5 gap-4 text-sm">
                        <div className="text-center">
                          <div className="w-4 h-4 bg-emerald-500 rounded-full mx-auto mb-2"></div>
                          <p className="text-emerald-400">Documentation</p>
                          <p className="text-white/60 text-xs">Complete</p>
                        </div>
                        <div className="text-center">
                          <div className="w-4 h-4 bg-emerald-500 rounded-full mx-auto mb-2"></div>
                          <p className="text-emerald-400">AI Verification</p>
                          <p className="text-white/60 text-xs">{project.aiScore}% verified</p>
                        </div>
                        <div className="text-center">
                          <div className="w-4 h-4 bg-emerald-500 rounded-full mx-auto mb-2"></div>
                          <p className="text-emerald-400">Field Assessment</p>
                          <p className="text-white/60 text-xs">Approved</p>
                        </div>
                        <div className="text-center">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                          <p className="text-yellow-400">Admin Review</p>
                          <p className="text-white/60 text-xs">In Progress</p>
                        </div>
                        <div className="text-center">
                          <div className="w-4 h-4 bg-gray-500 rounded-full mx-auto mb-2"></div>
                          <p className="text-gray-400">NFT Certificate</p>
                          <p className="text-white/60 text-xs">Pending</p>
                        </div>
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
                      <h3 className="text-white mb-4 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Financial Summary
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/10 rounded-lg p-4">
                          <p className="text-white/70 text-xs mb-1">Total Earnings</p>
                          <p className="text-white text-2xl">${project.earnings.toLocaleString()}</p>
                          <div className="flex items-center mt-2">
                            <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
                            <span className="text-emerald-400 text-xs">+12% this month</span>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                          <p className="text-white/70 text-xs mb-1">Pending Payments</p>
                          <p className="text-white text-2xl">$25,000</p>
                          <p className="text-yellow-400 text-xs mt-2">Next payment: Oct 15</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                          <p className="text-white/70 text-xs mb-1">Carbon Credit Value</p>
                          <p className="text-white text-2xl">${(project.carbonOffset * 12).toLocaleString()}</p>
                          <p className="text-blue-400 text-xs mt-2">@$12 per tonne CO₂</p>
                        </div>
                      </div>
                    </div>

                    {/* Monitoring Data */}
                    <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
                      <h3 className="text-white mb-4 flex items-center">
                        <Satellite className="w-5 h-5 mr-2" />
                        Recent Monitoring Data
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-white/80 text-sm mb-3">Satellite Analysis (Last 30 days)</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-white/70 text-sm">Vegetation Health Index:</span>
                              <span className="text-emerald-400">0.82 (Excellent)</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/70 text-sm">Canopy Coverage:</span>
                              <span className="text-white">78%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/70 text-sm">Growth Rate:</span>
                              <span className="text-blue-400">+2.3% monthly</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white/80 text-sm mb-3">Field Observations</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-white/70 text-sm">Wildlife Species Count:</span>
                              <span className="text-white">42</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/70 text-sm">Water Quality:</span>
                              <span className="text-emerald-400">Good</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/70 text-sm">Community Engagement:</span>
                              <span className="text-purple-400">High</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-end">
                      <Button 
                        variant="ghost"
                        onClick={() => setSelectedProject(null)}
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
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Upload Progress Photos
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
  );
}