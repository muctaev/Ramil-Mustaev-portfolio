const { useState, useEffect, useRef } = React;

const FadeIn = ({ children, className = '', delay = 0, triggerOnLoad = false, as = 'div' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Tag = as;
  const hasDisplayClass = /(^|\s)(block|inline-block|flex|inline-flex|grid|hidden)(\s|$)/.test(className);
  const isInline = as === 'span' && !hasDisplayClass;

  useEffect(() => {
    if (triggerOnLoad) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [triggerOnLoad]);

  return (
    <Tag
      ref={ref}
      className={`fade-in ${className} ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms`, display: isInline ? 'inline-block' : undefined }}
    >
      {children}
    </Tag>
  );
};

const NAV_ITEMS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
];

const PROJECTS = [
  {
    id: 1,
    name: 'SQL Migration Tool',
    subtitle: 'MS SQL → PostgreSQL',
    description: 'Python-based proof-of-concept for migrating and cleansing data from MS SQL Server to PostgreSQL, including data validation and integrity checks. Reflects real-world import-substitution migration scenarios.',
    tags: ['Python', 'pyodbc', 'psycopg2', 'MS SQL Server', 'PostgreSQL'],
    align: 'right',
    diagram: 'migration',
    repo: 'https://github.com/muctaev/ms-sql-migration-to-postgres-etl',
  },
  {
    id: 2,
    name: 'Automated ETL Pipeline',
    subtitle: 'CBR / HH.ru API',
    description: 'Scheduled ETL pipeline that extracts data from public APIs (Central Bank of Russia exchange rates / HH.ru vacancies), transforms it with pandas, and upserts it into a relational database. Orchestrated daily via Windows Task Scheduler.',
    tags: ['Python', 'pandas', 'REST API', 'PostgreSQL', 'Task Scheduler'],
    align: 'left',
    diagram: 'etl',
    repo: 'https://github.com/muctaev/cbr-etl-pipeline',
  },
];

const SKILLS_CATEGORIES = [
  { category: 'DATABASES', skills: ['MS SQL Server (T-SQL)', 'PostgreSQL', 'Database design & normalization'] },
  { category: 'LANGUAGES', skills: ['Python', 'C# (.NET Framework)', 'SQL', 'HTML', 'CSS', 'PHP', 'Java'] },
  { category: 'TOOLS', skills: ['Git & GitHub', 'DBeaver', 'SSMS', 'Windows Task Scheduler', 'Visual Studio', 'Zed'] },
];

const CONTACTS = [
  { label: 'EMAIL', href: 'mailto:muctaevv@gmail.com', meta: 'muctaevv@gmail.com' },
  { label: 'TELEGRAM', href: 'https://t.me/muctaev', meta: '@muctaev' },
  { label: 'GITHUB', href: 'https://github.com/muctaev', meta: 'muctaev' },
];

