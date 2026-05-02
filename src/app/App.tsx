import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  Layers3,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  Moon,
  Send,
  Sparkles,
  Sun,
  UserRound,
  Zap,
} from 'lucide-react';
import '../styles/portfolio.css';

const profile = {
  name: 'Julian Mari Geronimo Laude',
  headline: 'Computer Science Graduate',
  role: 'Technology, Data & Research Support',
  email: 'laudejulianmari@gmail.com',
  location: 'Naval, Biliran',
  linkedin: 'https://www.linkedin.com/in/julian-mari-laude-6aaa19405/',
};

const traits = [
  { label: 'Data Driven Mindset', icon: Brain },
  { label: 'Problem Solver', icon: Code2 },
  { label: 'Insight Focused', icon: BarChart3 },
  { label: 'Always Learning', icon: Zap },
];

const aboutChecks = [
  'Data analysis & interpretation',
  'Statistical thinking',
  'Problem solving mindset',
  'Strong attention to detail',
  'Collaborative team player',
  'Quick learner',
  'Passionate about practical solutions',
  'Continuous improvement',
];

const skillGroups = [
  {
    title: 'Languages',
    items: [
      { name: 'Python', symbol: 'Py', className: 'python' },
      { name: 'SQL', symbol: 'DB', className: 'sql' },
    ],
  },
  {
    title: 'Libraries & Frameworks',
    items: [
      { name: 'Pandas', symbol: 'pd', className: 'pandas' },
      { name: 'NumPy', symbol: 'np', className: 'numpy' },
      { name: 'Matplotlib', symbol: 'Mt', className: 'matplotlib' },
      { name: 'Seaborn', symbol: 'Sb', className: 'seaborn' },
    ],
  },
  {
    title: 'Tools & Technologies',
    items: [
      { name: 'Jupyter', symbol: 'ipynb', className: 'jupyter' },
      { name: 'VS Code', symbol: '<>', className: 'vscode' },
      { name: 'Git', symbol: 'git', className: 'git' },
      { name: 'Excel', symbol: 'xl', className: 'excel' },
      { name: 'Power BI', symbol: 'bi', className: 'powerbi' },
    ],
  },
  {
    title: 'DOST / TaskPro Stack',
    items: [
      { name: 'REST APIs', symbol: 'API', className: 'api' },
      { name: 'Database', symbol: 'DB', className: 'databaseSkill' },
      { name: 'GIS Mapping', symbol: 'GIS', className: 'gisSkill' },
      { name: 'PDF / Excel', symbol: 'PDF', className: 'pdfSkill' },
      { name: 'PythonAnywhere', symbol: 'PA', className: 'deploySkill' },
      { name: 'Role Access', symbol: 'RB', className: 'roleSkill' },
    ],
  },
];

const projects = [
  {
    title: 'NSTP Management System',
    description: 'Full-stack PERN platform for NSTP enrollment, attendance, assessments, grade computation, and PDF/Excel reports.',
    type: 'database',
    status: 'Internship Project',
  },
  {
    title: 'Research Support Workflow',
    description: 'Academic research support process for literature review organization, research structuring, and clean written outputs.',
    type: 'chart',
    status: 'Freelance Work',
  },
  {
    title: 'Analytics Dashboard Concepts',
    description: 'Data-cleaning and visualization practice using Python, SQL, Pandas, Matplotlib, and spreadsheet-based reporting.',
    type: 'bars',
    status: 'Data Practice',
  },
  {
    title: 'Personal Portfolio',
    description: 'Responsive React and TypeScript portfolio with dark/light mode, case-study pages, project previews, and downloadable CV.',
    type: 'network',
    status: 'Live Website',
  },
];

const taskProFeatures = [
  'Centralized proposal intake, review, approval, decline, tracking, and conversion into monitored projects.',
  'Built role-based workspaces for administrators, PSTO staff, proponents, and beneficiaries with searchable and filterable records.',
  'Added GIS project mapping, budget allocation tracking, staff tasks, extension requests, audit logs, calendar workflows, and report exports.',
  'Supported PDF/Excel export, print-ready reports, digital signatures, document handling, simple mode, and light/dark responsive layouts.',
];

