import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  ShoppingCart, 
  TrendingUp, 
  Leaf, 
  Award, 
  Download, 
  MapPin, 
  Calendar,
  DollarSign,
  Target,
  BarChart3,
  CheckCircle,
  Clock,
  Satellite,
  Bot,
  FileText,
  CreditCard,
  Wallet,
  X,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  AreaChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  Bar,
  Line,
  Pie,
  Cell
} from 'recharts';

export function InvestorPortal() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [availableProjects] = useState([
    {
      id: 1,
      name: "Sundarbans Mangrove Restoration",
      ngo: "Green Earth Foundation",
      location: "West Bengal",
      area: "500 hectares",
      totalTokens: 2500,
      availableTokens: 1200,
      pricePerToken: 45,
      preOrderPrice: 38,
      aiScore: 94,
      satelliteScore: 96,
      carbonOffset: 2500,
      species: 25,
      timeline: "36 months",
      riskLevel: "low",
      certificationProgress: 75,
      image: "forest",
      ndviCurrent: 0.72,
      ndviBaseline: 0.35,
      ndviTarget: 0.85,
      ndviTrend: "increasing",
      ndviChangeRate: 0.12
    },
    {
      id: 2,
      name: "Kerala Backwater Mangrove Conservation",
      ngo: "Coastal Bloom NGO",
      location: "Kerala",
      area: "300 hectares",
      totalTokens: 1800,
      availableTokens: 800,
      pricePerToken: 42,
      preOrderPrice: 35,
      aiScore: 89,
      satelliteScore: 91,
      carbonOffset: 1800,
      species: 18,
      timeline: "24 months",
      riskLevel: "medium",
      certificationProgress: 45,
      image: "desert",
      ndviCurrent: 0.58,
      ndviBaseline: 0.28,
      ndviTarget: 0.78,
      ndviTrend: "stable",
      ndviChangeRate: 0.08
    },
    {
      id: 3,
      name: "Goa Coastal Mangrove Recovery",
      ngo: "Ocean Guardians",
      location: "Goa",
      area: "200 hectares",
      totalTokens: 3200,
      availableTokens: 400,
      pricePerToken: 52,
      preOrderPrice: 44,
      aiScore: 96,
      satelliteScore: 94,
      carbonOffset: 3200,
      species: 12,
      timeline: "18 months",
      riskLevel: "low",
      certificationProgress: 90,
      image: "mangrove",
      ndviCurrent: 0.84,
      ndviBaseline: 0.42,
      ndviTarget: 0.90,
      ndviTrend: "increasing",
      ndviChangeRate: 0.15
    }
  ]);

  const [myInvestments] = useState([
    {
      id: 1,
      projectName: "Sundarbans Mangrove Restoration",
      tokensOwned: 150,
      purchasePrice: 42,
      currentValue: 45,
      purchaseDate: "2025-08-15",
      type: "immediate",
      installmentsPaid: 0,
      totalInstallments: 0,
      nextPayment: null,
      carbonCredits: 375,
      status: "active"
    },
    {
      id: 2,
      projectName: "Maharashtra Coastal Mangrove Restoration",
      tokensOwned: 200,
      purchasePrice: 35,
      currentValue: 42,
      purchaseDate: "2025-07-20",
      type: "pre-order",
      installmentsPaid: 8,
      totalInstallments: 12,
      nextPayment: "2025-09-15",
      carbonCredits: 500,
      status: "installments"
    }
  ]);

  const [certificates] = useState([
    {
      id: 1,
      nftId: "NFT-001-2025",
      projectName: "Pichavaram Mangrove Recovery",
      carbonCredits: 3200,
      issueDate: "2025-09-05",
      status: "verified",
      blockchainHash: "0x1234...abcd",
      downloadable: true
    },
    {
      id: 2,
      nftId: "NFT-002-2025",
      projectName: "Karnataka Coastal Mangrove Restoration",
      carbonCredits: 2800,
      issueDate: "2025-09-03",
      status: "verified",
      blockchainHash: "0x5678...efgh",
      downloadable: true
    }
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'installments':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'completed':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const handlePurchase = (projectId: number, type: 'immediate' | 'pre-order') => {
    console.log(`Purchasing project ${projectId} with ${type} payment`);
  };

  const handleDownloadCertificate = (certId: number) => {
    console.log(`Downloading certificate ${certId}`);
  };

  const totalInvested = myInvestments.reduce((sum, inv) => sum + (inv.tokensOwned * inv.purchasePrice), 0);
  const totalCurrentValue = myInvestments.reduce((sum, inv) => sum + (inv.tokensOwned * inv.currentValue), 0);
  const totalCarbonCredits = myInvestments.reduce((sum, inv) => sum + inv.carbonCredits, 0);

  // Analytics Data
  const portfolioPerformanceData = [
    { month: 'Jan 2025', value: 10500, invested: 10000, carbonCredits: 200 },
    { month: 'Feb 2025', value: 11200, invested: 10000, carbonCredits: 250 },
    { month: 'Mar 2025', value: 12100, invested: 10500, carbonCredits: 300 },
    { month: 'Apr 2025', value: 13500, invested: 11000, carbonCredits: 400 },
    { month: 'May 2025', value: 14200, invested: 11500, carbonCredits: 500 },
    { month: 'Jun 2025', value: 15800, invested: 12000, carbonCredits: 650 },
    { month: 'Jul 2025', value: 16500, invested: 12500, carbonCredits: 750 },
    { month: 'Aug 2025', value: 18200, invested: 13000, carbonCredits: 875 }
  ];

  const projectComparisonData = [
    { name: 'Sundarbans', tokens: 150, value: 6750, roi: 12.5, ndvi: 0.72, risk: 'Low' },
    { name: 'Maharashtra', tokens: 200, value: 8400, roi: 20.0, ndvi: 0.58, risk: 'Medium' },
    { name: 'Kerala', tokens: 0, value: 0, roi: 0, ndvi: 0.58, risk: 'Medium' },
    { name: 'Goa', tokens: 0, value: 0, roi: 0, ndvi: 0.84, risk: 'Low' }
  ];

  const marketTrendsData = [
    { month: 'Jan', avgPrice: 42, totalProjects: 8, marketCap: 1800000 },
    { month: 'Feb', avgPrice: 43, totalProjects: 9, marketCap: 1950000 },
    { month: 'Mar', avgPrice: 44, totalProjects: 10, marketCap: 2100000 },
    { month: 'Apr', avgPrice: 45, totalProjects: 12, marketCap: 2250000 },
    { month: 'May', avgPrice: 46, totalProjects: 13, marketCap: 2350000 },
    { month: 'Jun', avgPrice: 47, totalProjects: 15, marketCap: 2400000 },
    { month: 'Jul', avgPrice: 46, totalProjects: 16, marketCap: 2380000 },
    { month: 'Aug', avgPrice: 48, totalProjects: 18, marketCap: 2500000 }
  ];

  const riskAnalysisData = [
    { name: 'Low Risk', value: 65, projects: 7, color: '#10B981' },
    { name: 'Medium Risk', value: 30, projects: 3, color: '#F59E0B' },
    { name: 'High Risk', value: 5, projects: 1, color: '#EF4444' }
  ];

  const geographicData = [
    { state: 'West Bengal', projects: 3, tokens: 450, value: 20250, area: '800 hectares' },
    { state: 'Kerala', projects: 2, tokens: 320, value: 13440, area: '450 hectares' },
    { state: 'Maharashtra', projects: 2, tokens: 280, value: 11760, area: '350 hectares' },
    { state: 'Goa', projects: 1, tokens: 150, value: 7800, area: '200 hectares' },
    { state: 'Karnataka', projects: 1, tokens: 100, value: 4200, area: '150 hectares' }
  ];

  const ndviTrendsData = [
    { month: 'Jan', sundarbans: 0.68, kerala: 0.54, maharashtra: 0.52, goa: 0.80 },
    { month: 'Feb', sundarbans: 0.69, kerala: 0.55, maharashtra: 0.53, goa: 0.81 },
    { month: 'Mar', sundarbans: 0.70, kerala: 0.56, maharashtra: 0.54, goa: 0.82 },
    { month: 'Apr', sundarbans: 0.71, kerala: 0.57, maharashtra: 0.56, goa: 0.83 },
    { month: 'May', sundarbans: 0.72, kerala: 0.58, maharashtra: 0.57, goa: 0.84 },
    { month: 'Jun', sundarbans: 0.72, kerala: 0.58, maharashtra: 0.58, goa: 0.84 }
  ];

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

  return (
    <div className="w-full px-6 py-4">
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="investments" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              My Investments
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
                  <p className="text-white/70 text-sm">Total Invested</p>
                  <p className="text-3xl text-white">${totalInvested.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Current Value</p>
                  <p className="text-3xl text-white">${totalCurrentValue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Portfolio NDVI</p>
                  <p className="text-3xl text-white">{(availableProjects.reduce((sum, p) => sum + p.ndviCurrent, 0) / availableProjects.length).toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
                  <Satellite className="w-6 h-6 text-teal-400" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Carbon Credits</p>
                  <p className="text-3xl text-white">{totalCarbonCredits.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">ROI</p>
                  <p className="text-3xl text-white">+{Math.round(((totalCurrentValue - totalInvested) / totalInvested) * 100)}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6">Portfolio Overview</h3>
              <div className="space-y-4">
                {myInvestments.map((investment) => (
                  <div key={investment.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white text-sm">{investment.projectName}</p>
                      <Badge className={getStatusColor(investment.status)}>
                        {investment.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-white/70">Tokens</p>
                        <p className="text-white">{investment.tokensOwned}</p>
                      </div>
                      <div>
                        <p className="text-white/70">Value</p>
                        <p className="text-white">${(investment.tokensOwned * investment.currentValue).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-white/70">P&L</p>
                        <p className={investment.currentValue > investment.purchasePrice ? "text-emerald-400" : "text-red-400"}>
                          {investment.currentValue > investment.purchasePrice ? '+' : ''}
                          ${((investment.currentValue - investment.purchasePrice) * investment.tokensOwned).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6">Market Insights</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white text-sm">Average Token Price</p>
                    <p className="text-white">$46</p>
                  </div>
                  <p className="text-emerald-400 text-xs">+8% from last month</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white text-sm">Available Projects</p>
                    <p className="text-white">{availableProjects.length}</p>
                  </div>
                  <p className="text-blue-400 text-xs">2 new projects this week</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white text-sm">Total Market Cap</p>
                    <p className="text-white">$2.4M</p>
                  </div>
                  <p className="text-purple-400 text-xs">Growing 15% monthly</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="marketplace">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-white">Restoration Projects Marketplace</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Search projects..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 w-64"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableProjects.map((project) => (
                <Card key={project.id} className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl text-white mb-2">{project.name}</h3>
                      <p className="text-white/70 text-sm flex items-center mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location} • {project.area}
                      </p>
                      <p className="text-white/60 text-xs">by {project.ngo}</p>
                    </div>
                    <Badge className={getRiskColor(project.riskLevel)}>
                      {project.riskLevel} risk
                    </Badge>
                  </div>

                  {/* Exact Location & Coordinates Section */}
                  <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                    <div className="flex items-center mb-3">
                      <Satellite className="w-4 h-4 mr-2 text-blue-400" />
                      <h4 className="text-white text-sm">Exact Location & Satellite Data</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-xs">
                          <p className="text-white/70">GPS Coordinates</p>
                          <p className="text-white font-mono">
                            {project.id === 1 ? "22.1567°N, 89.1855°E" : 
                             project.id === 2 ? "9.9312°N, 76.2673°E" :
                             "15.2993°N, 74.1240°E"}
                          </p>
                        </div>
                        <div className="text-xs">
                          <p className="text-white/70">Elevation</p>
                          <p className="text-white">{project.id === 1 ? "2-4m above sea level" : project.id === 2 ? "0-2m above sea level" : "1-3m above sea level"}</p>
                        </div>
                        <div className="text-xs">
                          <p className="text-white/70">Water Salinity</p>
                          <p className="text-white">{project.id === 1 ? "15-25 ppt" : project.id === 2 ? "10-20 ppt" : "20-30 ppt"}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs">
                          <p className="text-white/70">Last Satellite Capture</p>
                          <p className="text-white">September 8, 2025</p>
                        </div>
                        <div className="text-xs">
                          <p className="text-white/70">Satellite Resolution</p>
                          <p className="text-white">0.5m per pixel</p>
                        </div>
                        <div className="text-xs">
                          <p className="text-white/70">Weather Conditions</p>
                          <p className="text-white">Clear, 82% humidity</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Satellite Imagery Section */}
                  <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Activity className="w-4 h-4 mr-2 text-green-400" />
                        <h4 className="text-white text-sm">Satellite Monitoring</h4>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-xs">
                        Live Tracking
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1727113775823-711de62d8dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwcmVzdG9yYXRpb24lMjBiZWZvcmUlMjBhZnRlcnxlbnwxfHx8fDE3NTc2MTE4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt="Before restoration satellite view"
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          Before: Jan 2025
                        </div>
                      </div>
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1646652209256-e51b68ce1d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBhZXJpYWwlMjBtYW5ncm92ZSUyMHJlc3RvcmF0aW9ufGVufDF8fHx8MTc1NzYxMTgwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt="Current restoration satellite view"
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          Current: Sep 2025
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 text-xs">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${project.id === 1 ? 'bg-red-400' : 'bg-yellow-400'}`}></div>
                        <span className="text-white/70">{project.id === 1 ? 'Degraded Area' : 'New Sapling'}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-white/70">Restored Vegetation</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-xl p-5 border border-blue-400/40 shadow-lg backdrop-blur-sm">
                      <p className="text-white/80 text-sm mb-2">AI Score</p>
                      <p className="text-white text-2xl flex items-center">
                        {project.aiScore}%
                        <Bot className="w-6 h-6 ml-2 text-blue-400" />
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">NDVI Score</p>
                      <p className="text-white flex items-center">
                        {project.ndviCurrent}
                        <TrendingUp className={`w-3 h-3 ml-1 ${project.ndviTrend === 'increasing' ? 'text-emerald-400' : 'text-yellow-400'}`} />
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Satellite Score</p>
                      <p className="text-white flex items-center">
                        {project.satelliteScore}%
                        <Satellite className="w-3 h-3 ml-1 text-green-400" />
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Carbon Offset</p>
                      <p className="text-white">{project.carbonOffset}t CO₂</p>
                    </div>
                  </div>

                  {/* NDVI Progress Section */}
                  <div className="bg-white/5 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white/70 text-xs">Vegetation Recovery (NDVI)</p>
                      <p className="text-white text-xs">
                        {project.ndviBaseline} → {project.ndviCurrent} / {project.ndviTarget}
                      </p>
                    </div>
                    <Progress 
                      value={((project.ndviCurrent - project.ndviBaseline) / (project.ndviTarget - project.ndviBaseline)) * 100} 
                      className="h-2 bg-white/10" 
                    />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-white/60 text-xs">Baseline</span>
                      <span className="text-emerald-400 text-xs">+{project.ndviChangeRate}/year</span>
                      <span className="text-white/60 text-xs">Target</span>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white text-sm">Available Tokens</p>
                      <p className="text-white">{project.availableTokens}/{project.totalTokens}</p>
                    </div>
                    <Progress value={(project.availableTokens / project.totalTokens) * 100} className="h-2 bg-white/10 mb-3" />
                    <div className="text-center">
                      <p className="text-white/70 text-xs">Price per Token</p>
                      <p className="text-white text-2xl">${project.pricePerToken}</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button 
                      onClick={() => handlePurchase(project.id, 'immediate')}
                      className="w-full max-w-xs h-14 text-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    >
                      <ShoppingCart className="w-5 h-5 mr-3" />
                      Buy Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="investments">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-white">My Investments</h2>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => setShowAnalytics(true)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {myInvestments.map((investment) => (
                <Card key={investment.id} className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl text-white mb-2">{investment.projectName}</h3>
                      <div className="flex items-center gap-4 text-white/70 text-sm">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Purchased: {investment.purchaseDate}
                        </span>
                        <Badge className={getStatusColor(investment.status)}>
                          {investment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Tokens Owned</p>
                      <p className="text-white text-lg">{investment.tokensOwned}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Purchase Price</p>
                      <p className="text-white text-lg">${investment.purchasePrice}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Current Value</p>
                      <p className="text-white text-lg">${investment.currentValue}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs">Carbon Credits</p>
                      <p className="text-white text-lg">{investment.carbonCredits}t</p>
                    </div>
                  </div>

                  {investment.type === 'pre-order' && (
                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-white text-sm">Payment Progress</p>
                        <p className="text-white">{investment.installmentsPaid}/{investment.totalInstallments}</p>
                      </div>
                      <Progress 
                        value={(investment.installmentsPaid / investment.totalInstallments) * 100} 
                        className="h-2 bg-white/10 mb-3" 
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Next payment:</span>
                        <span className="text-white">{investment.nextPayment}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-white/70 text-sm">Total P&L:</span>
                      <span className={investment.currentValue > investment.purchasePrice ? "text-emerald-400" : "text-red-400"}>
                        {investment.currentValue > investment.purchasePrice ? '+' : ''}
                        ${((investment.currentValue - investment.purchasePrice) * investment.tokensOwned).toFixed(0)}
                        ({investment.currentValue > investment.purchasePrice ? '+' : ''}
                        {(((investment.currentValue - investment.purchasePrice) / investment.purchasePrice) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                        <FileText className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                      {investment.type === 'pre-order' && (
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                          <Wallet className="w-4 h-4 mr-2" />
                          Make Payment
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="certificates">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-white">Government Certificates & NFTs</h2>
              <p className="text-white/70 text-sm">For sustainability reporting & compliance</p>
            </div>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6">Certificate Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="text-white/70 text-sm mb-2">Total Certificates</h4>
                  <p className="text-3xl text-white mb-2">{certificates.length}</p>
                  <p className="text-emerald-400 text-sm">All verified</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="text-white/70 text-sm mb-2">Total Carbon Credits</h4>
                  <p className="text-3xl text-white mb-2">{certificates.reduce((sum, cert) => sum + cert.carbonCredits, 0).toLocaleString()}</p>
                  <p className="text-blue-400 text-sm">t CO₂ offset</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="text-white/70 text-sm mb-2">Compliance Ready</h4>
                  <p className="text-3xl text-white mb-2">100%</p>
                  <p className="text-purple-400 text-sm">Download ready</p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl text-white">Available Certificates</h3>
              {certificates.map((certificate) => (
                <Card key={certificate.id} className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl text-white mb-2">{certificate.projectName}</h4>
                      <div className="flex items-center gap-4 text-white/70 text-sm">
                        <span>NFT ID: {certificate.nftId}</span>
                        <span>Issued: {certificate.issueDate}</span>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                          {certificate.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-white/70 text-xs mb-1">Carbon Credits</p>
                      <p className="text-white text-lg">{certificate.carbonCredits.toLocaleString()} t CO₂</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-white/70 text-xs mb-1">Blockchain Hash</p>
                      <p className="text-white text-sm font-mono">{certificate.blockchainHash}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-white/70 text-xs mb-1">Status</p>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                        <span className="text-emerald-400 text-sm">Blockchain Verified</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleDownloadCertificate(certificate.id)}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                      disabled={!certificate.downloadable}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Certificate
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-white hover:bg-white/10"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      View on Blockchain
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-white hover:bg-white/10"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Compliance Report
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Analytics Modal */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-[#000080] border border-white/20">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl text-white flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-purple-400" />
                  Portfolio Analytics & Insights
                </DialogTitle>
                <DialogDescription className="text-white/70 mt-2">
                  Comprehensive analytics dashboard showing your coastal restoration investment performance, environmental impact, and market insights.
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAnalytics(false)}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-8 mt-6">
            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total ROI</p>
                    <p className="text-2xl text-emerald-400">+{Math.round(((totalCurrentValue - totalInvested) / totalInvested) * 100)}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                </div>
              </Card>
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Active Projects</p>
                    <p className="text-2xl text-blue-400">{myInvestments.length}</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
              </Card>
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Avg NDVI Score</p>
                    <p className="text-2xl text-teal-400">0.72</p>
                  </div>
                  <Satellite className="w-8 h-8 text-teal-400" />
                </div>
              </Card>
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Carbon Impact</p>
                    <p className="text-2xl text-green-400">{totalCarbonCredits}t</p>
                  </div>
                  <Leaf className="w-8 h-8 text-green-400" />
                </div>
              </Card>
            </div>

            {/* Portfolio Performance Chart */}
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6 flex items-center">
                <LineChart className="w-5 h-5 mr-2 text-blue-400" />
                Portfolio Performance Over Time
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#ffffff" fontSize={12} />
                    <YAxis stroke="#ffffff" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,128,0.9)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }} 
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stackId="1" 
                      stroke="#10B981" 
                      fill="rgba(16,185,129,0.2)" 
                      name="Current Value"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="invested" 
                      stackId="2" 
                      stroke="#3B82F6" 
                      fill="rgba(59,130,246,0.2)" 
                      name="Invested Amount"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Comparison */}
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
                <h3 className="text-xl text-white mb-6 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                  Project Performance Comparison
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={projectComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="#ffffff" fontSize={12} />
                      <YAxis stroke="#ffffff" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,128,0.9)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: '#ffffff'
                        }} 
                      />
                      <Bar dataKey="roi" fill="#8B5CF6" name="ROI %" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Risk Analysis */}
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
                <h3 className="text-xl text-white mb-6 flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-red-400" />
                  Risk Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={riskAnalysisData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                      >
                        {riskAnalysisData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,128,0.9)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: '#ffffff'
                        }} 
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Market Trends */}
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-yellow-400" />
                Market Trends & Analysis
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={marketTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#ffffff" fontSize={12} />
                    <YAxis stroke="#ffffff" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,128,0.9)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="avgPrice" 
                      stroke="#F59E0B" 
                      strokeWidth={3}
                      name="Avg Token Price ($)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="totalProjects" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      name="Total Projects"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* NDVI Vegetation Tracking */}
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6 flex items-center">
                <Satellite className="w-5 h-5 mr-2 text-green-400" />
                Vegetation Health Tracking (NDVI)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={ndviTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#ffffff" fontSize={12} />
                    <YAxis domain={[0.4, 0.9]} stroke="#ffffff" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,128,0.9)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="sundarbans" stroke="#10B981" strokeWidth={2} name="Sundarbans" />
                    <Line type="monotone" dataKey="kerala" stroke="#3B82F6" strokeWidth={2} name="Kerala" />
                    <Line type="monotone" dataKey="maharashtra" stroke="#8B5CF6" strokeWidth={2} name="Maharashtra" />
                    <Line type="monotone" dataKey="goa" stroke="#F59E0B" strokeWidth={2} name="Goa" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Geographic Distribution */}
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-indigo-400" />
                Geographic Investment Distribution
              </h3>
              <div className="space-y-4">
                {geographicData.map((location, index) => (
                  <div key={location.state} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-white text-lg">{location.state}</span>
                      </div>
                      <span className="text-white/70 text-sm">{location.area}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-white/70">Projects</p>
                        <p className="text-white">{location.projects}</p>
                      </div>
                      <div>
                        <p className="text-white/70">Tokens</p>
                        <p className="text-white">{location.tokens}</p>
                      </div>
                      <div>
                        <p className="text-white/70">Value</p>
                        <p className="text-white">${location.value.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Carbon Credits Impact */}
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl text-white mb-6 flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-green-400" />
                Carbon Impact Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                  <p className="text-4xl text-green-400 mb-2">{totalCarbonCredits}t</p>
                  <p className="text-white/70">Total CO₂ Offset</p>
                  <p className="text-green-300 text-sm mt-2">Equivalent to planting 35,000 trees</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                  <p className="text-4xl text-blue-400 mb-2">1,200</p>
                  <p className="text-white/70">Hectares Restored</p>
                  <p className="text-blue-300 text-sm mt-2">Across 5 Indian coastal states</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                  <p className="text-4xl text-purple-400 mb-2">55+</p>
                  <p className="text-white/70">Species Protected</p>
                  <p className="text-purple-300 text-sm mt-2">Marine and coastal biodiversity</p>
                </div>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}