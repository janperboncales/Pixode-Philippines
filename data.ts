

export interface Project {
    id: number;
    title: string;
    type: string;
    image: string;
    overview: string;
    challenges: string;
    approach: string;
    results: string;
    technologies: string[];
}

export interface Testimonial {
    id: number;
    name: string;
    company: string;
    quote: string;
}

export interface TeamMember {
    id: number;
    role: string;
    name: string;
    image: string;
    category: 'Founder' | 'Creative Team';
}

export interface Partner {
    id: number;
    name: string;
    logoUrl: string;
    websiteUrl: string;
}

export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    category: string;
    image: string;
    excerpt: string;
    content: string;
    authorName: string;
    authorImage: string;
    date: string;
}

// ============================================================================
// EDIT BLOG POSTS HERE
// ============================================================================
export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: 'demystifying-react-hooks',
        title: "Demystifying React Hooks: A Deep Dive",
        category: "Development",
        image: "https://images.unsplash.com/photo-1633356122102-3fe601e05590?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%33D%3D",
        excerpt: "Hooks have revolutionized how we write React components. In this post, we'll explore the most common Hooks and how to use them effectively.",
        content: `React Hooks, introduced in React 16.8, are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes.\n\nuseState is one of the most fundamental Hooks. It allows you to add state to your functional components. Calling useState declares a “state variable”. You can pass the initial state to this function and it returns a pair of values: the current state and a function that updates it.\n\nuseEffect is another crucial Hook. It lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API.`,
        authorName: "David Chen",
        authorImage: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "October 26, 2023"
    },
    {
        id: 2,
        slug: 'the-art-of-user-centric-ui-ux',
        title: "The Art of User-Centric UI/UX Design",
        category: "UI/UX",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%33D%3D",
        excerpt: "Great design is about more than just aesthetics. It's about creating intuitive and enjoyable experiences. Let's explore the principles of user-centric design.",
        content: `User-centric design is an iterative design process in which designers focus on the users and their needs in each phase of the design process. The goal is to create products that are not just beautiful, but also highly usable and accessible.\n\nThe process typically involves four main phases: understanding the context of use, specifying user requirements, designing solutions, and evaluating against requirements. Empathy is key; designers must put themselves in the user's shoes to understand their motivations, pain points, and goals. Techniques like user personas, journey mapping, and usability testing are essential tools in a UX designer's arsenal.`,
        authorName: "Robert Brown",
        authorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "October 15, 2023"
    },
    {
        id: 3,
        slug: 'building-scalable-apis-with-nodejs',
        title: "Building Scalable APIs with Node.js",
        category: "Backend",
        image: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%33D%3D",
        excerpt: "Node.js is a popular choice for building fast and scalable network applications. We'll walk through the best practices for creating robust RESTful APIs.",
        content: `Node.js, with its event-driven, non-blocking I/O model, is perfectly suited for building data-intensive real-time applications that run across distributed devices. When building APIs, it's important to follow RESTful principles to ensure they are predictable and easy to work with.\n\nKey practices include using proper HTTP verbs (GET, POST, PUT, DELETE), structuring your routes logically, and implementing consistent error handling. Using a framework like Express.js can greatly simplify the process, providing a robust set of features for web and mobile applications. Furthermore, consider aspects like authentication, rate limiting, and documentation (using tools like Swagger/OpenAPI) to create a production-ready API.`,
        authorName: "Maria Garcia",
        authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "September 28, 2023"
    }
];


// ============================================================================
// EDIT PARTNER LOGOS AND LINKS HERE
// ============================================================================
export const partners: Partner[] = [
    { id: 1, name: 'Ceeds Creations', logoUrl: 'https://i.imgur.com/1ndQG7m.png', websiteUrl: '#' },
    { id: 2, name: 'Syntax Creations', logoUrl: 'https://i.imgur.com/1Xj1Ljl.png', websiteUrl: '#' },
    { id: 3, name: 'KEKEVSPH', logoUrl: 'https://i.imgur.com/LK74LdJ.jpeg', websiteUrl: '#' },
    { id: 4, name: 'Open Slot', logoUrl: 'https://i.imgur.com/P8o0quD.png', websiteUrl: '#' },
    { id: 5, name: 'Open slot', logoUrl: 'https://i.imgur.com/P8o0quD.png', websiteUrl: '#' },
    { id: 6, name: 'Open Slot', logoUrl: 'https://i.imgur.com/P8o0quD.png', websiteUrl: '#' },
    { id: 7, name: 'Open slot', logoUrl: 'https://i.imgur.com/P8o0quD.png', websiteUrl: '#' },
];

