const notesData = [
    {
        title: "Meeting Notes",
        content: "Discussed project milestones and deadlines for Q1.",
        tags: ["work", "meeting", "Q1"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Shopping List",
        content: "Milk, Bread, Eggs, Coffee, Chicken, Vegetables.",
        tags: ["personal", "shopping"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Workout Plan",
        content: "Monday: Chest, Tuesday: Back, Wednesday: Cardio.",
        tags: ["fitness", "health"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Recipe Ideas",
        content: "Pasta with pesto, grilled salmon, vegetable curry.",
        tags: ["cooking", "recipes"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Vacation Ideas",
        content: "Visit Japan, explore Italy, road trip across the USA.",
        tags: ["travel", "ideas"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Daily Journal",
        content: "Today was productive. Finished work early and went for a run.",
        tags: ["journal", "personal"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Event Planning",
        content: "Book venue, send invites, plan menu for the party.",
        tags: ["event", "planning"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Tech To-Do List",
        content: "Fix server issues, update website, backup database.",
        tags: ["work", "tech"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Reading List",
        content: "Start 'Dune', finish 'Atomic Habits', buy 'Sapiens'.",
        tags: ["books", "personal"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Ideas for Side Project",
        content: "Create a budget tracker app, develop a habit tracker.",
        tags: ["tech", "ideas"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Weekend Goals",
        content: "Clean the house, finish reading a book, cook a new recipe.",
        tags: ["goals", "personal"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Movie Recommendations",
        content: "Watch 'Inception', 'The Matrix', and 'The Grand Budapest Hotel'.",
        tags: ["movies", "entertainment"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Work Goals",
        content: "Finish coding feature X, review PRs, attend weekly sync.",
        tags: ["work", "goals"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Fitness Log",
        content: "Ran 5km in 30 minutes, did a 20-minute yoga session.",
        tags: ["fitness", "health"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Gardening Tips",
        content: "Water plants early in the morning, use compost for soil.",
        tags: ["gardening", "tips"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Programming Notes",
        content: "Remember to use async/await for handling promises.",
        tags: ["tech", "programming"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Goals for December",
        content: "Start learning a new skill, finish the current project.",
        tags: ["goals", "planning"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Gift Ideas",
        content: "Books for mom, headphones for dad, a board game for friends.",
        tags: ["gifts", "planning"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Conference Notes",
        content: "Great talk on AI advancements, need to follow up with speaker.",
        tags: ["work", "conference"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Bucket List",
        content: "Learn to surf, skydive, visit the Great Wall of China.",
        tags: ["personal", "adventure"],
        creator_id: "676175f37545ab140fb17ca3",
        createdAt: new Date("2024-12-18T13:07:35.560Z"),
        image: "https://images.unsplash.com/photo-1733254734371-4072d9fbc5c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

module.exports = { notesData };