const taskProPreviews = [
  { label: 'Budget Management', type: 'budget', image: '/taskpro/budget-management.png', detail: 'Fund utilization, allocation health, delivery rate, and budget charts.' },
  { label: 'Proposals', type: 'proposals', image: '/taskpro/proposals.png', detail: 'Proposal review, approval, revision, rejection, document status, and conversion workflows.' },
  { label: 'Projects Table', type: 'table', image: '/taskpro/projects-table.png', detail: 'Searchable project database with status, municipality, agency, and action controls.' },
  { label: 'Communication Hub', type: 'communication', image: '/taskpro/communication-hub.png', detail: 'Messages, group chats, announcements, and schedule reminders.' },
  { label: 'Reports', type: 'reports', image: '/taskpro/reports.png', detail: 'Visual reports with PDF, Excel, and print-ready exports.' },
  { label: 'Calendar', type: 'calendar', image: '/taskpro/calendar.png', detail: 'Deadlines, events, tasks, meetings, reminders, and agenda tracking.' },
  { label: 'Settings', type: 'settings', image: '/taskpro/settings.png', detail: 'Profile, account, notification, preferences, security, and signature controls.' },
  { label: 'Login', type: 'login', image: '/taskpro/login.png', detail: 'Branded sign-in flow for the project monitoring system.' },
  { label: 'TaskPro Identity', type: 'identity', image: '/taskpro/taskpro-identity.png', detail: 'Compact branded identity preview for TaskPro and DOST Biliran.' },
];

function HeroVisual() {
  return (
    <div className="landing-hero-visual" aria-hidden="true">
      <div className="visual-card visual-chart">
        <span />
        <svg viewBox="0 0 320 170">
          <path d="M20 124 C50 92 67 105 88 82 C113 52 139 106 166 72 C192 42 215 58 242 28 C274 -2 284 38 304 20" />
        </svg>
        <div className="visual-bars">
          {Array.from({ length: 9 }).map((_, index) => <i key={index} />)}
        </div>
      </div>
      <div className="visual-card visual-donut">
        <span />
        <div />
      </div>
      <div className="visual-floor" />
      <i className="orb orb-1" />
      <i className="orb orb-2" />
      <i className="orb orb-3" />
    </div>
  );
}

function ProjectIcon({ type }: { type: string }) {
  return (
    <div className={`landing-project-icon ${type}`}>
      <i />
      <i />
      <i />
    </div>
  );
}

