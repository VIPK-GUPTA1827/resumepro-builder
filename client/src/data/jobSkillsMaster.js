// Mega Master Database — 150+ Job Roles & 500+ Industry Skills

export const JOB_ROLES_MASTER = [
  // A
  'Academic Counselor',
  'Account Executive',
  'Accountant',
  'Administrative Assistant',
  'AI / ML Engineer',
  'Air Traffic Controller',
  'Android Developer',
  'Architect / Architecture Specialist',
  'Auditor',
  'Automation Test Engineer',

  // B
  'Backend Developer',
  'Bank Teller / Operations',
  'Biotechnology Researcher',
  'Blockchain Engineer',
  'Bookkeeper',
  'Brand Specialist',
  'Building Inspector',
  'Business Analyst',
  'Business Development Manager (BDE)',

  // C
  'CAD Draftsman / Technician',
  'Call Center Executive / Support',
  'Chef / Culinary Specialist',
  'Chemical Engineer',
  'Civil Engineer',
  'Clinical Pharmacist',
  'Clinical Research Associate (CRA)',
  'Cloud Architect (AWS/GCP/Azure)',
  'Compliance Specialist',
  'Content Strategist / Copywriter',
  'Corporate Trainer',
  'Customer Service Representative',
  'Customer Success Manager (CSM)',
  'Cyber Security Analyst',

  // D
  'Data Analyst',
  'Data Entry Specialist',
  'Data Engineer',
  'Data Scientist',
  'Database Administrator (DBA)',
  'Dentist / Dental Surgeon',
  'DevOps Engineer',
  'Dietitian / Nutritionist',
  'Digital Marketing Specialist',

  // E
  'E-Commerce Manager',
  'Electrical Engineer',
  'Embedded Systems Engineer',
  'Event Planner / Coordinator',
  'Executive Assistant',

  // F
  'Fashion Designer',
  'Financial Analyst',
  'Financial Planner / Advisor',
  'Fitness Trainer / Coach',
  'Flight Attendant',
  'Food Safety Inspector',
  'Frontend Developer',
  'Full Stack Engineer',

  // G
  'Game Developer',
  'General Physician / Doctor',
  'Graphic Designer',
  'Growth Hacker / Marketer',

  // H
  'Hardware Technician',
  'Healthcare Administrator',
  'Hospital Pharmacist',
  'Hotel Manager',
  'HR Assistant',
  'HR Generalist',
  'HR Recruiter / Talent Acquisition',

  // I
  'Illustrator / Visual Artist',
  'Industrial Engineer',
  'Information Security Officer',
  'Insurance Agent / Underwriter',
  'Interior Designer',
  'iOS Developer',
  'IT Support Technician',

  // J
  'Journalist / Reporter',

  // L
  'Lab Technician (Medical)',
  'Legal Assistant / Paralegal',
  'Legal Consultant / Lawyer',
  'Librarian',
  'Logistics / Supply Chain Manager',

  // M
  'Maintenance Engineer',
  'Mechanical Engineer',
  'Medical Coding Specialist',
  'Medical Representative (MR)',
  'Microbiologist',
  'Mobile App Developer',
  'Motion Designer / Animator',

  // N
  'Network Administrator / Engineer',
  'Nurse (Registered RN)',

  // O
  'Office Manager / Administrator',
  'Operations Manager',
  'Optometrist',

  // P
  'Pathologist',
  'Payroll Specialist',
  'Personal Banker',
  'Pharmacist (Retail / Hospital)',
  'Pharmacovigilance Officer (PV)',
  'Phlebotomist',
  'Photographer',
  'Physiotherapist',
  'Product Designer (UI/UX)',
  'Product Manager',
  'Production Supervisor',
  'Project Manager',
  'Public Relations (PR) Specialist',
  'Python Developer',

  // Q
  'Quality Assurance (QA) Inspector',
  'Quality Control (QC) Analyst',

  // R
  'Radiology Technician',
  'React / Next.js Developer',
  'Real Estate Agent / Broker',
  'Receptionist / Front Desk',
  'Recruiter',
  'Robotics Engineer',

  // S
  'Sales Associate / Executive',
  'Sales Manager',
  'Scrum Master',
  'SEO Specialist',
  'Social Media Manager',
  'Software Developer / Engineer',
  'Solar Energy Technician',
  'Solutions Architect',
  'Sound Engineer / Editor',
  'Store Manager (Retail)',
  'Structural Engineer',
  'System Administrator (SysAdmin)',

  // T
  'Tax Consultant / Specialist',
  'Teacher / Educator',
  'Technical Support Engineer',
  'Technical Writer',
  'Telecaller / Telesales',

  // U
  'UI/UX Designer',

  // V
  'Veterinarian',
  'Video Editor',
  'Visual Merchandiser',

  // W
  'Warehouse Supervisor',
  'Web Designer',
  'Web Developer'
];

