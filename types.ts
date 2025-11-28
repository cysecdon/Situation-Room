import React from 'react';

export interface Incident {
  id: string;
  type: 'Voter Miscount' | 'Agent Offline' | 'Suspicious Device' | 'Violence' | 'Logistics Delay' | 'BVAS Bypass';
  time: string;
  status: 'Open' | 'In-progress' | 'Resolved' | 'Escalated';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  location: { x: number; y: number }; // Percentage coordinates for the map
  locationName: string; // State/City for broad context
  pollingUnit: string; // Specific PU Code
  mediaUrl?: string; // URL for the evidence feed
  description?: string;
  reporter?: {
    name: string;
    role: 'Presiding Officer' | 'Party Agent' | 'Observer' | 'Citizen';
  };
  evidenceMetadata?: {
    device: string;
    timestamp: string;
    coordinates: string;
  };
}

export interface LiveResult {
  id: string;
  ballotId: string;
  status: 'Accepted' | 'Rejected' | 'Pending Audit';
  timestamp: string;
}

export interface DashboardMetrics {
  pollingUnitsReporting: number;
  totalAgents: number;
  riskyAgents: number;
  votesReceived: number;
  registeredVoters: number; // For turnout calc
  accreditedVoters: number; // For turnout calc
  anomalyScore: number;
  ocrMismatchRate: number;
  duplicateCount: number;
  // New Metrics
  spoiledBallots: number;
  bvasUptime: number; // Percentage
  incidentRate: number; // Per hour
  pendingResults: number;
  transmittedCount: number;
}

export interface AgentHealthData {
  time: string;
  active: number;
  offline: number;
}

export interface MismatchData {
  name: string;
  value: number;
}

export interface AdminAction {
  id: string;
  action: string;
  user: string;
  time: string;
  type: 'security' | 'audit' | 'system';
}

export interface SystemHealth {
  otpFailureRate: number; // Percentage
  rdsCpuLoad: number; // Percentage
  activeInstances: number;
  failedInstances: number;
}

export interface OfflineAgent {
    id: string;
    name: string;
    location: string;
    offlineDuration: string;
}

// --- NEW TYPES FOR WIDGETS ---

export interface WidgetConfig {
    id: string;
    type: string;
    title: string;
    layout: { i: string, x: number, y: number, w: number, h: number };
}

export interface WidgetDefinition {
    type: string;
    title: string;
    defaultW: number;
    defaultH: number;
    category?: string;
    icon?: React.ReactNode;
}

export interface BvasData {
    id: string;
    pu: string;
    batteryLevel: number; // 0-100
    connectivity: '4G' | '3G' | '2G' | 'Offline';
    accreditationCount: number;
    lastSeen: string;
    status: 'Online' | 'Offline' | 'Warning';
}

export interface LogisticsItem {
    id: string;
    item: string;
    location: string;
    status: 'Delivered' | 'In Transit' | 'Delayed' | 'Pending';
    eta: string;
}

export interface CallCenterStat {
    metric: string;
    value: string | number;
    trend: 'up' | 'down' | 'flat';
    status: 'good' | 'warning' | 'critical';
}

export interface Candidate {
    id: string;
    name: string;
    party: string;
    image: string;
    voteCount: number;
    percentage: number;
}

export interface ConstituencyStats {
    id: string;
    name: string;
    state: string;
    registered: number;
    accredited: number;
    status: 'Collation' | 'Voting' | 'Completed' | 'Pending';
    progress: number;
}

export interface ProvisionalStat {
    id: string;
    pu: string;
    reason: string;
    count: number;
    status: 'Under Review' | 'Accepted' | 'Rejected';
}

export interface Guideline {
    id: string;
    title: string;
    category: string;
}

export interface WitnessReport {
    id: string;
    reporter: string;
    location: string;
    content: string;
    time: string;
    verified: boolean;
}

export interface SocialPost {
    id: string;
    platform: 'Twitter' | 'Facebook' | 'Instagram' | 'TikTok';
    user: string;
    handle: string;
    content: string;
    timestamp: string;
    likes: number;
}

// --- USER & CONFIG TYPES ---
export interface User {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface MetricCardConfig {
  id: string;
  title: string;
  metricKey: keyof DashboardMetrics | 'turnoutPercentage' | 'totalBallots';
  threshold?: number;
  inverseThreshold?: boolean; // If true, lower is better (e.g. anomaly score)
  format?: 'number' | 'percentage' | 'decimal';
  color?: string; // Override color logic
}

// --- ROAMING AGENT TYPES ---
export interface RoamingAgentProfile {
    id: string;
    name: string;
    status: 'Idle' | 'En Route' | 'Investigating' | 'Reporting';
    velocity: number; // km/h
    adherenceScore: number; // 0-100
    location: string;
    battery: number;
    networkType: '5G' | '4G' | '3G' | 'Edge' | 'Offline' | 'Wifi';
    coordinates: string;
}

export interface InvestigationTask {
    id: string;
    title: string;
    status: 'Pending' | 'In Progress' | 'Resolved';
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    agentId?: string;
    location: string;
    timeCreated: string;
}

export interface CandidateAgentProfile {
    id: string;
    name: string;
    party: string;
    assignedPu: string;
    opStatus: 'Monitoring' | 'Reporting' | 'Away' | 'Offline';
    networkType: '5G' | '4G' | '3G' | 'Edge' | 'Offline' | 'Wifi';
    coordinates: string;
    locationStatus: 'On Site' | 'Off Site' | 'Proximity Warning';
    battery: number;
}