function TaskProLogo() {
  return (
    <div className="taskpro-logo" aria-label="TaskPro logo">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

function TaskProPreview({ type, image, label }: { type: string; image?: string; label?: string }) {
  const titleMap: Record<string, string> = {
    gis: 'Dashboard',
    budget: 'Budget Management',
    table: 'Projects',
    proposals: 'Proposals',
    communication: 'Communication Hub',
    reports: 'Reports',
    calendar: 'Calendar',
    settings: 'Settings',
    login: 'TaskPro',
    identity: 'TaskPro',
  };

  return (
    <div className={`taskpro-preview ${type}`}>
      {image && (
        <img
          className="taskpro-screenshot"
          src={image}
          alt={label ? `${label} screenshot` : 'TaskPro screenshot'}
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      )}
      <div className="preview-sidebar">
        <TaskProLogo />
        <i />
        <i />
        <i />
      </div>
      <div className="preview-body">
        <div className="preview-topbar">
          <span />
          <strong>{titleMap[type]}</strong>
        </div>
        <div className="preview-content">
          {type === 'gis' && (
            <>
              <div className="preview-map"><i /><i /><i /><i /></div>
              <div className="preview-stats"><span /><span /><span /></div>
            </>
          )}
          {type === 'budget' && (
            <>
              <div className="preview-metrics"><span /><span /><span /></div>
              <div className="preview-charts"><i /><i /></div>
            </>
          )}
          {type === 'table' && (
            <div className="preview-table">
              {Array.from({ length: 7 }).map((_, index) => <span key={index} />)}
            </div>
          )}
          {type === 'communication' && (
            <>
              <div className="preview-message-panel"><span /><span /><span /></div>
              <div className="preview-message-list">
                {Array.from({ length: 4 }).map((_, index) => <span key={index} />)}
              </div>
            </>
          )}
          {type === 'reports' && (
            <>
              <div className="preview-report-cards"><span /><span /><span /></div>
              <div className="preview-charts"><i /><i /></div>
            </>
          )}
          {type === 'calendar' && (
            <div className="preview-calendar">
              {Array.from({ length: 21 }).map((_, index) => <span key={index} />)}
            </div>
          )}
          {type === 'settings' && (
            <>
              <div className="preview-profile"><span /><strong /></div>
              <div className="preview-form-lines">
                {Array.from({ length: 4 }).map((_, index) => <span key={index} />)}
              </div>
            </>
          )}
          {type === 'login' && (
            <div className="preview-login">
              <TaskProLogo />
              <strong>TaskPro</strong>
              <span />
              <span />
              <i />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ icon: Icon, children }: { icon: typeof UserRound; children: string }) {
  return (
    <div className="landing-section-heading">
      <span><Icon size={20} /></span>
      <h2>{children}</h2>
    </div>
  );
}

function TaskProCaseStudy({ onBack }: { onBack: () => void }) {
  const techStack = [
    { group: 'Frontend', items: ['React', 'TypeScript', 'Responsive UI', 'Dark / Light Mode'] },
    { group: 'Backend', items: ['Python', 'REST APIs', 'Role-Based Access', 'PythonAnywhere'] },
    { group: 'Data & Maps', items: ['Database Records', 'GIS Mapping', 'Charts', 'Search & Filters'] },
    { group: 'Exports', items: ['PDF Reports', 'Excel Reports', 'Print Support', 'Digital Signatures'] },
  ];

  return (
    <section className="project-case-page">
      <aside className="case-side-rail" aria-label="Project shortcut navigation">
        <Code2 size={31} />
        <nav>
          <a href="#home" onClick={onBack} aria-label="Home"><ArrowRight size={22} /></a>
          <a href="#about" onClick={onBack} aria-label="About"><UserRound size={22} /></a>
          <a href="#skills" onClick={onBack} aria-label="Skills"><Code2 size={22} /></a>
          <a href="#experience" onClick={onBack} aria-label="Experience"><BriefcaseBusiness size={22} /></a>
          <a className="active" href="#taskpro-case-title" aria-label="Projects"><Layers3 size={24} /></a>
          <a href="#contact" onClick={onBack} aria-label="Contact"><Mail size={22} /></a>
        </nav>
        <div>
          <span><Sun size={16} /></span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={18} /></a>
        </div>
      </aside>
      <div className="case-study-topbar">
        <button type="button" onClick={onBack}>
          <ArrowRight size={16} />
          Back to Projects
        </button>
      </div>

      <div className="case-study-hero">
        <div className="case-study-copy">
          <TaskProLogo />
          <div>
            <span>Featured Project</span>
            <h2 id="taskpro-case-title">TaskPro - DOST Biliran Project & Proposal Management Platform</h2>
            <p>
              A centralized web platform for managing DOST Biliran projects and proposals, streamlining tracking, reporting, collaboration,
              GIS visibility, budget monitoring, and document workflows in one system.
            </p>
            <div className="taskpro-tags">
              <span>Project Management</span>
              <span>Proposal Tracking</span>
              <span>GIS Dashboard</span>
              <span>PDF/Excel Reports</span>
              <span>Role-Based Access</span>
            </div>
            <div className="case-study-actions">
              <a className="taskpro-link" href="https://taskprothesis.pythonanywhere.com/" target="_blank" rel="noreferrer">
                Live Demo
                <ExternalLink size={17} />
              </a>
              <a href="#case-study-features">
                <Code2 size={17} />
                View Code
              </a>
              <a href="#case-study-features">
                <Layers3 size={17} />
                Documentation
              </a>
            </div>
          </div>
        </div>
        <div className="case-study-hero-preview">
          <img src="/taskpro/reports.png" alt="TaskPro dashboard preview" />
        </div>
      </div>

      <nav className="case-study-tabs" aria-label="TaskPro project sections">
        {['Overview', 'Features', 'Tech Stack', 'Screenshots', 'My Role', 'Results', 'What I Learned'].map((item, index) => (
          <a className={index === 0 ? 'active' : ''} href={index === 3 ? '#case-study-screenshots' : '#taskpro-case-title'} key={item}>{item}</a>
        ))}
      </nav>

      <div className="case-study-content">
        <div className="case-overview-row">
          <section className="case-panel">
            <h3>Overview</h3>
            <p>
              TaskPro replaces scattered project and proposal records with one organized workspace for proposal evaluation, implementation tracking,
              reporting, and collaboration. It empowers DOST Biliran to make data-driven decisions with real-time insights and accessible information.
            </p>
            <div className="case-metrics">
              <span><Layers3 size={24} /><strong>24</strong>Total Projects</span>
              <span><LockKeyhole size={24} /><strong>18</strong>Active Projects</span>
              <span><UserRound size={24} /><strong>37</strong>Total Proposals</span>
              <span><BarChart3 size={24} /><strong>2.5x</strong>Faster Reporting</span>
            </div>
          </section>

          <section className="case-panel demo-access-card">
            <h3><LockKeyhole size={20} /> Demo Access</h3>
            <div className="demo-access-lines">
              <p>Email: <strong>admin@gmail.com</strong></p>
              <p>Password: <strong>admin123</strong></p>
            </div>
            <a className="taskpro-link" href="https://taskprothesis.pythonanywhere.com/" target="_blank" rel="noreferrer">
              Visit TaskPro
              <ExternalLink size={17} />
            </a>
          </section>
        </div>

        <div className="case-detail-grid">
          <section id="case-study-features" className="case-panel">
            <h3><CheckCircle2 size={20} /> Features</h3>
            <div className="taskpro-detail-grid">
              {taskProFeatures.map((feature) => (
                <p key={feature}><CheckCircle2 size={18} />{feature}</p>
              ))}
            </div>
          </section>

          <section className="case-panel">
            <h3><Code2 size={20} /> Tech Stack Used</h3>
            <div className="tech-stack-list">
              {techStack.map((group) => (
                <div key={group.group}>
                  <strong>{group.group}</strong>
                  <div className="tech-list">
                    {group.items.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section id="case-study-screenshots" className="case-panel screenshots-panel">
          <h3><BarChart3 size={20} /> Screenshots</h3>
          <div className="case-screenshot-carousel" aria-label="TaskPro screenshot carousel">
            {taskProPreviews.map((preview) => (
              <figure key={preview.type}>
                <img src={preview.image} alt={`${preview.label} screenshot`} />
                <figcaption>{preview.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <div className="case-detail-grid">
          <section className="case-panel">
            <h3><UserRound size={20} /> My Role</h3>
            <strong>Full-Stack Developer</strong>
            <p>Helped develop system workflows, UI modules, database-driven features, report generation, and administrative tools.</p>
          </section>
          <section className="case-panel">
            <h3><CalendarDays size={20} /> Timeline</h3>
            <p>Academic / thesis project development and deployment.</p>
          </section>
          <section className="case-panel">
            <h3><ExternalLink size={20} /> Links</h3>
            <a href="https://taskprothesis.pythonanywhere.com/" target="_blank" rel="noreferrer">Live Demo <ExternalLink size={15} /></a>
          </section>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [status, setStatus] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activePage, setActivePage] = useState<'home' | 'taskpro'>(() => (window.location.hash === '#taskpro' ? 'taskpro' : 'home'));

  const cvText = useMemo(
    () => `${profile.name}
${profile.headline}
${profile.role}
${profile.email}
${profile.location}
${profile.linkedin}

Profile
Computer Science graduate with experience in programming, data analysis, research support, academic writing, and practical digital solutions.

Experience
Intern, HABI Space - Biliran Province State University
Jan 2026 - Present | Naval, Biliran
- Streamlined NSTP processes including enrollment, grading, and reporting into a single digital platform.
- Developed a full-stack NSTP Management System using PostgreSQL, Express.js, React, and Node.js in a team environment.
- Implemented role-based access, municipality-based student assignment, assessments, attendance tracking, grade computation, and PDF/Excel reporting.

Academic Research Support, Freelance | Self-Employed
May 2024 - Present | Naval, Biliran
- Assisted with literature reviews, research structure, and content development.
- Managed client requirements and produced clear, organized academic outputs.

Intern, SDC - Software Development Centre - Danang University
Mar 2026 | Da Nang City, Vietnam
- Applied data analysis concepts using Python and SQL.
- Collaborated in project discussions, code reviews, and iterative development.`,
    [],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(window.location.hash === '#taskpro' ? 'taskpro' : 'home');
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openTaskProPage = () => {
    setActivePage('taskpro');
    window.location.hash = 'taskpro';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openHomePage = (hash = 'home') => {
    setActivePage('home');
    window.location.hash = hash;
  };

  const downloadCV = () => {
    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'julian-mari-geronimo-laude-cv.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus('CV downloaded.');
  };

  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <a className="landing-brand" href="#home" onClick={() => openHomePage('home')}>
          <span className="brand-icon-mark">
            <UserRound size={24} />
            <Sparkles size={12} />
          </span>
          <strong>{profile.name}</strong>
        </a>
        <div className="landing-links">
          <a href="#about" onClick={() => openHomePage('about')}>About</a>
          <a href="#skills" onClick={() => openHomePage('skills')}>Skills</a>
          <a href="#experience" onClick={() => openHomePage('experience')}>Experience</a>
          <a href="#projects" onClick={() => openHomePage('projects')}>Projects</a>
          <a href="#contact" onClick={() => openHomePage('contact')}>Contact</a>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button type="button" onClick={downloadCV}>
            <Download size={16} />
            Download CV
          </button>
        </div>
      </nav>

      {activePage === 'taskpro' ? (
        <TaskProCaseStudy onBack={() => openHomePage('projects')} />
      ) : (
        <>
      <section id="home" className="landing-hero">
        <div className="landing-hero-copy">
          <p>Hello, I'm</p>
          <h1>
            Julian Mari
            <span>Geronimo Laude</span>
          </h1>
          <p className="landing-role">{profile.role}</p>
          <p className="landing-hero-text">I build practical digital solutions, support research work, and turn information into clear, useful outcomes.</p>
          <div className="landing-actions">
            <a href="#contact">Let's Connect <ArrowRight size={18} /></a>
            <a href="#projects">View My Work <ArrowRight size={18} /></a>
          </div>
          <div className="landing-traits">
            {traits.map(({ label, icon: Icon }) => (
              <div key={label}>
                <Icon size={25} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <HeroVisual />
      </section>

      <section id="about" className="landing-about">
        <div>
          <SectionHeading icon={UserRound}>About Me</SectionHeading>
          <p>
            Computer Science graduate with a strong foundation in programming, research support, analysis, and problem-solving. Experienced in organizing
            information, building digital solutions, and communicating clear outputs for different kinds of work.
          </p>
        </div>
        <div className="about-checks">
          {aboutChecks.map((item) => (
            <span key={item}><CheckCircle2 size={18} />{item}</span>
          ))}
        </div>
      </section>

      <section id="skills" className="landing-card landing-skills">
        <SectionHeading icon={Code2}>Skills & Tools</SectionHeading>
        <div className="landing-skill-groups">
          {skillGroups.map((group) => (
            <div className="landing-skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <div>
                {group.items.map((skill) => (
                  <span className="landing-skill" key={skill.name}>
                    <span className={`skill-symbol ${skill.className}`}>{skill.symbol}</span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="landing-card landing-experience">
        <SectionHeading icon={BriefcaseBusiness}>Experience</SectionHeading>
        <article className="landing-experience-card">
          <div className="company-logo habi-logo"><strong>HABI</strong><span>SPACE</span></div>
          <div>
            <div className="experience-heading">
              <div>
                <h3>Intern</h3>
                <p>HABI Space - Biliran Province State University - Internship</p>
              </div>
              <span>Current</span>
            </div>
            <div className="meta-row">
              <span><CalendarDays size={15} />Jan 2026 - Present</span>
              <span><MapPin size={15} />Naval, Biliran</span>
              <span>Team-based</span>
            </div>
            <p>Streamlined NSTP processes including enrollment, grading, and reporting into a single digital platform through a full-stack PERN system.</p>
            <ul>
              <li>Developed NSTP Management System workflows for enrollment, instructional delivery, assessments, attendance, grading, and reports.</li>
              <li>Implemented role-based access for Admin, Facilitator, and Student users plus municipality-based student assignment.</li>
              <li>Built dashboards, REST API workflows, PDF/Excel reporting, and data visibility features using PostgreSQL, Express.js, React, and Node.js.</li>
            </ul>
          </div>
        </article>
        <article className="landing-experience-card">
          <div className="company-logo sdc-logo" aria-label="SDC Software Development Centre logo">
            <span className="sdc-red">SDC</span>
            <span className="sdc-mark" />
            <span className="sdc-blue">DANANG</span>
            <span className="sdc-yellow">Software Development Centre</span>
          </div>
          <div>
            <div className="experience-heading">
              <div>
                <h3>Intern</h3>
                <p>SDC - Software Development Centre - Danang University - Internship</p>
              </div>
              <span>Internship</span>
            </div>
            <div className="meta-row">
              <span><CalendarDays size={15} />Mar 2026</span>
              <span><MapPin size={15} />Da Nang City, Vietnam</span>
              <span>On-site</span>
            </div>
            <p>Gained hands-on experience contributing to software solutions while applying data-driven thinking in a collaborative, fast-paced environment.</p>
            <ul>
              <li>Applied data cleaning, exploration, and visualization concepts using Python and SQL.</li>
              <li>Collaborated in code reviews, project discussions, and iterative development processes.</li>
              <li>Built a stronger foundation in analytics, communication, adaptability, and technical workflows.</li>
            </ul>
          </div>
        </article>
      </section>

      <section id="projects" className="landing-card landing-projects">
        <SectionHeading icon={Layers3}>Projects</SectionHeading>
        <article className="taskpro-feature">
          <button className="taskpro-hero-card" type="button" onClick={openTaskProPage}>
            <TaskProLogo />
            <div>
              <span>Featured System</span>
              <h3>TaskPro - DOST Biliran Project & Proposal Management Platform</h3>
              <p>
                Project and proposal management platform for DOST Biliran.
              </p>
              <div className="taskpro-tags">
                <span>Project Management</span>
                <span>Proposal Tracking</span>
                <span>GIS Dashboard</span>
                <span>PDF/Excel Reports</span>
                <span>Role-Based Access</span>
              </div>
              <span className="taskpro-link">
                View Project Details
                <ArrowRight size={17} />
              </span>
            </div>
          </button>
          <div className="taskpro-carousel" aria-label="TaskPro system preview carousel">
            {taskProPreviews.map((preview) => (
              <button className="taskpro-slide" type="button" onClick={openTaskProPage} key={preview.type}>
                <TaskProPreview type={preview.type} image={preview.image} label={preview.label} />
                <strong>{preview.label}</strong>
              </button>
            ))}
          </div>
        </article>
        <div className="landing-project-grid">
          {projects.map((project) => (
            <article className="landing-project" key={project.title}>
              <ProjectIcon type={project.type} />
              <span>{project.status}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href="#contact">Ask About This <ArrowRight size={16} /></a>
            </article>
          ))}
        </div>
        <a className="view-all" href="#projects">View All Projects <ArrowRight size={16} /></a>
      </section>

      <footer id="contact" className="landing-contact">
        <div className="contact-intro">
          <span><Send size={28} /></span>
          <div>
            <h2>Let's work together!</h2>
            <p>I'm open to opportunities in technology, research, support, and analytical roles.</p>
          </div>
        </div>
        <a href={`mailto:${profile.email}`}><Mail size={22} /><span>Email<strong>{profile.email}</strong></span></a>
        <a href="#contact"><MapPin size={22} /><span>Location<strong>{profile.location}</strong></span></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={22} /><span>LinkedIn<strong>linkedin.com/in/julian-mari-laude</strong></span></a>
        {status && <p className="status-message">{status}</p>}
      </footer>
        </>
      )}
    </main>
  );
}
