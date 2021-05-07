let Database = [{
        id: 1,      // Structure of one user
        name: "Cindy",
        email: "123@gmail.com",
        password: "123",
        reminders: [{
                id: 1,
                title: "Big Exam",
                description: "help me",
                completed: false,
                image_url: "/Reminder.svg",
                subtasks: [],
				date: "05/21/2021",
				tags: "School",
            },
            {
                id: 2,
                title: "Music Festival",
                description: "we rowdy",
                completed: true,
                image_url: "/Reminder.svg",
                subtasks: [],
				date: "05/16/2021",
				tags: "Big fun",
            }
        ],
        avatar: `https://avatars.abstractapi.com/v1/?api_key=${process.env.Abstractapi_CLIENT_ID}&name=Cindy&image_size=60&char_limit=2&background_color=ea3374&font_color=ffffff&is_rounded=true&is_uppercase=true`,
        friends: { friendID: [] },
    },
    {
        id: 2,      // Structure of other user
        name: "Alex",
        email: "alex123@gmail.com",
        password: "alex123!",
        reminders: [{
            id: 1,
            title: "cat",
            description: "feed cat",
            completed: false,
            image_url: "/Reminder.svg",
            subtasks: [],
        }, ],
        avatar: `https://avatars.abstractapi.com/v1/?api_key=${process.env.Abstractapi_CLIENT_ID}&name=Alex&image_size=60&char_limit=2&background_color=0cbf18&font_color=ffffff&is_rounded=true&is_uppercase=true`,
        friends: { friendID: [] },
    }
]

const userModel = {      
    findOne: (email) => {       // find user by email
        const user = Database.find((user) => user.email === email);
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {       // find user by id
        const user = Database.find((user) => user.id === id);
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find uder with id: ${id}`);
    },
};

module.exports = { Database, userModel };