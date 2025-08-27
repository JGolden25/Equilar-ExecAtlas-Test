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
        "personName": "Michael Chen",
        "title": "Chief Financial Officer",
        "org": {"name": "Global Finance Solutions"},
        "eventType": "RESIGNATION",
        "source": "TAGGER",
        "effectiveDate": "2025-08-10",
        "reportedDate": "2025-08-12",
        "profileImage": null
      },
      {
        "personName": "Emily Rodriguez",
        "title": "Chief Technology Officer",
        "org": {"name": "Innovation Labs Inc."},
        "eventType": "TITLE_CHANGE",
        "source": "WEBSITE_CHECKER",
        "effectiveDate": "2025-08-01",
        "reportedDate": "2025-08-05",
        "profileImage": null
      },
      {
        "personName": "David Thompson",
        "title": "President",
        "org": {"name": "Enterprise Solutions Group"},
        "eventType": "NEW_POSITION",
        "source": "PE_INFO",
        "effectiveDate": "2025-07-28",
        "reportedDate": "2025-07-30",
        "profileImage": null
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
      }
    ];
  
    for (let i = 0; i < 10; i++) {
      const eventTypes = ["NEW_POSITION", "TITLE_CHANGE", "RESIGNATION", "REMOVED_FROM_WEBSITE"];
      const sources = ["TAGGER", "PRESS_RELEASE", "WEBSITE_CHECKER", "PE_INFO", "COMPANIES_HOUSE", "CRUNCHBASE"];
      const titles = ["CEO", "CFO", "CTO", "COO", "CMO", "CHRO", "CIO", "CLO", "President", "EVP"];
      
      mockData.push({
        "personName": `Executive ${i + 11}`,
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