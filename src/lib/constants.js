
export const categories = [
  { id: "all", name: "All Events" },
  { id: "seminar", name: "Seminars" },
  { id: "workshop", name: "Workshops" },
  { id: "hackathon", name: "Hackathons" },
  { id: "quiz", name: "Quizzes" },
  { id: "talkshow", name: "Talk Shows" },
  { id: "bootcamp", name: "Bootcamps" }
];

export const defaultEvents = [
  {
    id: 1,
    title: "Web Development Workshop",
    category: "workshop",
    date: "2025-05-15",
    description: "Learn modern web development techniques from industry experts",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    time: "10:00 AM",
    venue: "Computer Lab 1",
    organizedBy: "Computer Science Department"
  },
  {
    id: 2,
    title: "AI & Machine Learning Seminar",
    category: "seminar",
    date: "2025-05-20",
    description: "Explore the latest trends in AI and Machine Learning",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c",
    time: "2:00 PM",
    venue: "Seminar Hall",
    organizedBy: "AI Research Club"
  },
  {
    id: 3,
    title: "College Hackathon 2025",
    category: "hackathon",
    date: "2025-06-01",
    description: "24-hour coding challenge with amazing prizes",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    time: "9:00 AM",
    venue: "Main Auditorium",
    organizedBy: "Coding Club"
  }
];