// ============================================================================
// EDIT TEAM MEMBER PHOTOS, NAMES, AND ROLES HERE
// ============================================================================
export const teamMembers: TeamMember[] = [
    // To change the photo, replace the URL in the `image` field.
    // To change the name, edit the `name` field.
    // To change the role, edit the `role` field.
    // The order they appear on the page is the order they are in this list.
    { id: 1, name: "Justine Olavario", role: "Founder & CEO", image: "https://i.imgur.com/xwDtrcm.png", category: 'Founder' },
    { id: 2, name: "Janper Boncales", role: "CTO | Co-Founder", image: "https://i.imgur.com/GtFdkP2.png", category: 'Founder' },
    { id: 7, name: "Kyle De Guzman", role: "CMO | Co-Founder", image: "https://i.imgur.com/bo54hsR.png", category: 'Founder' },
    { id: 9, name: "Julius Matro", role: "COO | Co-Founder", image: "https://i.imgur.com/uT4HXjQ.png", category: 'Founder' },
    { id: 3, name: "Mark Tabuzo", role: "QA Engineer", image: "https://i.imgur.com/22vuB9J.png", category: 'Creative Team' },
    { id: 4, name: "Mhel Rojas", role: "DevOps Engineer", image: "https://i.imgur.com/LgOQ5Ug.png", category: 'Creative Team' },
    { id: 5, name: "Charles Grejalvo", role: "Business Analyst", image: "https://i.imgur.com/vMC7Pzi.png", category: 'Creative Team' },
    { id: 6, name: "Carl Ladica", role: "Project Manager", image: "https://i.imgur.com/9FP0cX9.png", category: 'Creative Team' },
    { id: 8, name: "Jorswin Paligsa", role: "Video Editor", image: "https://i.imgur.com/7p9Cq6W.png", category: 'Creative Team' },
];

// ============================================================================
// EDIT SERVICES HERE
// For now, these icons are strings to avoid early React.createElement issues.
// They should be rendered as SVG components or inline SVGs in the consuming component.
// NOTE: Use 'class' attribute instead of 'className' as these are raw HTML strings.
// ============================================================================
export const services = [
    { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>', title: "Web Development", description: "We build fast, responsive, and scalable web applications tailored to your specific business needs using modern technologies." },
    { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>', title: "App Development", description: "From iOS to Android, we create beautiful, high-performance mobile apps that provide an exceptional user experience." },
    { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>', title: "UI/UX Design", description: "Our human-centric design approach focuses on creating intuitive, engaging, and aesthetically pleasing digital products." },
    { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>', title: "Branding & Identity", description: "We help you build a strong, memorable brand that resonates with your target audience and sets you apart from the competition." }
];

// ============================================================================
// EDIT WHY CHOOSE PIXODE FEATURES HERE
// ============================================================================
export const whyChoosePixode = [
    { title: "Innovative Solutions", description: "We push boundaries to deliver unique and forward-thinking digital products that stand out." },
    { title: "User-Centric Design", description: "Our designs prioritize intuitive user experiences, ensuring engagement and satisfaction." },
    { title: "Scalable Technology", description: "We build robust and flexible solutions that can grow with your business and adapt to future needs." },
    { title: "Transparent Collaboration", description: "We believe in open communication and working closely with clients every step of the way." },
];

// ============================================================================
// EDIT PORTFOLIO PROJECTS HERE
// ============================================================================
export const portfolioProjects: Project[] = [
    {
        id: 1,
        title: "Custom Website",
        type: "Web Development",
        image: "https://i.imgur.com/OfuHWov.png",
        overview: "A comprehensive CRM platform designed to streamline sales, marketing, and customer service for tech startups.",
        challenges: "The primary challenge was to create a highly customizable yet intuitive interface that could handle vast amounts of data without compromising performance.",
        approach: "We used a modular architecture with React for the frontend and Node.js for the backend, allowing for scalability and easy integration of new features. We conducted extensive user testing to refine the UX.",
        results: "Increased user productivity by 40% and reduced customer churn by 15% in the first six months post-launch.",
        technologies: ["React", "Node.js", "PostgreSQL", "GraphQL", "Docker"]
    },
    {
        id: 2,
        title: "Mobile Application",
        type: "Mobile App Development",
        image: "https://i.imgur.com/example-app.png", // Placeholder image URL
        overview: "A sleek and intuitive mobile application designed to simplify daily task management for busy professionals.",
        challenges: "Integrating real-time synchronization across multiple devices and ensuring offline functionality while maintaining high performance.",
        approach: "We utilized React Native for cross-platform development, combined with a robust cloud-based backend for data handling and synchronization, ensuring a seamless user experience.",
        results: "Achieved a 4.8-star rating on app stores within the first month, with a 25% increase in user retention compared to industry benchmarks.",
        technologies: ["React Native", "Firebase", "Node.js", "AWS Amplify", "TypeScript"]
    },
];