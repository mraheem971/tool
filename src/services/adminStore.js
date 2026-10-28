// Persistent store for Admin Panel: User tickets, bug reports, users, and FAQ management

const STORAGE_KEYS = {
  TICKETS: 'mediaforge_admin_tickets',
  BUGS: 'mediaforge_admin_bugs',
  USERS: 'mediaforge_admin_users',
  ADMIN_AUTH: 'mediaforge_admin_authenticated'
};

// Initial sample user questions and difficulties to provide realistic data out of the box
const DEFAULT_TICKETS = [
  {
    id: 'TCK-1082',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techcreators.io',
    category: 'Video Auto-Clipper',
    subject: 'Can I change the font style of the 5-second intro bumper?',
    message: 'Hello! I am creating 60-second Reels from my 1-hour podcast. I love the Part # and Title bumper feature, but can I select custom font weights or brand colors for my sponsor logo?',
    priority: 'Normal',
    status: 'In Progress',
    createdAt: '2026-10-26T14:32:00Z',
    replies: [
      {
        sender: 'Admin Support',
        message: 'Hi Sarah! You can customize the intro theme (Glassmorphism, Cyber Glow, Minimal, Broadcast) and pick any accent color from the Overlay Customizer panel. We are adding custom font upload support in the next minor update!',
        timestamp: '2026-10-26T16:10:00Z'
      }
    ]
  },
  {
    id: 'TCK-1083',
    name: 'Marcus Brody',
    email: 'marcus.brody@streamteam.gg',
    category: 'General Inquiry',
    subject: 'Why is the minimum clip duration set to 30 seconds?',
    message: 'Hey MediaForge team! I tried setting the clip length to 15 seconds for YouTube Shorts highlights, but the minimum duration slider stops at 30s. Is there a way to override this?',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-10-27T09:15:00Z',
    replies: []
  },
  {
    id: 'TCK-1084',
    name: 'Elena Rostova',
    email: 'elena@vfxstudio.design',
    category: 'Image Compressor',
    subject: 'Does WebP conversion preserve transparent backgrounds for PNG icons?',
    message: 'We are compressing 400 PNG application icons with transparent drop shadows. Will converting them to WebP maintain full alpha transparency?',
    priority: 'Normal',
    status: 'Resolved',
    createdAt: '2026-10-25T11:20:00Z',
    replies: [
      {
        sender: 'Admin Support',
        message: 'Hello Elena, yes! WebP format in MediaForge fully supports 8-bit alpha channel transparency with 30-70% file size savings compared to PNG.',
        timestamp: '2026-10-25T12:05:00Z'
      }
    ]
  },
  {
    id: 'TCK-1085',
    name: 'David Kim',
    email: 'david.kim@gaminghub.tv',
    category: 'Video Compressor',
    subject: 'Discord 25MB preset produces 24.2MB — is this safe from upload rejection?',
    message: 'I compressed a 1080p 60fps clip with the Discord 25MB preset. It came out at 24.2MB. Will Discord accept it without saying "file is too powerful"?',
    priority: 'Normal',
    status: 'Resolved',
    createdAt: '2026-10-24T18:45:00Z',
    replies: [
      {
        sender: 'Admin Support',
        message: 'Hi David! Yes, our Discord algorithm intentionally calculates a buffer headroom (targeting ~24MB) so that Discord’s file size checker never rejects it.',
        timestamp: '2026-10-24T19:00:00Z'
      }
    ]
  }
];

// Initial user difficulties / bug reports
const DEFAULT_BUGS = [
  {
    id: 'BUG-401',
    tool: 'Video Auto-Clipper (30+ Min)',
    title: 'Batch export hangs at 92% on 4K 60FPS MKV file',
    steps: '1. Uploaded 45-minute 4K MKV stream (2.8 GB)\n2. Configured 60s clips\n3. Clicked Batch Export ZIP\n4. Processing pauses at 92%',
    expected: 'ZIP file should download smoothly upon completion',
    actual: 'Browser memory peaked at 3.2GB and tab froze momentarily',
    severity: 'High',
    status: 'Investigating',
    createdAt: '2026-10-26T20:10:00Z',
    sysInfo: {
      browser: 'Google Chrome 130.0',
      os: 'Windows 11 (64-bit)',
      screen: '2560 × 1440',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0'
    },
    solution: 'Recommend selecting 720p or 1080p target resolution for long 45+ minute videos, or batching 5 clips at a time to prevent browser V8 heap limit exhaustion.'
  },
  {
    id: 'BUG-402',
    tool: '5-Second Intro Bumper Overlay',
    title: 'Subtitle text truncates if longer than 35 characters on mobile portrait preview',
    steps: '1. Opened clipper on iPhone 15 Safari\n2. Entered 45 character title and long subtitle\n3. Preview shows trailing characters cut off',
    expected: 'Text should wrap automatically to second line',
    actual: 'Text overflows canvas container boundary',
    severity: 'Medium',
    status: 'Resolved',
    createdAt: '2026-10-25T16:00:00Z',
    sysInfo: {
      browser: 'Apple Safari 17.5',
      os: 'iOS 17.5',
      screen: '393 × 852',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X)'
    },
    solution: 'Canvas overlay auto-scales font size using canvasOverlay.js measureText calculation.'
  }
];

