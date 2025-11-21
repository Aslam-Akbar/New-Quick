export const clientData = {
  clientInfo: {
    name: "Acme Corp",
    contact: "John Doe",
    plan: "Enterprise"
  },
  stats: {
    activeProjects: 1,
    totalSpent: 4500,
    openTickets: 0,
    nextMeeting: "Nov 24, 10:00 AM"
  },
  currentProject: {
    title: "E-Commerce App Refactor",
    progress: 65,
    status: "Development Phase",
    timeline: [
      { label: "Discovery", status: "completed" },
      { label: "Design", status: "completed" },
      { label: "Dev", status: "in-progress" },
      { label: "QA", status: "pending" }
    ]
  },
  recentFiles: [
    { name: "Invoice #101.pdf", type: "PDF" },
    { name: "Sprint_3_Report.pdf", type: "PDF" },
    { name: "Android_Build_v4.apk", type: "APK" }
  ]
};
