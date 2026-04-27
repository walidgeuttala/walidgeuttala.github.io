const { useState, useEffect, useRef, useMemo } = React;

// --- Icons (Inline SVGs for reliability) ---
const Icon = ({ name, size = 16, className = "", style = {} }) => {
    const paths = {
        User: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
        Github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />,
        FileText: <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></>,
        Terminal: <><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></>,
        X: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
        Minus: <line x1="5" y1="12" x2="19" y2="12" />,
        Maximize2: <><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>,
        ExternalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>,
        Star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
        GitFork: <><circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" /><path d="M12 12v3" /></>,
        Wifi: <><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></>,
        Cpu: <><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></>,
        BookOpen: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
        Zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
        ChevronRight: <polyline points="9 18 15 12 9 6" />,
        Award: <><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></>,
        Globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
        Code2: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
        Search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
        Shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
        Briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
        Linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
    };
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
            {paths[name] || <circle cx="12" cy="12" r="10" />}
        </svg>
    );
};

// --- Window Component ---
function Window({ id, appMeta, children, onClose, onFocus, zIndex, initialPos }) {
    const [pos, setPos] = useState(initialPos || { x: 150 + (Math.random() * 80), y: 100 + (Math.random() * 40) });
    const [minimized, setMinimized] = useState(false);
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const startDrag = (e) => {
        onFocus(id);
        dragging.current = true;
        offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    };

    useEffect(() => {
        const move = (e) => {
            if (!dragging.current) return;
            setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
        };
        const up = () => dragging.current = false;
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
        return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    }, []);

    return (
        <div 
            className={`absolute rounded-xl overflow-hidden glass-panel border ${appMeta.border} window-shadow flex flex-col transition-all duration-300`}
            style={{ 
                left: pos.x, top: pos.y, zIndex, 
                width: minimized ? 240 : appMeta.width || 720, 
                maxHeight: minimized ? 'auto' : '85vh',
                opacity: minimized ? 0.7 : 1,
                transform: minimized ? 'scale(0.9)' : 'scale(1)'
            }}
            onMouseDown={() => onFocus(id)}
        >
            <div 
                className="flex items-center gap-3 px-4 py-3 bg-slate-900/95 border-b border-white/5 cursor-grab active:cursor-grabbing select-none"
                onMouseDown={startDrag}
            >
                <div className="flex gap-2 mr-2">
                    <button onClick={(e) => { e.stopPropagation(); onClose(id); }} className="traffic-light w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center relative shadow-inner">
                        <span className="symbol">×</span>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setMinimized(!minimized); }} className="traffic-light w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center relative shadow-inner">
                        <span className="symbol">−</span>
                    </button>
                    <button className="traffic-light w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center relative shadow-inner">
                        <span className="symbol">+</span>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <Icon name={appMeta.IconName} size={14} style={{ color: appMeta.color }} />
                    <span className="text-[11px] font-mono font-medium tracking-wide uppercase opacity-80" style={{ color: appMeta.color }}>{appMeta.label}</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Live System</span>
                </div>
            </div>
            {!minimized && (
                <div className="flex-1 overflow-y-auto custom-scroll bg-[#030712]/60 p-8">
                    {children}
                </div>
            )}
        </div>
    );
}

// --- Apps ---

