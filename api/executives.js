export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const mockData = [
    {
      "personName": "Sarah Johnson",
      "title": "Chief Executive Officer",
      "org": {"name": "TechCorp International"},
      "eventType": "NEW_POSITION",
      "source": "PRESS_RELEASE",
      "effectiveDate": "2025-08-15",
      "reportedDate": "2025-08-20",
      "profileImage": null
    },
    {
      "personName": "Michael Chrome",
      "title": "Chief Financial Officer",
      "org": {"name": "Global Finance Solutions"},
      "eventType": "RESIGNATION",
      "source": "TAGGER",
      "effectiveDate": "2025-08-10",
      "reportedDate": "2025-08-12",
      "profileImage": "https://allprodad.com/wp-content/uploads/2021/03/05-12-21-happy-people.jpg"
    },
    {
      "personName": "Emily Rodriguez",
      "title": "Chief Technology Officer",
      "org": {"name": "Innovation Labs Inc."},
      "eventType": "TITLE_CHANGE",
      "source": "WEBSITE_CHECKER",
      "effectiveDate": "2025-08-01",
      "reportedDate": "2025-08-05",
      "profileImage": "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?cs=srgb&dl=pexels-divinetechygirl-1181690.jpg&fm=jpg"
    },
    {
      "personName": "David Thompson",
      "title": "President",
      "org": {"name": "Enterprise Solutions Group"},
      "eventType": "NEW_POSITION",
      "source": "PE_INFO",
      "effectiveDate": "2025-07-28",
      "reportedDate": "2025-07-30",
      "profileImage": "https://images.unsplash.com/photo-1590086782957-93c06ef21604?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpdGUlMjBndXl8ZW58MHx8MHx8fDA%3D"
    },
    {
      "personName": "Lisa Anderson",
      "title": "Chief Operating Officer",
      "org": {"name": "Operations Excellence Corp"},
      "eventType": "REMOVED_FROM_WEBSITE",
      "source": "COMPANIES_HOUSE",
      "effectiveDate": "2025-07-20",
      "reportedDate": "2025-07-22",
      "profileImage": null
    },
    {
      "personName": "Robert Williams",
      "title": "Executive Vice President",
      "org": {"name": "Strategic Ventures LLC"},
      "eventType": "RESIGNATION",
      "source": "TAGGER_FORM_4",
      "effectiveDate": "2025-07-15",
      "reportedDate": "2025-07-18",
      "profileImage": null
    },
    {
      "personName": "Jennifer Martinez",
      "title": "Chief Marketing Officer",
      "org": {"name": "Brand Dynamics Inc."},
      "eventType": "NEW_POSITION",
      "source": "CRUNCHBASE",
      "effectiveDate": "2025-07-10",
      "reportedDate": "2025-07-12",
      "profileImage": null
    },
    {
      "personName": "James Wilson",
      "title": "Chief Legal Officer",
      "org": {"name": "Legal Associates International"},
      "eventType": "TITLE_CHANGE",
      "source": "IEI",
      "effectiveDate": "2025-07-05",
      "reportedDate": "2025-07-08",
      "profileImage": null
    },
    {
      "personName": "Patricia Brown",
      "title": "Chief Human Resources Officer",
      "org": {"name": "People First Corporation"},
      "eventType": "NEW_POSITION",
      "source": "JCATT",
      "effectiveDate": "2025-06-28",
      "reportedDate": "2025-06-30",
      "profileImage": null
    },
    {
      "personName": "Christopher Lee",
      "title": "Chief Information Officer",
      "org": {"name": "Data Systems Global"},
      "eventType": "RESIGNATION",
      "source": "TAGGER_WEBSITE",
      "effectiveDate": "2025-06-20",
      "reportedDate": "2025-06-22",
      "profileImage": null
    },
    {
      "personName": "Amanda Foster",
      "title": "Chief Strategy Officer",
      "org": {"name": "Strategic Solutions Inc."},
      "eventType": "NEW_POSITION",
      "source": "IEI",
      "effectiveDate": "2025-06-15",
      "reportedDate": "2025-06-18",
      "profileImage": null
    },
    {
      "personName": "Marcus Rodriguez",
      "title": "Executive Vice President",
      "org": {"name": "Growth Partners LLC"},
      "eventType": "TITLE_CHANGE", 
      "source": "JCATT",
      "effectiveDate": "2025-06-10",
      "reportedDate": "2025-06-12",
      "profileImage": null
    },
    {
      "personName": "Rachel Kim",
      "title": "Chief Revenue Officer",
      "org": {"name": "Revenue Excellence Corp"},
      "eventType": "NEW_POSITION",
      "source": "WEBSITE_CHECKER",
      "effectiveDate": "2025-06-05",
      "reportedDate": "2025-06-08",
      "profileImage": null
    }
  ];

  for (let i = 0; i < 7; i++) {
    const eventTypes = ["NEW_POSITION", "TITLE_CHANGE", "RESIGNATION", "REMOVED_FROM_WEBSITE"];
    const sources = ["TAGGER", "PRESS_RELEASE", "WEBSITE_CHECKER", "PE_INFO", "COMPANIES_HOUSE", "CRUNCHBASE", "IEI", "JCATT"];
    const titles = ["CEO", "CFO", "CTO", "COO", "CMO", "CHRO", "CIO", "CLO", "President", "EVP"];
    
    mockData.push({
      "personName": `Executive ${i + 14}`,
      "title": titles[Math.floor(Math.random() * titles.length)],
      "org": {"name": `Company ${String.fromCharCode(65 + i)} Inc.`},
      "eventType": eventTypes[Math.floor(Math.random() * eventTypes.length)],
      "source": sources[Math.floor(Math.random() * sources.length)],
      "effectiveDate": new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "reportedDate": new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "profileImage": null
    });
  }

  res.status(200).json(mockData);
}