const ABOUT_BLOCKS = [
  { n: '01', title: 'DATABASE DESIGN', desc: 'Building normalized relational schemas and writing optimized T-SQL.' },
  { n: '02', title: 'ETL PIPELINES', desc: 'Extracting, transforming, and loading data with Python and pandas.' },
  { n: '03', title: 'ANALYTICS', desc: 'Creating data marts with window functions, CTEs, and stored procedures.' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-3 header-blur' : 'py-6'}`}>
        <div className="px-[5vw] lg:px-[6vw] flex items-center justify-between">
          <a href="#top" aria-label="RAMIL. — back to top" onClick={(e) => { e.preventDefault(); scrollTop(); }}
             className="brand-mark group" title="RAMIL.">
            <span className="stripe-1"></span>
            <span className="stripe-2"></span>
            <span className="stripe-3"></span>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="nav-link text-text-secondary text-[11px] tracking-[0.25em] font-medium uppercase">
                {item.label}
              </button>
            ))}
          </nav>

          <FadeIn as="span" delay={600} triggerOnLoad className="hidden md:flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-text-secondary">
            <span className="live-dot"></span>
            <span>AVAILABLE</span>
          </FadeIn>

          <button onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-[6px] items-end w-8 h-8 justify-center" aria-label="Menu">
            <span className={`block h-[1px] bg-text-primary transition-all duration-500 ${menuOpen ? 'w-5 rotate-45 translate-y-[3.5px]' : 'w-6'}`}></span>
            <span className={`block h-[1px] bg-text-primary transition-all duration-500 ${menuOpen ? 'w-5 -rotate-45 -translate-y-[3.5px]' : 'w-4'}`}></span>
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 bg-bg-primary lg:hidden mobile-menu ${menuOpen ? 'visible' : 'hidden'}`}>
        <nav className="h-full flex flex-col items-center justify-center gap-10 pt-20">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="display-regular text-text-primary text-5xl">
              {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
            </button>
          ))}
          <div className="mt-6 flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-text-secondary">
            <span className="live-dot"></span>
            <span>Available for projects</span>
          </div>
        </nav>
      </div>
    </>
  );
};

const HERO_IMG_PRIMARY = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2400&q=80';
const HERO_IMG_FALLBACK = 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=2400&q=80';

const Hero = () => {
  const imgRef = useRef(null);
  const handleImageLoad = (e) => e.currentTarget.classList.add('is-loaded');
  const handleImageError = (e) => {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = 'true';
    img.src = HERO_IMG_FALLBACK;
  };

  return (
    <section id="top" className="relative min-h-[100vh] w-full overflow-hidden">
      <div className="absolute inset-0 z-0 hero-bg">
        <div className="absolute inset-0 kenburns">
          <img ref={imgRef} src={HERO_IMG_PRIMARY} alt="" onLoad={handleImageLoad} onError={handleImageError}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.6) contrast(1.1) saturate(0.9)' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-transparent to-[#0A0A0A]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]/30"></div>
      </div>

      <div className="relative z-10 min-h-[100vh] flex flex-col">
        {/* Top meta */}
        <div className="px-[5vw] lg:px-[6vw] pt-32 md:pt-36 flex justify-between items-start text-[10px] tracking-[0.25em] uppercase text-text-secondary">
          <div className="flex flex-col gap-2">
            <FadeIn as="span" delay={200} triggerOnLoad>PORTFOLIO — 2026</FadeIn>
            <FadeIn as="span" delay={350} triggerOnLoad className="hidden md:inline">RAMIL MUSTAEV</FadeIn>
          </div>
          <div className="hidden md:flex flex-col gap-2 text-right">
            <FadeIn as="span" delay={400} triggerOnLoad>JUNIOR DATA ENGINEER</FadeIn>
            <FadeIn as="span" delay={550} triggerOnLoad>SQL & PYTHON DEVELOPER</FadeIn>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-end px-[5vw] lg:px-[6vw] pb-8 md:pb-12">
          <div className="mb-6 md:mb-8">
            <FadeIn delay={300} triggerOnLoad className="text-[10px] tracking-[0.3em] uppercase text-accent mb-5">
              — JUNIOR DATA ENGINEER | SQL & PYTHON DEVELOPER
            </FadeIn>

            <h1 className="hero-title display-light text-text-primary">
              <FadeIn as="span" delay={500} triggerOnLoad className="block">Ramil</FadeIn>
              <FadeIn as="span" delay={700} triggerOnLoad className="block display-italic">Mustaev</FadeIn>
            </h1>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
            <div className="col-span-12 lg:col-span-7">
              <FadeIn delay={1100} triggerOnLoad>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl">
                  College student with a strong background in MS SQL Server and C#. I design relational databases, build ETL pipelines in Python, and turn raw data into business insights.
                </p>
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <FadeIn delay={1350} triggerOnLoad>
                <div className="flex flex-wrap items-center gap-6 md:gap-8 lg:justify-end">
                  <a href="assets/Mustaev_DE_Resume.pdf" className="nav-link text-text-secondary text-[11px] tracking-[0.25em] font-medium uppercase">Download Resume</a>
                  <a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer" className="nav-link text-text-secondary text-[11px] tracking-[0.25em] font-medium uppercase">My GitHub</a>
                  <a href="https://t.me/YOUR_USERNAME" target="_blank" rel="noopener noreferrer" className="nav-link text-text-secondary text-[11px] tracking-[0.25em] font-medium uppercase">Telegram</a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Bottom meta labels */}
        <div className="px-[5vw] lg:px-[6vw] pb-6 md:pb-8 grid grid-cols-12 gap-4 text-[10px] tracking-[0.25em] uppercase text-text-secondary">
          <FadeIn delay={1700} triggerOnLoad className="col-span-12 md:col-span-6 flex items-center gap-3">
            <div className="scroll-line"></div>
            <span>SCROLL TO EXPLORE</span>
          </FadeIn>
          <FadeIn delay={1900} triggerOnLoad className="col-span-6 md:col-span-3 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="live-dot"></span>
              <span>OPEN TO INTERNSHIPS</span>
            </div>
            <div className="text-text-secondary/60">DATA ENGINEERING</div>
          </FadeIn>
          <FadeIn delay={2100} triggerOnLoad className="col-span-6 md:col-span-3 md:text-right">
            (2026 / SELECTED WORKS)
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="relative py-32 md:py-48 px-[5vw] lg:px-[6vw] bg-bg-primary">
    <FadeIn className="flex items-center gap-6 mb-20 md:mb-28">
      <div className="w-12 h-[1px] bg-accent"></div>
      <span className="text-[10px] tracking-[0.3em] uppercase text-accent">01 — ABOUT</span>
    </FadeIn>

    <div className="grid grid-cols-12 gap-6 md:gap-8">
      <div className="col-span-12 lg:col-span-6">
        <h2 className="section-heading display-regular text-text-primary">
          <FadeIn as="span" className="block">About</FadeIn>
          <FadeIn as="span" delay={200} className="block display-italic text-accent">me.</FadeIn>
        </h2>
        <FadeIn delay={400} className="mt-8 md:mt-12 text-[10px] tracking-[0.3em] uppercase text-text-secondary">
          — DATA ENGINEERING FOCUS
        </FadeIn>
      </div>

      <div className="col-span-12 lg:col-span-6 lg:pl-12 xl:pl-20 flex flex-col justify-center">
        <FadeIn delay={300}>
          <p className="text-text-primary text-base md:text-lg leading-relaxed font-light mb-6">
            I am finishing my degree in Information Systems & Programming and focusing on Data Engineering. I understand the full data path — from table architecture and stored procedures in MS SQL Server to extraction, transformation, and visualization.
          </p>
        </FadeIn>
        <FadeIn delay={500}>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            Currently looking for a Data Engineer internship or junior position where I can apply my SQL and Python skills to build reliable data pipelines.
          </p>
        </FadeIn>

        <div className="sep my-12 md:my-16"></div>

        <div className="space-y-10">
          {ABOUT_BLOCKS.map((block, i) => (
            <FadeIn key={block.n} delay={600 + i * 200} className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 md:col-span-2 text-[11px] tracking-[0.22em] text-accent font-medium">{block.n} —</div>
              <div className="col-span-9 md:col-span-10">
                <div className="text-text-primary text-[11px] tracking-[0.22em] uppercase font-medium mb-2">{block.title}</div>
                <div className="text-text-secondary text-sm leading-relaxed">{block.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="relative py-32 md:py-48 px-[5vw] lg:px-[6vw] bg-bg-secondary">
    <FadeIn className="flex items-center gap-6 mb-20 md:mb-28">
      <div className="w-12 h-[1px] bg-accent"></div>
      <span className="text-[10px] tracking-[0.3em] uppercase text-accent">02 — TECH STACK</span>
    </FadeIn>

    <div className="grid grid-cols-12 gap-6 md:gap-8 mb-20 md:mb-32">
      <div className="col-span-12 lg:col-span-8">
        <h2 className="section-heading display-regular text-text-primary">
          <FadeIn as="span" className="block">Skills &</FadeIn>
          <FadeIn as="span" delay={200} className="block display-italic">expertise.</FadeIn>
        </h2>
      </div>
      <div className="col-span-12 lg:col-span-4 flex items-end">
        <FadeIn delay={400}>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-sm">
            A focused toolkit refined through academic projects and hands-on practice — from database design to ETL automation.
          </p>
        </FadeIn>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-6 md:gap-8">
      {SKILLS_CATEGORIES.map((cat, i) => (
        <FadeIn key={cat.category} delay={i * 200} className="col-span-12 md:col-span-4">
          <div className="border-t border-border pt-8">
            <div className="text-[11px] tracking-[0.22em] text-accent font-medium mb-6">{cat.category}</div>
            <ul className="space-y-3">
              {cat.skills.map((skill, j) => (
                <FadeIn as="li" key={j} delay={200 + j * 120} className="text-text-primary text-sm md:text-base leading-relaxed">
                  {skill}
                </FadeIn>
              ))}
            </ul>
          </div>
        </FadeIn>
      ))}
    </div>
  </section>
);

const ProjectCard = ({ project }) => {
  const isLeft = project.align === 'left';
  const hasImage = !!project.image;

  return (
    <article className="mb-32 md:mb-48 last:mb-0">
      <div className="grid grid-cols-12 gap-6 md:gap-8 items-center">
        <div className="col-span-12 lg:col-span-7">
          <FadeIn className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="text-[10px] tracking-[0.3em] text-accent">0{project.id}</span>
            <div className="w-8 h-[1px] bg-border"></div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-text-secondary">{project.subtitle}</span>
          </FadeIn>
          <FadeIn delay={200}>
            <h3 className="project-title display-regular text-text-primary mb-6 md:mb-8">{project.name}</h3>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-10 max-w-md">{project.description}</p>
          </FadeIn>
          <FadeIn delay={500}>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-[10px] tracking-[0.2em] uppercase text-text-secondary px-3 py-1 border border-border">{tag}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={600} className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.25em] uppercase text-text-secondary">VIEW CODE</span>
            <a href={project.repo || 'https://github.com/muctaev'} target="_blank" rel="noopener noreferrer" className="project-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </FadeIn>
        </div>

        <div className={`col-span-12 lg:col-span-5 ${isLeft ? 'lg:order-2 lg:pl-12 xl:pl-20' : 'lg:order-2 lg:-mr-[6vw] xl:-mr-[8vw]'}`}>
          <FadeIn delay={300}>
            {project.diagram === 'migration' ? (
              /* Diagram panel — pure HTML/CSS pipeline, transparent background, caption below */
              <div className="aspect-[4/5] flex flex-col items-center justify-center">
                {/* Pipeline diagram */}
                <div className="flex flex-col items-center">
                  {/* Node 1 */}
                  <div className="px-5 py-3 rounded-lg border text-[10px] tracking-[0.18em] uppercase text-center leading-relaxed"
                       style={{ borderColor: 'rgba(232, 230, 227, 0.7)' }}>
                    MS SQL SERVER · SOURCE
                  </div>
                  {/* Connector 1 */}
                  <div className="flex flex-col items-center py-2">
                    <div className="w-px h-5" style={{ background: 'rgba(232, 230, 227, 0.35)' }}></div>
                    <span className="text-[9px] tracking-[0.22em] uppercase text-accent py-2">PYODBC · EXTRACT</span>
                    <div className="w-px h-5" style={{ background: 'rgba(232, 230, 227, 0.35)' }}></div>
                  </div>
                  {/* Node 2 */}
                  <div className="px-5 py-3 rounded-lg border text-[10px] tracking-[0.18em] uppercase text-center leading-relaxed"
                       style={{ borderColor: 'rgba(232, 230, 227, 0.7)' }}>
                    PYTHON ETL — PANDAS: DATES, NULL, DEDUP
                  </div>
                  {/* Connector 2 */}
                  <div className="flex flex-col items-center py-2">
                    <div className="w-px h-5" style={{ background: 'rgba(232, 230, 227, 0.35)' }}></div>
                    <span className="text-[9px] tracking-[0.22em] uppercase text-accent py-2">PSYCOPG2 · UPSERT</span>
                    <div className="w-px h-5" style={{ background: 'rgba(232, 230, 227, 0.35)' }}></div>
                  </div>
                  {/* Node 3 + side validation note (desktop) */}
                  <div className="flex items-center justify-center">
                    <div className="px-5 py-3 rounded-lg border text-[10px] tracking-[0.18em] uppercase text-center leading-relaxed"
                         style={{ borderColor: 'rgba(232, 230, 227, 0.7)' }}>
                      POSTGRESQL · TARGET
                    </div>
                    <div className="hidden sm:flex items-center">
                      <div className="w-6 border-t border-dashed" style={{ borderColor: 'rgba(232, 230, 227, 0.4)' }}></div>
                      <div className="pl-3 text-[9px] tracking-[0.14em] uppercase text-text-secondary leading-relaxed text-left max-w-[170px]">
                        VALIDATION: ROW COUNTS + CHECKSUMS = MATCH ✓
                      </div>
                    </div>
                  </div>
                  {/* Validation note (mobile, below node 3) */}
                  <div className="sm:hidden flex flex-col items-center pt-1">
                    <div className="h-4 border-l border-dashed" style={{ borderColor: 'rgba(232, 230, 227, 0.4)' }}></div>
                    <div className="pt-2 text-[9px] tracking-[0.14em] uppercase text-text-secondary leading-relaxed text-center max-w-[240px]">
                      VALIDATION: ROW COUNTS + CHECKSUMS = MATCH ✓
                    </div>
                  </div>
                </div>
                {/* Caption */}
                <div className="text-center pt-8 flex-shrink-0">
                  <div className="text-[11px] tracking-[0.22em] text-accent mb-2">PROJECT 0{project.id}</div>
                  <div className="display-regular text-text-primary text-lg mb-2">{project.name}</div>
                  <div className="text-text-secondary text-xs tracking-wider uppercase">Code available on GitHub</div>
                </div>
              </div>
            ) : project.diagram === 'etl' ? (
              /* ETL diagram panel — same visual language as project 01 */
              <div className="aspect-[4/5] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                  {/* Node 1 */}
                  <div className="px-5 py-3 rounded-lg border text-[10px] tracking-[0.18em] uppercase text-center leading-relaxed"
                       style={{ borderColor: 'rgba(232, 230, 227, 0.7)' }}>
                    CBR / HH.RU API · SOURCE
                  </div>
                  {/* Connector 1 */}
                  <div className="flex flex-col items-center py-2">
                    <div className="w-px h-5" style={{ background: 'rgba(232, 230, 227, 0.35)' }}></div>
                    <span className="text-[9px] tracking-[0.22em] uppercase text-accent py-2">REQUESTS · EXTRACT</span>
                    <div className="w-px h-5" style={{ background: 'rgba(232, 230, 227, 0.35)' }}></div>
                  </div>
                  {/* Node 2 */}
                  <div className="px-5 py-3 rounded-lg border text-[10px] tracking-[0.18em] uppercase text-center leading-relaxed"
                       style={{ borderColor: 'rgba(232, 230, 227, 0.7)' }}>
                    PYTHON · PANDAS: CLEAN & TRANSFORM
                  </div>
                  {/* Connector 2 */}
                  <div className="flex flex-col items-center py-2">
                    <div className="w-px h-5" style={{ background: 'rgba(232, 230, 227, 0.35)' }}></div>
                    <span className="text-[9px] tracking-[0.22em] uppercase text-accent py-2">PSYCOPG2 · UPSERT</span>
                    <div className="w-px h-5" style={{ background: 'rgba(232, 230, 227, 0.35)' }}></div>
                  </div>
                  {/* Node 3 + side note (desktop) */}
                  <div className="flex items-center justify-center">
                    <div className="px-5 py-3 rounded-lg border text-[10px] tracking-[0.18em] uppercase text-center leading-relaxed"
                         style={{ borderColor: 'rgba(232, 230, 227, 0.7)' }}>
                      POSTGRESQL · TARGET
                    </div>
                    <div className="hidden sm:flex items-center">
                      <div className="w-6 border-t border-dashed" style={{ borderColor: 'rgba(232, 230, 227, 0.4)' }}></div>
                      <div className="pl-3 text-[9px] tracking-[0.14em] uppercase text-text-secondary leading-relaxed text-left max-w-[170px]">
                        ORCHESTRATION: TASK SCHEDULER · DAILY 19:00
                      </div>
                    </div>
                  </div>
                  {/* Side note (mobile) */}
                  <div className="sm:hidden flex flex-col items-center pt-1">
                    <div className="h-4 border-l border-dashed" style={{ borderColor: 'rgba(232, 230, 227, 0.4)' }}></div>
                    <div className="pt-2 text-[9px] tracking-[0.14em] uppercase text-text-secondary leading-relaxed text-center max-w-[240px]">
                      ORCHESTRATION: TASK SCHEDULER · DAILY 19:00
                    </div>
                  </div>
                </div>
                {/* Caption */}
                <div className="text-center pt-8 flex-shrink-0">
                  <div className="text-[11px] tracking-[0.22em] text-accent mb-2">PROJECT 0{project.id}</div>
                  <div className="display-regular text-text-primary text-lg mb-2">{project.name}</div>
                  <div className="text-text-secondary text-xs tracking-wider uppercase">Code available on GitHub</div>
                </div>
              </div>
            ) : (
              /* Text placeholder panel for projects without images */
              <div className="aspect-[4/5] bg-bg-primary border border-border flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="text-[11px] tracking-[0.22em] text-accent mb-4">PROJECT 0{project.id}</div>
                  <div className="display-regular text-text-primary text-2xl md:text-3xl mb-4">{project.name}</div>
                  <div className="text-text-secondary text-xs tracking-wider uppercase">Code available on GitHub</div>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </article>
  );
};

const Projects = () => (
  <section id="projects" className="relative py-32 md:py-48 px-[5vw] lg:px-[6vw] bg-bg-primary">
    <FadeIn className="flex items-center gap-6 mb-20 md:mb-28">
      <div className="w-12 h-[1px] bg-accent"></div>
      <span className="text-[10px] tracking-[0.3em] uppercase text-accent">03 — PROJECTS</span>
    </FadeIn>

    <div className="grid grid-cols-12 gap-6 md:gap-8 mb-20 md:mb-32">
      <div className="col-span-12 lg:col-span-8">
        <h2 className="section-heading display-regular text-text-primary">
          <FadeIn as="span" className="block">Selected</FadeIn>
          <FadeIn as="span" delay={200} className="block display-italic">projects.</FadeIn>
        </h2>
      </div>
      <div className="col-span-12 lg:col-span-4 flex items-end">
        <FadeIn delay={400}>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-sm">
            Academic and personal projects demonstrating real-world data engineering scenarios — from database migration to automated ETL pipelines.
          </p>
        </FadeIn>
      </div>
    </div>

    {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}
  </section>
);

const Contact = () => (
  <section id="contact" className="relative py-32 md:py-48 px-[5vw] lg:px-[6vw] bg-bg-secondary">
    <FadeIn className="flex items-center gap-6 mb-20 md:mb-28">
      <div className="w-12 h-[1px] bg-accent"></div>
      <span className="text-[10px] tracking-[0.3em] uppercase text-accent">04 — CONTACT</span>
    </FadeIn>

    <div className="mb-20 md:mb-28">
      <h2 className="display-regular text-text-primary contact-heading">
        <FadeIn as="span" className="block">Let's build</FadeIn>
        <FadeIn as="span" delay={200} className="block display-italic">something</FadeIn>
        <FadeIn as="span" delay={400} className="block">meaningful.</FadeIn>
      </h2>
    </div>

    <FadeIn delay={600} className="grid grid-cols-12 gap-6 md:gap-8 mb-20 md:mb-28">
      <div className="col-span-12 lg:col-span-6">
        <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-md">
          Looking for a Data Engineer internship or junior position. Open to discussing opportunities where I can apply my SQL and Python skills.
        </p>
      </div>
    </FadeIn>

    <div className="relative">
      {CONTACTS.map((c, i) => (
        <FadeIn key={c.label} delay={i * 150}>
          <a href={c.href} target="_blank" rel="noopener noreferrer" className="contact-link border-t py-8 md:py-10 group">
            <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
              <div className="col-span-2 md:col-span-1 text-[10px] tracking-[0.25em] text-accent uppercase">0{i + 1}</div>
              <div className="col-span-8 md:col-span-7">
                <div className="display-regular text-text-primary text-3xl md:text-5xl font-light leading-none tracking-tight">{c.label}</div>
              </div>
              <div className="hidden md:block col-span-3 text-[11px] tracking-[0.2em] uppercase text-text-secondary text-right">{c.meta}</div>
              <div className="col-span-2 md:col-span-1 text-right">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="contact-arrow text-text-secondary inline-block -rotate-45">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        </FadeIn>
      ))}
      <div className="border-t border-border"></div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative px-[5vw] lg:px-[6vw] py-10 md:py-12 bg-bg-primary border-t border-border">
    <FadeIn className="grid grid-cols-12 gap-4 md:gap-8 items-center">
      <div className="col-span-6 md:col-span-3 flex items-center gap-4">
        <span className="brand-mark" style={{ pointerEvents: 'none' }}>
          <span className="stripe-1"></span>
          <span className="stripe-2"></span>
          <span className="stripe-3"></span>
        </span>
        <span className="text-[11px] tracking-[0.25em] uppercase text-text-secondary">MUCTAEV.</span>
      </div>
      <div className="col-span-6 md:col-span-3 text-[10px] tracking-[0.2em] uppercase text-text-secondary md:text-center">
        © 2026 — Ramil Mustaev
      </div>
      <div className="col-span-12 md:col-span-4 text-[10px] tracking-[0.22em] uppercase text-text-secondary/70 md:text-center">
        Designed & built by Ramil Mustaev — 2026
      </div>
      <div className="col-span-12 md:col-span-2 md:text-right">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[10px] tracking-[0.25em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-500 inline-flex items-center gap-2">
          Back to top
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </FadeIn>
  </footer>
);

const App = () => {
  useEffect(() => {
    const bar = document.getElementById('progressBar');
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (bar) bar.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);