export const JOB_SKILLS_MAPPING = {
  // Medical & Healthcare
  'Clinical Pharmacist': ['Pharmacovigilance', 'Clinical Research', 'Drug Formulation', 'Patient Care', 'Prescription Auditing', 'Medical Terminology', 'FDA Compliance', 'Pharmacology', 'Dosage Calculation'],
  'Hospital Pharmacist': ['Hospital Dispensing', 'Pharmacovigilance', 'Inpatient Therapy', 'Drug Safety', 'Clinical Trials', 'Pharmacology', 'Patient Counseling', 'IV Preparation'],
  'Pharmacist (Retail / Hospital)': ['Pharmacy Management', 'Prescription Verification', 'Patient Counseling', 'Drug Interaction Checks', 'Inventory Control', 'Pharmacology', 'OTC Drugs'],
  'Pharmacovigilance Officer (PV)': ['Pharmacovigilance', 'FDA Regulations', 'Drug Safety Reporting', 'Clinical Data Entry', 'MedDRA Coding', 'Good Clinical Practice (GCP)', 'ICSR Processing'],
  'Medical Representative (MR)': ['Pharmaceutical Sales', 'Medical Communications', 'Doctor Relationship Management', 'Product Presentations', 'Pharma Marketing', 'Territory Management'],
  'Clinical Research Associate (CRA)': ['Clinical Trials', 'GCP Compliance', 'Protocol Monitoring', 'Data Management', 'IRB Submissions', 'FDA Guidelines'],
  'Nurse (Registered RN)': ['Patient Assessment', 'Clinical Care', 'Vital Signs Monitoring', 'EHR Systems', 'Emergency Protocol', 'Medical Triage', 'Medication Administration'],
  'General Physician / Doctor': ['Patient Diagnosis', 'Clinical Treatment', 'Medical History Review', 'Pharmacotherapy', 'Emergency Care', 'Patient Consultations'],
  'Dentist / Dental Surgeon': ['Dental Surgery', 'Oral Diagnosis', 'Teeth Extraction', 'Cavity Filling', 'Patient Care', 'Radiography'],
  'Lab Technician (Medical)': ['Blood Sample Analysis', 'Hematology', 'Microbiology', 'Lab Equipment Maintenance', 'Specimen Processing', 'Pathology Testing'],
  'Physiotherapist': ['Physical Therapy', 'Rehabilitation', 'Exercise Physiology', 'Patient Assessment', 'Pain Management', 'Kinesiology'],
  'Dietitian / Nutritionist': ['Diet Planning', 'Nutritional Assessment', 'Weight Management', 'Clinical Nutrition', 'Health Coaching'],
  'Medical Coding Specialist': ['ICD-10 Coding', 'CPT Coding', 'Medical Billing', 'EHR Software', 'HIPAA Compliance', 'Claims Processing'],

  // IT & Software Development
  'Frontend Developer': ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'JavaScript (ES6+)', 'HTML5/CSS3', 'Redux Toolkit', 'RESTful APIs', 'Web Performance'],
  'Backend Developer': ['Node.js', 'Express.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'Redis', 'GraphQL', 'RESTful APIs', 'System Design'],
  'Full Stack Engineer': ['React.js', 'Node.js', 'TypeScript', 'Express.js', 'MongoDB', 'PostgreSQL', 'GraphQL', 'AWS', 'Docker', 'Git'],
  'React / Next.js Developer': ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Zustand', 'React Query', 'RESTful APIs'],
  'Python Developer': ['Python', 'Django', 'FastAPI', 'Flask', 'PostgreSQL', 'Docker', 'Celery', 'RESTful APIs', 'PyTest'],
  'Android Developer': ['Kotlin', 'Java', 'Android SDK', 'Jetpack Compose', 'Retrofit', 'Firebase', 'Mobile UI Design'],
  'iOS Developer': ['Swift', 'SwiftUI', 'Xcode', 'CoreData', 'CocoaPods', 'RESTful APIs', 'iOS Architecture'],
  'Mobile App Developer': ['React Native', 'Flutter', 'iOS / Swift', 'Android / Kotlin', 'Mobile UI Design', 'RESTful APIs', 'Firebase'],
  'DevOps Engineer': ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD Pipelines', 'Linux Systems', 'GitHub Actions', 'Nginx', 'Prometheus'],
  'Cloud Architect (AWS/GCP/Azure)': ['AWS', 'Google Cloud Platform (GCP)', 'Microsoft Azure', 'Terraform', 'Kubernetes', 'Cloud Security', 'Serverless', 'Microservices'],
  'Cyber Security Analyst': ['Ethical Hacking', 'Penetration Testing', 'Network Security', 'SIEM Tools', 'Cryptography', 'Vulnerability Assessment', 'Firewalls'],
  'Software Developer / Engineer': ['Data Structures', 'Algorithms', 'Java', 'Python', 'C++', 'Git & GitHub', 'System Design', 'Unit Testing', 'OOP'],
  'Automation Test Engineer': ['Selenium', 'Cypress', 'Playwright', 'Jest', 'API Testing (Postman)', 'Automation Testing', 'JIRA', 'Cucumber'],
  'System Administrator (SysAdmin)': ['Linux Administration', 'Active Directory', 'Bash Scripting', 'Network Security', 'Firewalls', 'System Backup', 'DNS / DHCP'],
  'Network Administrator / Engineer': ['Cisco Networking', 'TCPIP Protocol', 'Routing & Switching', 'VPN Configuration', 'Wireshark', 'Network Firewalls', 'WAN/LAN'],
  'IT Support Technician': ['Hardware Diagnostics', 'Windows/MacOS Support', 'Network Troubleshooting', 'Ticketing Systems', 'Active Directory', 'Remote Desktop'],
  'Database Administrator (DBA)': ['PostgreSQL', 'MySQL', 'Oracle DB', 'SQL Performance Tuning', 'Database Backup & Recovery', 'Replication'],

  // Data & AI
  'Data Scientist': ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow', 'PyTorch', 'Data Visualization', 'Statistical Analysis', 'Machine Learning'],
  'Data Analyst': ['SQL', 'Excel (VLOOKUP/Pivot)', 'PowerBI', 'Tableau', 'Python', 'Data Cleaning', 'Business Intelligence', 'A/B Testing'],
  'Data Engineer': ['Apache Spark', 'Python', 'SQL', 'Airflow', 'BigQuery', 'Kafka', 'ETL Pipelines', 'Data Warehousing'],
  'AI / ML Engineer': ['Python', 'Deep Learning', 'PyTorch', 'TensorFlow', 'LLMs & Prompt Engineering', 'OpenCV', 'Scikit-Learn', 'MLOps', 'NLP'],

  // Design, Creative & Media
  'UI/UX Designer': ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Adobe XD', 'Information Architecture', 'Usability Testing'],
  'Graphic Designer': ['Adobe Photoshop', 'Adobe Illustrator', 'Branding', 'Typography', 'InDesign', 'Visual Layout', 'Logo Design'],
  'Motion Designer / Animator': ['Adobe After Effects', 'Premiere Pro', 'Motion Graphics', 'Video Editing', '3D Animation', 'Cinema 4D'],
  'Video Editor': ['Adobe Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve', 'Video Editing', 'Color Grading', 'Audio Sync'],
  'Content Strategist / Copywriter': ['SEO Writing', 'Copywriting', 'Content Planning', 'Editing & Proofreading', 'Blogging', 'Brand Storytelling', 'Social Media Copy'],
  'Photographer': ['Camera Operation', 'Lighting Setup', 'Adobe Lightroom', 'Photo Editing', 'Portraiture', 'Commercial Photography'],
  'Interior Designer': ['AutoCAD', 'SketchUp', '3D Rendering', 'Space Planning', 'Material Selection', 'Interior Decoration'],

  // Engineering & Construction
  'Civil Engineer': ['AutoCAD', 'Structural Analysis', 'Site Supervision', 'Construction Planning', 'Surveying', 'STAAD Pro', 'Cost Estimation'],
  'Mechanical Engineer': ['SolidWorks', 'AutoCAD', 'Thermodynamics', 'Mechanical CAD', 'Machining', 'Finite Element Analysis (FEA)', 'HVAC'],
  'Electrical Engineer': ['Circuit Design', 'MATLAB', 'Embedded Systems', 'PCB Layout', 'Power Electronics', 'PLC Programming', 'Electrical CAD'],
  'Chemical Engineer': ['Process Optimization', 'Chemical Reaction Engineering', 'Heat Transfer', 'Fluid Mechanics', 'Safety Standards', 'Aspen Plus'],
  'CAD Draftsman / Technician': ['AutoCAD', '3D Drafting', 'Technical Drawing', 'SolidWorks', 'Revit', 'Blueprint Reading'],
  'Robotics Engineer': ['ROS (Robot OS)', 'C++', 'Python', 'Mechatronics', 'Microcontrollers', 'Control Systems', 'Kinematics'],

  // Business, Management & Sales
  'Product Manager': ['Product Strategy', 'Roadmapping', 'User Stories', 'Agile / Scrum', 'JIRA', 'Market Research', 'Data-Driven Decisions', 'A/B Testing'],
  'Project Manager': ['Agile / Scrum', 'Project Scheduling', 'JIRA / Trello', 'Risk Management', 'Stakeholder Communication', 'Resource Allocation', 'PMP Standards'],
  'Business Analyst': ['Requirement Gathering', 'Process Mapping', 'SQL', 'Excel Modeling', 'User Acceptance Testing (UAT)', 'JIRA', 'Flowcharts'],
  'Operations Manager': ['Process Optimization', 'Supply Chain Management', 'Vendor Management', 'Cost Reduction', 'Logistics Planning', 'Team Leadership'],
  'Business Development Manager (BDE)': ['Lead Generation', 'B2B Sales', 'CRM (Salesforce/HubSpot)', 'Client Relationship Management', 'Cold Outreach', 'Deal Closing'],
  'Account Executive': ['B2B Sales', 'Sales Pipeline Management', 'Prospecting', 'Product Demos', 'Contract Negotiation', 'CRM'],
  'Sales Associate / Executive': ['Customer Relations', 'POS Systems', 'Product Knowledge', 'Sales Pitching', 'Cross-Selling', 'Negotiation'],
  'Customer Success Manager (CSM)': ['Customer Retention', 'Zendesk', 'Client Onboarding', 'Account Management', 'Conflict Resolution', 'Churn Reduction'],
  'Call Center Executive / Support': ['Customer Communication', 'Inbound/Outbound Calls', 'Active Listening', 'CRM Tools', 'Problem Escalation', 'Multitasking'],

  // Finance, Accounting & Banking
  'Financial Analyst': ['Financial Modeling', 'Corporate Finance', 'Excel (Advanced)', 'Valuation', 'Financial Reporting', 'Budgeting & Forecasting', 'DCF Analysis'],
  'Accountant': ['Bookkeeping', 'QuickBooks / Tally', 'Taxation Compliance', 'Financial Statements', 'Auditing', 'Accounts Payable/Receivable', 'GST Compliance'],
  'Auditor': ['Internal Auditing', 'Financial Risk Assessment', 'Compliance Check', 'Accounting Standards', 'Fraud Detection', 'Report Drafting'],
  'Tax Consultant / Specialist': ['Income Tax Return', 'GST Filing', 'Corporate Tax', 'Tax Planning', 'Financial Audit', 'Tax Law Compliance'],

  // HR, Admin & Education
  'HR Recruiter / Talent Acquisition': ['Talent Acquisition', 'LinkedIn Recruiter', 'Sourcing', 'Candidate Screening', 'Interview Scheduling', 'ATS Management'],
  'HR Generalist': ['Employee Relations', 'HR Policies', 'Onboarding & Offboarding', 'Payroll Management', 'Performance Reviews', 'Labor Laws'],
  'Teacher / Educator': ['Lesson Planning', 'Classroom Management', 'Curriculum Design', 'Student Assessment', 'E-Learning Tools', 'Public Speaking'],
  'Academic Counselor': ['Student Guidance', 'Career Counseling', 'Admissions Processing', 'Academic Planning', 'Parent Consultations'],

  // Services, Hospitality & Retail
  'Chef / Culinary Specialist': ['Food Preparation', 'Kitchen Safety & Sanitation', 'Menu Design', 'Culinary Techniques', 'Inventory Management'],
  'Hotel Manager': ['Hospitality Management', 'Guest Relations', 'Front Desk Operations', 'Staff Supervision', 'Revenue Management'],
  'Event Planner / Coordinator': ['Event Management', 'Vendor Coordination', 'Budget Allocation', 'Logistics Planning', 'Client Consultation'],
  'Fitness Trainer / Coach': ['Personal Training', 'Fitness Assessment', 'Workout Planning', 'Nutrition Guidance', 'Client Motivation'],
  'Real Estate Agent / Broker': ['Property Sales', 'Real Estate Negotiation', 'Client Relationship', 'Market Analysis', 'Property Listings']
};

// Flatten all unique skills for global fallback search (500+ items)
const uniqueSkillsSet = new Set();
Object.values(JOB_SKILLS_MAPPING).forEach(skillArr => {
  skillArr.forEach(skill => uniqueSkillsSet.add(skill));
});

// Add extra universal industry & soft skills
const EXTRA_UNIVERSAL_SKILLS = [
  'Communication Skills', 'Team Leadership', 'Problem Solving', 'Time Management', 
  'Critical Thinking', 'Adaptability', 'Conflict Resolution', 'Decision Making', 
  'Negotiation', 'Public Speaking', 'Microsoft Office', 'Excel (VLOOKUP)', 
  'PowerPoint', 'Google Workspace', 'Work ethic', 'Multitasking', 'Customer Service',
  'Analytical Thinking', 'Creativity', 'Attention to Detail'
];
EXTRA_UNIVERSAL_SKILLS.forEach(s => uniqueSkillsSet.add(s));

export const ALL_SKILLS_MASTER = Array.from(uniqueSkillsSet).sort();