function AboutApp() {
    return (
        <div className="font-sans space-y-10">
            {/* Header / Identity */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 pb-8 border-b border-white/5">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-cyan-500/30 transform transition-transform group-hover:rotate-3 group-hover:scale-105">
                        WG
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 border border-cyan-500/30 rounded-full flex items-center justify-center shadow-lg">
                        <Icon name="Cpu" size={20} className="text-cyan-400" />
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-2">Walid Guettala</h2>
                    <p className="text-cyan-400 font-mono text-xl mb-1 tracking-tight font-black uppercase">PhD Researcher in AI @ ELTE</p>
                    <p className="text-slate-500 font-mono text-sm">{CONFIG.institution} · Budapest, HU</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                        <a href={`mailto:${CONFIG.email}`} className="text-slate-400 hover:text-cyan-400 flex items-center gap-2 text-sm transition-all hover:translate-y-[-2px]"><Icon name="Globe" size={16}/> {CONFIG.email}</a>
                        <a href={CONFIG.linkedinUrl} target="_blank" className="text-slate-400 hover:text-blue-400 flex items-center gap-2 text-sm transition-all hover:translate-y-[-2px]"><Icon name="Linkedin" size={16}/> LinkedIn</a>
                        <a href={CONFIG.githubUrl} target="_blank" className="text-slate-400 hover:text-green-400 flex items-center gap-2 text-sm transition-all hover:translate-y-[-2px]"><Icon name="Github" size={16}/> GitHub</a>
                        <a href={CONFIG.scholarUrl} target="_blank" className="text-slate-400 hover:text-purple-400 flex items-center gap-2 text-sm transition-all hover:translate-y-[-2px]"><Icon name="BookOpen" size={16}/> Google Scholar</a>
                    </div>
                </div>
            </div>

            {/* Featured Highlight */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-white/10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center shrink-0 border border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                    <Icon name="Zap" size={32} className="text-cyan-400" />
                </div>
                <div className="text-center md:text-left">
                    <h4 className="text-white font-black uppercase tracking-tighter text-xl">GNN Master Course Creator</h4>
                    <p className="text-slate-400 text-sm mt-1">Designed and delivering the full <span className="text-cyan-400 font-bold">Graph Neural Networks</span> Master's curriculum at ELTE Faculty of Informatics.</p>
                </div>
            </div>

            {/* Academic Profile */}
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
                    <Icon name="Award" size={12} /> PhD AI Researcher
                </div>
                <p className="text-slate-300 leading-relaxed text-lg">
                    PhD Researcher and Educator at <span className="text-white font-bold">ELTE Faculty of Informatics</span> specializing in Graph Neural Networks and Combinatorial Optimization.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Icon name="BookOpen" size={80} />
                        </div>
                        <h4 className="text-cyan-400 font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest"><Icon name="BookOpen" size={14}/> Academic Courses</h4>
                        <ul className="text-slate-400 text-sm space-y-4 leading-relaxed relative z-10">
                            <li className="flex gap-3">
                                <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]"></div>
                                <span><strong className="text-slate-200">Full Master's Course Creator:</strong> Designed and delivered the complete curriculum for <span className="text-cyan-400 font-bold">"Graph Neural Networks"</span> at ELTE.</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                <span><strong className="text-slate-200">University Instructor:</strong> Delivering <span className="text-slate-200">"Software Technology"</span> and <span className="text-slate-200">"Programming Technology"</span> courses for MSc/BSc students.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Icon name="Zap" size={80} />
                        </div>
                        <h4 className="text-purple-400 font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest"><Icon name="Zap" size={14}/> Core Research</h4>
                        <ul className="text-slate-400 text-sm space-y-4 leading-relaxed relative z-10">
                            <li className="flex gap-3">
                                <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#c084fc]"></div>
                                <span><strong className="text-slate-200">Heterogeneous GNNs:</strong> Developing scalable neural architectures for NP-hard routing (Asymmetric TSP).</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                <span><strong className="text-slate-200">GNN Bench:</strong> Developed a synthetic dataset suite for benchmarking relational data architectures.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CareerApp() {
    return (
        <div className="font-sans space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                        <Icon name="Briefcase" size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Career Journey</h3>
                        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Academic & Industry Milestones</p>
                    </div>
                </div>
            </div>

            <div className="relative pl-8 space-y-10 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-green-500 before:via-cyan-500 before:to-transparent">
                {CONFIG.careerTimeline.map((item, i) => (
                    <div key={i} className="relative group">
                        <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-green-500 z-10 group-hover:scale-125 transition-transform"></div>
                        <div className="space-y-1">
                            <span className="text-green-400 font-mono text-[10px] font-bold uppercase tracking-widest">{item.year}</span>
                            <h4 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">{item.title}</h4>
                            <p className="text-slate-500 text-xs font-bold uppercase">{item.org}</p>
                            <p className="text-slate-400 text-sm leading-relaxed mt-2">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PublicationsApp() {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch from Semantic Scholar
        fetch(`https://api.semanticscholar.org/graph/v1/author/search?query=Walid+Guettala&fields=papers.title,papers.year,papers.venue,papers.citationCount,papers.externalIds,papers.authors`)
            .then(r => r.json())
            .then(data => {
                let allPapers = [];
                if (data.data && data.data.length > 0) {
                    // Flatten all papers from all matching authors (to be safe)
                    data.data.forEach(author => {
                        if (author.papers) allPapers = [...allPapers, ...author.papers];
                    });
                }
                
                // Remove duplicates by title
                const unique = Array.from(new Map([...CONFIG.staticPapers, ...allPapers].map(p => [p.title.toLowerCase(), p])).values());
                const sorted = unique.sort((a, b) => (b.year || 0) - (a.year || 0));
                
                setPapers(sorted);
                setLoading(false);
            })
            .catch(() => {
                setPapers(CONFIG.staticPapers);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="text-purple-400 font-mono text-sm animate-pulse tracking-widest uppercase">Syncing Research Registry...</p>
        </div>
    );

    return (
        <div className="font-sans space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                        <Icon name="BookOpen" size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Research & Publications</h3>
                        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Dynamic Scholar Feed</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-black text-purple-500/20 tabular-nums leading-none">{papers.length}</span>
                    <p className="text-[10px] text-slate-600 font-bold uppercase">Scientific Works</p>
                </div>
            </div>

            <div className="space-y-6">
                {papers.map((p, i) => (
                    <div key={i} className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="text-lg font-bold text-slate-200 leading-snug group-hover:text-white transition-colors flex-1">{p.title}</h4>
                            <div className="flex flex-col items-end ml-4">
                                <span className="text-purple-400 font-mono text-sm font-bold">{p.year || "2024"}</span>
                                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase mt-1">
                                    <Icon name="Star" size={10} className="text-yellow-500/50" />
                                    <span>{p.citationCount || 0} Citations</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-purple-400/80 font-mono text-[10px] font-bold uppercase tracking-widest mb-4">{p.venue || "Advanced AI Research"}</p>
                        
                        {p.externalIds?.DOI ? (
                            <a href={`https://doi.org/${p.externalIds.DOI}`} target="_blank" className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-purple-400 transition-colors uppercase tracking-widest border-b border-transparent hover:border-purple-400 pb-1">
                                <Icon name="ExternalLink" size={12} /> Full Paper
                            </a>
                        ) : (
                            <a href={CONFIG.scholarUrl} target="_blank" className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-purple-400 transition-colors uppercase tracking-widest">
                                <Icon name="BookOpen" size={12} /> View on Scholar
                            </a>
                        )}
                    </div>
                ))}
            </div>

            <a href={CONFIG.scholarUrl} target="_blank" className="block p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 text-center hover:bg-purple-500/10 transition-all group">
                <span className="text-xs font-bold text-slate-400 group-hover:text-purple-400 uppercase tracking-[0.3em]">Explore full Google Scholar Profile</span>
            </a>
        </div>
    );
}

function GitHubApp() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.github.com/users/${CONFIG.username}/repos?sort=updated&per_page=12`)
            .then(r => r.json())
            .then(data => {
                setRepos(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const isToday = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        return date.toLocaleDateString() === today.toLocaleDateString();
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            <p className="text-green-400 font-mono text-sm animate-pulse tracking-widest uppercase">Syncing GitHub Repos...</p>
        </div>
    );

    return (
        <div className="font-sans space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                        <Icon name="Github" size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Active Repositories</h3>
                        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Live Research Code</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos.map(r => {
                    const active = isToday(r.pushed_at);
                    return (
                        <a key={r.id} href={r.html_url} target="_blank" className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all relative">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-mono font-bold text-green-400 group-hover:text-green-300 transition-colors truncate">{r.name}</h4>
                                <div className={`text-[8px] px-2 py-0.5 rounded-full uppercase font-black tracking-widest ${active ? 'bg-green-500 text-black animate-pulse' : 'bg-slate-800 text-slate-500'}`}>
                                    {active ? 'Push Today' : 'Stable'}
                                </div>
                            </div>
                            <p className="text-slate-400 text-xs line-clamp-2 h-8 leading-relaxed mb-4">{r.description || 'Scientific codebase & research implementation.'}</p>
                            
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {r.language && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-white/5">{r.language}</span>}
                                {(r.topics || []).slice(0, 3).map(t => (
                                    <span key={t} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-green-950/20 text-green-500/60 border border-green-500/10 uppercase tracking-tighter">#{t}</span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1"><Icon name="Star" size={10}/> {r.stargazers_count}</span>
                                    <span className="flex items-center gap-1"><Icon name="GitFork" size={10}/> {r.forks_count}</span>
                                </div>
                                <span className="opacity-50">Updated {new Date(r.pushed_at).toLocaleDateString()}</span>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

function AwardsApp() {
    return (
        <div className="font-sans space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                        <Icon name="Award" size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Honors & Recognition</h3>
                        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Excellence Registry</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {CONFIG.awards.map((a, i) => (
                    <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-red-500/30 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform shrink-0">
                            <Icon name={a.icon} size={24} />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold text-white">{a.title}</h4>
                                <span className="text-red-400 font-mono text-sm font-bold">{a.year}</span>
                            </div>
                            <p className="text-red-400/60 font-mono text-xs font-bold uppercase tracking-widest">{a.org}</p>
                            <p className="text-slate-400 text-sm leading-relaxed pt-2">{a.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Skills Components ---

function SkillsRadar({ categories, activeId, onHover }) {
    const size = 300;
    const center = size / 2;
    const radius = 100;
    const angleStep = (Math.PI * 2) / categories.length;

    // Simulated levels
    const levels = [0.9, 0.7, 0.85, 0.8, 0.95, 0.75, 0.8];
    
    const points = categories.map((cat, i) => {
        const r = radius * levels[i];
        const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
        const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
        return `${x},${y}`;
    }).join(" ");

    return (
        <div className="relative flex flex-col items-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-2xl">
                {/* Background Polygons */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map(l => (
                    <polygon key={l}
                        points={categories.map((_, i) => {
                            const r = radius * l;
                            const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
                            const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
                            return `${x},${y}`;
                        }).join(" ")}
                        fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"
                    />
                ))}
                {/* Axis lines */}
                {categories.map((_, i) => {
                    const x = center + radius * Math.cos(i * angleStep - Math.PI / 2);
                    const y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
                    return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="rgba(255,255,255,0.05)" />;
                })}
                {/* Data Polygon */}
                <polygon points={points} fill="rgba(34, 211, 238, 0.1)" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" />
                {/* Points and Labels */}
                {categories.map((cat, i) => {
                    const r = radius * levels[i];
                    const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
                    const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
                    const lx = center + (radius + 30) * Math.cos(i * angleStep - Math.PI / 2);
                    const ly = center + (radius + 20) * Math.sin(i * angleStep - Math.PI / 2);
                    return (
                        <g key={i} onMouseEnter={() => onHover(cat.id)} className="cursor-pointer group">
                            <circle cx={x} cy={y} r="4" fill={activeId === cat.id ? '#fff' : '#22d3ee'} className="transition-all" />
                            <text x={lx} y={ly} textAnchor="middle" className={`text-[9px] font-mono uppercase font-bold tracking-tighter transition-all ${activeId === cat.id ? 'fill-cyan-400 scale-110' : 'fill-slate-500'}`}>
                                {cat.label.split(' ')[0]}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

function SkillsGraph({ categories, activeId, onSelect }) {
    const width = 500;
    const height = 400;
    
    // Generate nodes
    const nodes = useMemo(() => {
        const n = [];
        categories.forEach((cat, ci) => {
            const angle = (ci / categories.length) * Math.PI * 2;
            const hubX = width/2 + Math.cos(angle) * 140;
            const hubY = height/2 + Math.sin(angle) * 120;
            
            n.push({ id: cat.id, label: cat.label, x: hubX, y: hubY, isHub: true, color: cat.color });
            
            cat.skills.forEach((s, si) => {
                const sAngle = angle + (si / cat.skills.length - 0.5) * 0.5;
                const dist = 50 + Math.random() * 20;
                n.push({ 
                    id: `${cat.id}-${si}`, 
                    label: s, 
                    parentId: cat.id,
                    x: hubX + Math.cos(sAngle) * dist, 
                    y: hubY + Math.sin(sAngle) * dist,
                    color: cat.color 
                });
            });
        });
        return n;
    }, [categories]);

    return (
        <div className="relative bg-slate-950/40 rounded-3xl border border-white/5 overflow-hidden group">
            <div className="absolute top-4 left-6 z-10">
                <h4 className="text-white font-bold text-lg tracking-tight">Interactive Skill Graph</h4>
                <p className="text-slate-500 text-[10px] uppercase font-mono tracking-widest">59 Active Nodes • Live Interaction</p>
            </div>
            <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
                {/* Lines */}
                {nodes.filter(n => !n.isHub).map(n => {
                    const hub = nodes.find(h => h.id === n.parentId);
                    const isActive = activeId === n.parentId;
                    return (
                        <line key={n.id} x1={n.x} y1={n.y} x2={hub.x} y2={hub.y} 
                            stroke={n.color} strokeWidth={isActive ? 1 : 0.2} strokeOpacity={isActive ? 0.4 : 0.1}
                            className="transition-all duration-500" />
                    );
                })}
                {/* Nodes */}
                {nodes.map(n => {
                    const isActive = activeId === (n.isHub ? n.id : n.parentId);
                    const isDirect = activeId === n.id;
                    return (
                        <g key={n.id} className="cursor-pointer transition-all duration-300"
                           onClick={() => onSelect(n.isHub ? n.id : n.parentId)}
                           style={{ opacity: !activeId || isActive ? 1 : 0.2 }}>
                            <circle cx={n.x} cy={n.y} r={n.isHub ? 6 : 2} fill={n.color} 
                                className={`${n.isHub ? 'animate-pulse' : ''} ${isActive ? 'filter blur-[1px]' : ''}`} />
                            {(n.isHub || isActive) && (
                                <text x={n.x} y={n.y + (n.isHub ? 15 : 8)} textAnchor="middle" 
                                    className={`text-[${n.isHub ? '10px' : '6px'}] font-mono font-bold fill-white pointer-events-none uppercase tracking-tighter`}>
                                    {n.label}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

function SkillsApp() {
    const [activeCat, setActiveCat] = useState('ai_res');
    const categories = CONFIG.skillCategories;
    const current = categories.find(c => c.id === activeCat) || categories[0];

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Radar & Categories */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                            <Icon name="Search" size={16} className="text-cyan-400" />
                            Skills Radar
                        </h3>
                        <SkillsRadar categories={categories} activeId={activeCat} onHover={setActiveCat} />
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {categories.map(cat => (
                            <button key={cat.id}
                                onClick={() => setActiveCat(cat.id)}
                                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left
                                    ${activeCat === cat.id ? 'bg-white/10 border-white/20 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5 opacity-60'}`}>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cat.color}20`, color: cat.color }}>
                                    <Icon name={cat.icon} size={16} />
                                </div>
                                <span className="text-[10px] font-mono font-bold uppercase text-white truncate leading-tight">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Graph & Details */}
                <div className="lg:col-span-7 space-y-6">
                    <SkillsGraph categories={categories} activeId={activeCat} onSelect={setActiveCat} />
                    
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Icon name={current.icon} size={120} style={{ color: current.color }} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${current.color}20`, color: current.color }}>
                                    <Icon name={current.icon} size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight uppercase">{current.label}</h3>
                                    <p className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase">Specialized Knowledge</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {current.skills.map(s => (
                                    <div key={s} className="px-4 py-2 rounded-xl bg-slate-900 border border-white/5 text-slate-300 text-xs font-bold hover:border-white/20 hover:text-white transition-all cursor-default">
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended follow-ups */}
            <div className="pt-8 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Recommended follow-ups</h4>
                    <button className="text-[10px] font-mono text-cyan-400 hover:underline uppercase font-bold">Hide quick questions</button>
                </div>
                <div className="flex flex-col gap-3">
                    {CONFIG.followUps.map((f, i) => (
                        <button key={i} className="px-5 py-3 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all flex items-center gap-4 group text-left">
                            <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                                <Icon name="Zap" size={14} className="text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white mb-0.5">{f.q}</p>
                                <p className="text-[10px] text-slate-500 font-mono leading-tight">{f.a}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TerminalApp() {
    const [lines, setLines] = useState([
        { type: 'sys', content: `WALID TERMINAL v2.1.0 (Budapest, HU)` },
        { type: 'sys', content: `Authenticated as: RESEARCH_PRACTITIONER` },
        { type: 'sys', content: `-----------------------------------------` },
        { type: 'out', content: `Type 'help' to see available commands.` },
    ]);
    const [input, setInput] = useState('');
    const endRef = useRef(null);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [lines]);

    const handleCommand = (e) => {
        if (e.key !== 'Enter') return;
        const cmd = input.trim().toLowerCase();
        const args = cmd.split(' ');
        const primary = args[0];
        const newLines = [...lines, { type: 'in', content: `walid@elte:~$ ${input}` }];
        
        switch(primary) {
            case 'help':
                newLines.push({ type: 'out', content: 'Commands: about, skills, research, awards, contact, teaching, clear, ls, date' });
                break;
            case 'ls':
                newLines.push({ type: 'out', content: 'About.exe  Skills.vxd  GitHub_Live.sh  Journey.sh  Research.pdf  Honors.rtf  Terminal.sh' });
                break;
            case 'about':
                newLines.push({ type: 'out', content: 'Walid Guettala: PhD Researcher at ELTE specializing in Graph Neural Networks and Combinatorial Optimization. ICPC World Semifinalist.' });
                break;
            case 'skills':
                newLines.push({ type: 'out', content: 'Primary: Python, PyTorch, PyG, C++, Algorithmic Design, Discrete Math, GNNs, Reinforcement Learning.' });
                break;
            case 'research':
                newLines.push({ type: 'out', content: 'Current focus: Solving NP-hard routing problems (Asymmetric TSP) via heterogeneous graph neural networks.' });
                break;
            case 'awards':
                newLines.push({ type: 'out', content: 'ICPC Champion, Stipendium Hungaricum Fellow, Best Poster @ ELTE.' });
                break;
            case 'contact':
                newLines.push({ type: 'out', content: `Email: ${CONFIG.email}\nGitHub: github.com/${CONFIG.username}` });
                break;
            case 'teaching':
                newLines.push({ type: 'out', content: 'Graduate Courses: Software Technology (1.5+ years), focusing on software engineering and design patterns.' });
                break;
            case 'date':
                newLines.push({ type: 'out', content: new Date().toString() });
                break;
            case 'clear':
                setLines([]); setInput(''); return;
            case 'sudo':
                newLines.push({ type: 'err', content: 'Nice try. This is a protected system.' });
                break;
            case '':
                break;
            default:
                newLines.push({ type: 'err', content: `Command not found: ${primary}. Try 'help'.` });
        }
        
        setLines(newLines);
        setInput('');
    };

    return (
        <div className="font-mono text-xs flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto space-y-1 custom-scroll mb-4 pr-2">
                {lines.map((l, i) => (
                    <div key={i} className={`whitespace-pre-wrap leading-relaxed ${l.type === 'in' ? 'text-green-400 font-bold' : l.type === 'err' ? 'text-red-400' : l.type === 'sys' ? 'text-cyan-500 opacity-80' : 'text-slate-300'}`}>
                        {l.content}
                    </div>
                ))}
                <div ref={endRef} />
            </div>
            <div className="flex items-center gap-2 border-t border-white/5 pt-4">
                <span className="text-green-500 font-bold">walid@elte:~$</span>
                <input 
                    autoFocus 
                    className="bg-transparent border-none outline-none text-slate-200 flex-1 caret-cyan-400"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    spellCheck="false"
                />
            </div>
        </div>
    );
}

// --- Mobile Layout ---
function MobileLayout() {
    const [activeTab, setActiveTab] = useState('about');
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const components = {
        about: AboutApp,
        career: CareerApp,
        github: GitHubApp,
        publications: PublicationsApp,
        skills: SkillsApp,
        awards: AwardsApp,
        terminal: TerminalApp,
    };

    const AppContent = components[activeTab];
    const currentApp = APPS.find(a => a.id === activeTab) || APPS[0];

    return (
        <div className="mobile-layout">
            {/* Mobile Top Bar */}
            <div className="mobile-topbar">
                <div className="mobile-topbar-left">
                    <div className="mobile-logo">
                        <Icon name="Cpu" size={14} className="text-cyan-400" />
                        <span>WG · AI Researcher</span>
                    </div>
                    <div className="mobile-status">
                        <span className="mobile-status-dot"></span>
                        <span>ONLINE</span>
                    </div>
                </div>
                <div className="mobile-clock">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>

            {/* Mobile Page Header */}
            <div className="mobile-page-header" style={{ borderColor: `${currentApp.color}30` }}>
                <div className="mobile-page-icon" style={{ background: `${currentApp.color}15`, color: currentApp.color }}>
                    <Icon name={currentApp.IconName} size={20} />
                </div>
                <div>
                    <h1 className="mobile-page-title">{currentApp.label}</h1>
                    <p className="mobile-page-sub">Walid Guettala • ELTE</p>
                </div>
                <div className="mobile-live-dot"></div>
            </div>

            {/* Mobile Content Area */}
            <div className="mobile-content">
                <AppContent />
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="mobile-nav">
                {APPS.map(app => (
                    <button
                        key={app.id}
                        onClick={() => setActiveTab(app.id)}
                        className={`mobile-nav-btn ${activeTab === app.id ? 'mobile-nav-btn-active' : ''}`}
                        style={activeTab === app.id ? { color: app.color } : {}}
                    >
                        <div className="mobile-nav-icon">
                            <Icon name={app.IconName} size={20} />
                            {activeTab === app.id && (
                                <div className="mobile-nav-indicator" style={{ background: app.color }}></div>
                            )}
                        </div>
                        <span className="mobile-nav-label">{app.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}

// --- Desktop Layout ---
function Desktop() {
    const [openWindows, setOpenWindows] = useState(["about", "github"]);
    const [zIndices, setZIndices] = useState({ about: 10, github: 1, publications: 1, awards: 1, terminal: 1, career: 1, skills: 1 });
    const [topZ, setTopZ] = useState(11);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleWindow = (id) => {
        if (id === 'about') {
            focusWindow('about');
            if (!openWindows.includes('about')) {
                setOpenWindows(prev => [...prev, 'about']);
            }
            return;
        }

        if (id === 'terminal') {
            if (openWindows.includes('terminal')) {
                setOpenWindows(prev => prev.filter(w => w !== 'terminal'));
            } else {
                setOpenWindows(prev => [...prev, 'terminal']);
                focusWindow('terminal');
            }
            return;
        }

        const rightSideApps = ['github', 'publications', 'awards', 'skills', 'career'];
        if (rightSideApps.includes(id)) {
            if (openWindows.includes(id)) {
                setOpenWindows(prev => prev.filter(w => w !== id));
            } else {
                setOpenWindows(prev => [
                    ...prev.filter(w => !rightSideApps.includes(w)),
                    id
                ]);
                focusWindow(id);
            }
        }
    };

    const focusWindow = (id) => {
        const nextZ = topZ + 1;
        setZIndices(prev => ({ ...prev, [id]: nextZ }));
        setTopZ(nextZ);
    };

    const components = { 
        about: AboutApp, 
        skills: SkillsApp,
        career: CareerApp,
        github: GitHubApp, 
        publications: PublicationsApp, 
        awards: AwardsApp,
        terminal: TerminalApp 
    };

    const getInitialPos = (id) => {
        if (id === 'about') return { x: 140, y: 100 };
        if (id === 'terminal') return { x: 450, y: 350 };
        return { x: 1000, y: 100 };
    };

    return (
        <div className="h-screen w-full flex flex-col relative grid-bg overflow-hidden select-none">
            {/* Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            {/* Top Bar */}
            <div className="h-10 glass-panel flex items-center justify-between px-6 z-[1000] border-b border-white/10 shadow-lg">
                <div className="flex items-center gap-6 text-[10px] font-mono">
                    <div className="flex items-center gap-2.5 text-white font-black group cursor-pointer">
                        <Icon name="Cpu" size={14} className="text-cyan-400 group-hover:rotate-90 transition-transform" />
                        <span className="tracking-tighter uppercase">WG_SYSTEM v2.1.0</span>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
                    <div className="flex items-center gap-2 text-slate-500 uppercase tracking-widest font-bold">
                        <span className="status-dot bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></span>
                        <span className="text-[9px]">GNN_ENGINE: ONLINE</span>
                    </div>
                </div>
                <div className="flex items-center gap-8 text-[10px] font-mono text-slate-400">
                    <div className="hidden md:flex items-center gap-2 uppercase tracking-widest"><Icon name="Search" size={12} className="text-cyan-500/50" /> Optimization Research Focus</div>
                    <div className="flex items-center gap-2 tabular-nums font-bold text-slate-100 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                </div>
            </div>

            {/* Desktop Area */}
            <div className="flex-1 relative p-8">
                {/* Desktop Icons */}
                <div className="grid grid-flow-row gap-6 w-24 z-10 relative">
                    {APPS.map(app => (
                        <button 
                            key={app.id} 
                            onClick={() => toggleWindow(app.id)}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-300 group relative
                                ${openWindows.includes(app.id) ? 'bg-white/10 shadow-xl border border-white/10' : 'hover:bg-white/5 border border-transparent'}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg`}
                                 style={{ background: `${app.color}15`, border: `1px solid ${app.color}30` }}>
                                <Icon name={app.IconName} size={28} style={{ color: app.color }} className="drop-shadow-lg" />
                                {openWindows.includes(app.id) && (
                                    <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
                                )}
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-white transition-colors tracking-tighter text-center uppercase">{app.label}</span>
                        </button>
                    ))}
                </div>

                {/* App Windows */}
                {openWindows.map(id => {
                    const AppContent = components[id];
                    return (
                        <Window 
                            key={id} 
                            id={id} 
                            appMeta={APPS.find(a => a.id === id)}
                            onClose={toggleWindow}
                            onFocus={focusWindow}
                            zIndex={zIndices[id]}
                            initialPos={getInitialPos(id)}
                        >
                            <AppContent />
                        </Window>
                    );
                })}
            </div>

            {/* Bottom Taskbar */}
            <div className="h-12 glass-panel flex items-center px-6 gap-3 z-[1000] border-t border-white/10 backdrop-blur-3xl shadow-2xl">
                <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform active:scale-95">
                    <Icon name="Cpu" size={16} className="text-white" />
                </button>
                <div className="h-5 w-px bg-white/10 mx-2"></div>
                <div className="flex gap-2.5 overflow-x-auto custom-scroll no-scrollbar py-1">
                    {openWindows.map(id => {
                        const app = APPS.find(a => a.id === id);
                        return (
                            <button 
                                key={id} 
                                onClick={() => focusWindow(id)}
                                className={`px-4 py-1.5 rounded-xl flex items-center gap-2.5 transition-all duration-300 border backdrop-blur-md shrink-0
                                    ${zIndices[id] === topZ ? 'bg-white/10 border-white/20 shadow-lg -translate-y-0.5' : 'bg-transparent border-transparent hover:bg-white/5 opacity-70'}`}
                            >
                                <Icon name={app.IconName} size={14} style={{ color: app.color }} />
                                <span className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-tight">{app.label}</span>
                            </button>
                        );
                    })}
                </div>
                <div className="ml-auto flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-1.5 opacity-40">
                        {[1,2,3,4,5,6].map(i => <div key={i} className="w-1 h-3 rounded-full bg-slate-500"></div>)}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-[0.2em]">{CONFIG.institution} • HPC</span>
                </div>
            </div>
        </div>
    );
}

// --- Root App (Responsive) ---
function App() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <MobileLayout /> : <Desktop />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
