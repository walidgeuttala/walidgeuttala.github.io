const CONFIG = {
    username: "walidgeuttala",
    email: "walidguettala@gmail.com",
    displayName: "Walid Guettala",
    title: "PhD Researcher in AI @ ELTE",
    institution: "ELTE Eötvös Loránd University",
    scholarId: "ZLeaUzYAAAAJ",
    location: "Budapest, Hungary",
    githubUrl: "https://github.com/walidgeuttala",
    scholarUrl: "https://scholar.google.com/citations?user=ZLeaUzYAAAAJ",
    linkedinUrl: "https://www.linkedin.com/in/walid-guettala-8436521b0/",
    
    // Fallback publications if API fails
    staticPapers: [
        {
            title: "Heterogeneous Graph Neural Networks for Scalable Asymmetric Traveling Salesman Problem",
            venue: "Neurocomputing / AI Research",
            year: 2024,
            citations: 12,
            url: "https://arxiv.org/abs/2310.00000",
            tags: ["GNN", "TSP", "Optimization"]
        }
    ],

    awards: [
        {
            title: "ICPC Regional Champion",
            org: "International Collegiate Programming Contest",
            year: "2022",
            icon: "Award",
            desc: "Algerian Champion and World Semifinalist (Dhaka), solving complex algorithmic challenges under extreme pressure."
        },
        {
            title: "Stipendium Hungaricum Scholarship",
            org: "Hungarian Government",
            year: "2023-2027",
            icon: "Star",
            desc: "Full merit-based scholarship for PhD research in Artificial Intelligence at ELTE."
        }
    ],

    careerTimeline: [
        {
            year: "2023-Present",
            title: "PhD Researcher & Lecturer",
            org: "ELTE University, Budapest",
            desc: "Leading GNN research and teaching MSc-level 'Graph Neural Networks' course."
        },
        {
            year: "2023",
            title: "Data Analyst / Engineer",
            org: "PetroBaraka",
            desc: "Optimized logistics routes using SQL/Spark pipelines on 10TB+ datasets."
        }
    ],

    skillCategories: [
        {
            id: "ai_res",
            label: "AI Research",
            icon: "Zap",
            color: "#22d3ee",
            skills: ["Graph Neural Networks (PyG/DGL)", "Combinatorial Optimization", "Deep Learning", "Reinforcement Learning", "Transformers", "Neural Heuristics"]
        },
        {
            id: "teaching",
            label: "Academics & Teaching",
            icon: "BookOpen",
            color: "#4ade80",
            skills: ["Full Master Course: GNNs", "Software Technology", "Programming Technology", "Curriculum Design", "Mentoring"]
        },
        {
            id: "data_eng",
            label: "Data Engineering",
            icon: "Cpu",
            color: "#c084fc",
            skills: ["SQL Optimization", "Spark / ETL", "Docker / Airflow", "Data Pipelines", "Big Data Analytics"]
        },
        {
            id: "prog",
            label: "Algorithmic Code",
            icon: "Terminal",
            color: "#fbbf24",
            skills: ["C++ (Competitive)", "Python", "SQL", "High-Performance Computing", "Software Architecture"]
        }
    ],

    followUps: [
        {
            q: "Tell me about your teaching at ELTE.",
            a: "I created the full Master's course on Graph Neural Networks and teach Software/Programming Technology."
        },
        {
            q: "What is your primary research focus?",
            a: "PhD research in AI at ELTE, specifically scalable neural architectures for optimization problems."
        }
    ]
};

const APPS = [
    { id: "about", label: "About.exe", IconName: "User", color: "#22d3ee", border: "border-cyan-700", active: "bg-cyan-950/50", width: 840 },
    { id: "skills", label: "Skills.vxd", IconName: "Zap", color: "#fbbf24", border: "border-yellow-700", active: "bg-yellow-950/50", width: 880 },
    { id: "github", label: "GitHub_Live.sh", IconName: "Github", color: "#4ade80", border: "border-green-700", active: "bg-green-950/50", width: 780 },
    { id: "career", label: "Journey.sh", IconName: "Briefcase", color: "#4ade80", border: "border-green-700", active: "bg-green-950/50", width: 720 },
    { id: "publications", label: "Research.pdf", IconName: "FileText", color: "#c084fc", border: "border-purple-700", active: "bg-purple-950/50", width: 740 },
    { id: "awards", label: "Honors.rtf", IconName: "Award", color: "#f87171", border: "border-red-700", active: "bg-red-950/50", width: 640 },
    { id: "terminal", label: "Terminal.sh", IconName: "Terminal", color: "#facc15", border: "border-yellow-700", active: "bg-yellow-950/50", width: 660 },
];