// Initial user list
const DEFAULT_USERS = [
  {
    id: 'USR-901',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techcreators.io',
    tier: 'Pro Creator',
    videosProcessed: 42,
    storageSaved: '14.8 GB',
    lastActive: '10 mins ago',
    status: 'Active',
    browser: 'Chrome / Windows 11'
  },
  {
    id: 'USR-902',
    name: 'Marcus Brody',
    email: 'marcus.brody@streamteam.gg',
    tier: 'Free',
    videosProcessed: 18,
    storageSaved: '6.2 GB',
    lastActive: '2 hours ago',
    status: 'Needs Assistance',
    browser: 'Edge / Windows 11'
  },
  {
    id: 'USR-903',
    name: 'Elena Rostova',
    email: 'elena@vfxstudio.design',
    tier: 'Studio Team',
    videosProcessed: 128,
    storageSaved: '54.1 GB',
    lastActive: '1 day ago',
    status: 'Resolved',
    browser: 'Safari / macOS'
  },
  {
    id: 'USR-904',
    name: 'David Kim',
    email: 'david.kim@gaminghub.tv',
    tier: 'Pro Creator',
    videosProcessed: 64,
    storageSaved: '28.3 GB',
    lastActive: '3 days ago',
    status: 'Resolved',
    browser: 'Chrome / macOS'
  },
  {
    id: 'USR-905',
    name: 'Liam O’Connor',
    email: 'liam@podcraft.fm',
    tier: 'Free',
    videosProcessed: 9,
    storageSaved: '3.4 GB',
    lastActive: '5 hours ago',
    status: 'Active',
    browser: 'Firefox / Linux'
  }
];

export function getTickets() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TICKETS);
    return data ? JSON.parse(data) : DEFAULT_TICKETS;
  } catch {
    return DEFAULT_TICKETS;
  }
}

export function saveTickets(tickets) {
  try {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  } catch (e) {
    console.error('Failed to save tickets:', e);
  }
}

export function addTicket(ticketData) {
  const tickets = getTickets();
  const newTicket = {
    id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
    name: ticketData.name || 'Anonymous User',
    email: ticketData.email || 'user@example.com',
    category: ticketData.category || 'General Inquiry',
    subject: ticketData.subject || 'User Question',
    message: ticketData.message || '',
    priority: 'Normal',
    status: 'Open',
    createdAt: new Date().toISOString(),
    replies: []
  };
  tickets.unshift(newTicket);
  saveTickets(tickets);
  return newTicket;
}

export function replyToTicket(ticketId, replyMessage) {
  const tickets = getTickets();
  const ticket = tickets.find(t => t.id === ticketId);
  if (ticket) {
    ticket.replies.push({
      sender: 'Admin Support',
      message: replyMessage,
      timestamp: new Date().toISOString()
    });
    ticket.status = 'Resolved';
    saveTickets(tickets);
  }
  return tickets;
}

export function updateTicketStatus(ticketId, newStatus) {
  const tickets = getTickets();
  const ticket = tickets.find(t => t.id === ticketId);
  if (ticket) {
    ticket.status = newStatus;
    saveTickets(tickets);
  }
  return tickets;
}

export function getBugs() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BUGS);
    return data ? JSON.parse(data) : DEFAULT_BUGS;
  } catch {
    return DEFAULT_BUGS;
  }
}

export function saveBugs(bugs) {
  try {
    localStorage.setItem(STORAGE_KEYS.BUGS, JSON.stringify(bugs));
  } catch (e) {
    console.error('Failed to save bugs:', e);
  }
}

export function addBugReport(bugData) {
  const bugs = getBugs();
  const newBug = {
    id: `BUG-${Math.floor(400 + Math.random() * 600)}`,
    tool: bugData.tool || 'General Glitch',
    title: bugData.title || 'Untitled Issue',
    steps: bugData.steps || 'N/A',
    expected: bugData.expected || 'N/A',
    actual: bugData.actual || 'N/A',
    severity: bugData.severity || 'Medium',
    status: 'Open',
    createdAt: new Date().toISOString(),
    sysInfo: bugData.sysInfo || {
      browser: navigator.userAgent,
      os: 'Detected System',
      screen: `${window.screen.width} × ${window.screen.height}`
    },
    solution: ''
  };
  bugs.unshift(newBug);
  saveBugs(bugs);
  return newBug;
}

export function updateBugStatus(bugId, newStatus, solutionText = '') {
  const bugs = getBugs();
  const bug = bugs.find(b => b.id === bugId);
  if (bug) {
    bug.status = newStatus;
    if (solutionText) bug.solution = solutionText;
    saveBugs(bugs);
  }
  return bugs;
}

export function getUsers() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : DEFAULT_USERS;
  } catch {
    return DEFAULT_USERS;
  }
}

export function isAdminAuthenticated() {
  try {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(auth) {
  try {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, auth ? 'true' : 'false');
  } catch {}
}
