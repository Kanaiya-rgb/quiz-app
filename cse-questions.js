const cseQuestions = {
    cse: [
        {
            question: "What is the time complexity of binary search?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            correct: 1,
            category: "Algorithms"
        },
        {
            question: "Which data structure follows LIFO principle?",
            options: ["Queue", "Stack", "Tree", "Graph"],
            correct: 1,
            category: "Data Structures"
        },
        {
            question: "What does HTML stand for?",
            options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Markup Language"],
            correct: 0,
            category: "Web Development"
        },
        {
            question: "Which programming language is known as the 'language of the web'?",
            options: ["Python", "Java", "JavaScript", "C++"],
            correct: 2,
            category: "Programming"
        },
        {
            question: "What is the primary function of RAM?",
            options: ["Permanent storage", "Temporary storage", "Processing data", "Displaying graphics"],
            correct: 1,
            category: "Computer Architecture"
        },
        {
            question: "Which sorting algorithm has the best average-case time complexity?",
            options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
            correct: 1,
            category: "Algorithms"
        },
        {
            question: "What is the purpose of CSS?",
            options: ["Server-side scripting", "Styling web pages", "Database management", "Game development"],
            correct: 1,
            category: "Web Development"
        },
        {
            question: "Which of these is NOT a programming paradigm?",
            options: ["Object-Oriented", "Functional", "Procedural", "Algorithmic"],
            correct: 3,
            category: "Programming"
        },
        {
            question: "What does API stand for?",
            options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Process Interface"],
            correct: 0,
            category: "Software Development"
        },
        {
            question: "Which database is NoSQL?",
            options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
            correct: 2,
            category: "Databases"
        }
    ],
    
    ece: [
        {
            question: "What is the unit of electrical resistance?",
            options: ["Volt", "Ampere", "Ohm", "Watt"],
            correct: 2,
            category: "Electronics"
        },
        {
            question: "Which component stores electrical charge?",
            options: ["Resistor", "Capacitor", "Inductor", "Transistor"],
            correct: 1,
            category: "Electronics"
        },
        {
            question: "What is the frequency of AC power in India?",
            options: ["50 Hz", "60 Hz", "220 Hz", "110 Hz"],
            correct: 0,
            category: "Power Systems"
        },
        {
            question: "Which modulation technique is used in FM radio?",
            options: ["Amplitude Modulation", "Frequency Modulation", "Phase Modulation", "Pulse Modulation"],
            correct: 1,
            category: "Communication"
        },
        {
            question: "What does LED stand for?",
            options: ["Light Emitting Diode", "Low Energy Device", "Light Energy Display", "Laser Emitting Device"],
            correct: 0,
            category: "Electronics"
        },
        {
            question: "Which logic gate gives output 1 only when all inputs are 1?",
            options: ["AND", "OR", "NOT", "XOR"],
            correct: 0,
            category: "Digital Electronics"
        },
        {
            question: "What is the main function of a transformer?",
            options: ["Convert AC to DC", "Step up or step down voltage", "Store electrical energy", "Generate electricity"],
            correct: 1,
            category: "Power Systems"
        },
        {
            question: "Which semiconductor material is most commonly used?",
            options: ["Silicon", "Germanium", "Gallium Arsenide", "Carbon"],
            correct: 0,
            category: "Electronics"
        },
        {
            question: "What is the unit of frequency?",
            options: ["Hertz", "Decibel", "Watt", "Joule"],
            correct: 0,
            category: "Electronics"
        },
        {
            question: "Which device converts digital to analog signal?",
            options: ["ADC", "DAC", "Microprocessor", "Oscillator"],
            correct: 1,
            category: "Digital Electronics"
        }
    ],
    
    me: [
        {
            question: "What is the SI unit of force?",
            options: ["Joule", "Newton", "Pascal", "Watt"],
            correct: 1,
            category: "Mechanics"
        },
        {
            question: "Which law states that every action has an equal and opposite reaction?",
            options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
            correct: 2,
            category: "Mechanics"
        },
        {
            question: "What is the study of heat and energy called?",
            options: ["Mechanics", "Thermodynamics", "Fluid Dynamics", "Material Science"],
            correct: 1,
            category: "Thermodynamics"
        },
        {
            question: "Which material is most commonly used in 3D printing?",
            options: ["PLA", "Steel", "Aluminum", "Copper"],
            correct: 0,
            category: "Manufacturing"
        },
        {
            question: "What is the unit of pressure?",
            options: ["Newton", "Pascal", "Joule", "Watt"],
            correct: 1,
            category: "Fluid Mechanics"
        },
        {
            question: "Which type of gear has parallel axes?",
            options: ["Bevel Gear", "Spur Gear", "Worm Gear", "Helical Gear"],
            correct: 1,
            category: "Machine Design"
        },
        {
            question: "What is the efficiency of an ideal heat engine?",
            options: ["50%", "75%", "100%", "Less than 100%"],
            correct: 3,
            category: "Thermodynamics"
        },
        {
            question: "Which welding process uses electric arc?",
            options: ["Gas Welding", "Arc Welding", "Laser Welding", "Ultrasonic Welding"],
            correct: 1,
            category: "Manufacturing"
        },
        {
            question: "What is the study of motion called?",
            options: ["Statics", "Dynamics", "Kinematics", "Kinetics"],
            correct: 2,
            category: "Mechanics"
        },
        {
            question: "Which material has the highest melting point?",
            options: ["Steel", "Tungsten", "Titanium", "Aluminum"],
            correct: 1,
            category: "Material Science"
        }
    ],
    
    ce: [
        {
            question: "What is the main component of concrete?",
            options: ["Cement", "Sand", "Aggregate", "Water"],
            correct: 0,
            category: "Construction Materials"
        },
        {
            question: "Which type of beam has fixed ends?",
            options: ["Simply Supported", "Cantilever", "Fixed Beam", "Continuous Beam"],
            correct: 2,
            category: "Structural Analysis"
        },
        {
            question: "What is the study of soil called?",
            options: ["Geology", "Geotechnical Engineering", "Hydrology", "Surveying"],
            correct: 1,
            category: "Geotechnical"
        },
        {
            question: "Which material is used for road construction?",
            options: ["Bitumen", "Cement", "Steel", "Wood"],
            correct: 0,
            category: "Transportation"
        },
        {
            question: "What is the unit of stress?",
            options: ["Newton", "Pascal", "Joule", "Meter"],
            correct: 1,
            category: "Structural Analysis"
        },
        {
            question: "Which type of foundation is used for weak soil?",
            options: ["Shallow Foundation", "Deep Foundation", "Pile Foundation", "Raft Foundation"],
            correct: 2,
            category: "Foundation"
        },
        {
            question: "What is the process of removing impurities from water called?",
            options: ["Filtration", "Sedimentation", "Coagulation", "All of the above"],
            correct: 3,
            category: "Environmental"
        },
        {
            question: "Which survey is used for large areas?",
            options: ["Chain Survey", "Plane Table Survey", "Theodolite Survey", "GPS Survey"],
            correct: 3,
            category: "Surveying"
        },
        {
            question: "What is the study of water flow called?",
            options: ["Hydraulics", "Hydrology", "Hydrodynamics", "All of the above"],
            correct: 3,
            category: "Hydraulics"
        },
        {
            question: "Which material is most commonly used in bridges?",
            options: ["Wood", "Steel", "Concrete", "Stone"],
            correct: 2,
            category: "Structural Design"
        }
    ],
    
    general: [
        {
            question: "What is the capital of India?",
            options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
            correct: 1,
            category: "Geography"
        },
        {
            question: "Who is known as the father of computers?",
            options: ["Bill Gates", "Charles Babbage", "Alan Turing", "Steve Jobs"],
            correct: 1,
            category: "History"
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Ag", "Au", "Fe", "Cu"],
            correct: 1,
            category: "Chemistry"
        },
        {
            question: "Which planet is closest to the Sun?",
            options: ["Venus", "Mercury", "Earth", "Mars"],
            correct: 1,
            category: "Science"
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            correct: 3,
            category: "Geography"
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correct: 1,
            category: "Literature"
        },
        {
            question: "What is the square root of 144?",
            options: ["10", "11", "12", "13"],
            correct: 2,
            category: "Mathematics"
        },
        {
            question: "Which year did India gain independence?",
            options: ["1945", "1946", "1947", "1948"],
            correct: 2,
            category: "History"
        },
        {
            question: "What is the currency of Japan?",
            options: ["Yuan", "Won", "Yen", "Ringgit"],
            correct: 2,
            category: "Economics"
        },
        {
            question: "Which is the tallest mountain in the world?",
            options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
            correct: 1,
            category: "Geography"
        }
    ]
}; 