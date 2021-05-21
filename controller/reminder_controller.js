let database = require("../database").Database;
let update = require("../database").writeJSON;
const fetch = require("node-fetch");
const { calendarData, changeMonth } = require("../views/reminder/scripts/calendar")

function sortTags(events) {
  // Returns a list all tags and their occurence count for displayed events
  let tagObj = {}
  for (let i = 0; i < events.length; i++) {
    for (let j = 0; j < events[i].tags.length; j++){
      // We don't want to save empty strings (no tag)
      if (events[i].tags[j] != "" ){
        // if tag doesn't exist in object, add it. Otherwise add 1 to its value
        if (events[i].tags[j] in tagObj) {
          tagObj[events[i].tags[j]] ++;
        } else {
          tagObj[events[i].tags[j]] = 1;
        }
      }
    }
  }
  let allTags = Object.entries(tagObj);
  // sort tags based on occurence in descending order
  return allTags.sort((a, b) => b[1] - a[1]);
}

let remindersController = {
  // Display all events
  list: (req, res) => {
    sortedTags = sortTags(req.user.reminders);
    res.render("reminder/index", {
      user: req.user,
      reminders: req.user.reminders,
      database: database,
      friendIDs: req.user.friends.friendID,
      calendarData,
      sortedTags,
    });
  },

  new: (req, res) => {
    res.render("reminder/create");
    // console.log(req.user);
  },

  listOne: (req, res) => {
    // List only one reminder
    const reminderToFind = req.params.id;
    const searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", {
        user: req.user,
        reminders: req.user.reminders,
        database: database,
        friendIDs: req.user.friends.friendID,
      });
    }
  },

  searchBarResults: (req, res) => {
    // Search for reminder based on its title name
    let searchResultsDatabase = [];
    const userSearchTerm = req.query.search;

    //console.log(`DEBUG: userSearchTerm is: ${userSearchTerm}`);

    for (let i = 0; i < req.user.reminders.length; i++) {
      // if substring found
      if (req.user.reminders[i].title.toLowerCase().includes(userSearchTerm.toLowerCase())) {
        searchResultsDatabase.push(req.user.reminders[i]);
      }
    }
    sortedTags = sortTags(searchResultsDatabase);
    res.render("reminder/index", {
      user: req.user,
      reminders: searchResultsDatabase,
      database: database,
      friendIDs: req.user.friends.friendID,
      calendarData,
      sortedTags,
    });
  },

  // Create a new reminder
  create: async (req, res) => {
    // const tempSubtasks = [];
//    const tempSubtasks = req.body.subtasks.split(",");

    let idNum = Number(1);
    if (req.user.reminders.length != 0) {
      idNum = Number(req.user.reminders[req.user.reminders.length - 1].id) + 1;
    }
    const reminder = {
      id: idNum,
      title: req.body.title,
      description: req.body.description,
      importance: req.body.importance,
      image_url: "",
      tags: req.body.tags.split(",").map(item=>item.trim()),
//      subtasks: tempSubtasks,
      date: req.body.date.replace("T", " "),
    };
    //console.log(`DEBUG create tempSubtasks is: ${tempSubtasks}`)
    //console.log(typeof tempSubtasks);

    // Use Unsplash API to fetch images for reminders
    const client_id = process.env.Unsplash_CLIENT_ID;
    const photos = await fetch(
      `https://api.unsplash.com/photos/random?query=${reminder.title}&client_id=${client_id}`
    );

    const parsedPhotos = await photos.json();

    if ("errors" in parsedPhotos) {
      console.log("ERROR: Cannot find image!");
      reminder.image_url = "/Reminder.svg";
      req.user.reminders.push(reminder);
    } else {
      // Save the URL into reminder object
      reminder.image_url = parsedPhotos.urls.regular;

      req.user.reminders.push(reminder);
    }
    update()
    res.redirect("/reminders");
  },

  // Edit a specific reminder
  edit: (req, res) => {
    const reminderToFind = req.params.id;
    const searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    // update()   // not necessary
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  // Update a specific reminder
  update: (req, res) => {
    // Loop through all reminders and update the correct one (id)
    // const tempSubtasks = req.body.subtasks.split(",");
    req.user.reminders.forEach((reminder) => {
      if (String(reminder.id) === req.params.id) {
        reminder.title = req.body.title;
        reminder.description = req.body.description;
        reminder.importance = req.body.importance;
        reminder.tags = req.body.tags.split(",").map(item=>item.trim());
//        reminder.subtasks = tempSubtasks;
        reminder.date = req.body.date.replace("T", " ");
      }
      // console.log(`DEBUG update tempSubtasks is: ${tempSubtasks}`)
      // console.log(typeof tempSubtasks);
    });
    update()
    res.redirect("/reminder/" + req.params.id);
  },

  // Delete reminder based on reminder's id
  delete: (req, res) => {
    const reminderToFind = req.params.id;

    req.user.reminders.forEach((reminder) => {
      reminder.id = String(reminder.id);
    });

    // Not found by default
    let index = -1;
    for (let i = 0; i < req.user.reminders.length; i++) {
      if (req.user.reminders[i].id === reminderToFind) {
        //console.log(i);
        index = i;
        break;
      }
    }

    const result = req.user.reminders.filter(({ id }) =>
      id.includes(reminderToFind)
    );
    //console.log(result);

    // Remove array element based on index position
    if (index >= 0) {
      req.user.reminders.splice(index, 1);
    }
    update()
    res.redirect("/reminders");
  },

  // Showing friend's reminder on the main page
  listFriends: (req, res) => {
    res.render("reminder/friends", {
      user: req.user,
      database: database,
    });
  },

  listEventOfTheDay: (req, res) => {
    const dateString = req.params.date
    const year = dateString.slice(0,4)
    const month = dateString.slice(4,6)
    const date = dateString.slice(6,8)
    const reminders = req.user.reminders

    const reminderOfTheDay = reminders.filter((reminder) => {
      let reminderDate = new Date(reminder.date)
      let dateStrTokens = reminderDate.toLocaleString('en-GB', {dateStyle: "short"}).split('/')
      let reminderDateString = dateStrTokens[2] + dateStrTokens[1] + dateStrTokens[0]
      
      return reminderDateString === dateString
      
    })

    res.render("reminder/events-of-the-day", {
      reminders: reminderOfTheDay
    });
  },

  // Change months
  nextMonth: (req, res) => {
    // Displays the next month on the calendar
    let newMonth = new Date(calendarData.shownDate.realDate.getFullYear(), calendarData.shownDate.realDate.getMonth()+1, 1)
    changeMonth(newMonth)
    res.redirect("/reminders");
  },

  prevMonth: (req, res) => {
    // Displays the next month on the calendar
    let newMonth = new Date(calendarData.shownDate.realDate.getFullYear(), calendarData.shownDate.realDate.getMonth()-1, 1)
    changeMonth(newMonth)
    res.redirect("/reminders");
  },

  resetMonth: (req, res) => {
    // Resets the shown month to today's month
    let newMonth = new Date(calendarData.today.realDate.getFullYear(), calendarData.today.realDate.getMonth(), calendarData.today.realDate.getDate())
    changeMonth(newMonth)
    res.redirect("/reminders");
  },

  tagFilter: (req, res) => {
    // Filter events based on tag
    let filteredEvents = []
    const filter = req.query.tag;

    for (let i = 0; i < req.user.reminders.length; i++) {
      // if the event the tag, add it to a list
      if (req.user.reminders[i].tags.includes(filter)) {
        filteredEvents.push(req.user.reminders[i]);
      }
    }

    sortedTags = sortTags(filteredEvents);
    res.render("reminder/index", {
      user: req.user,
      reminders: filteredEvents,
      database: database,
      friendIDs: req.user.friends.friendID,
      calendarData,
      sortedTags,
    });
  },

  impFilter: (req, res) => {
    // Filter events based on tag
    let filteredEvents = []
    const filter = req.query.importance;

    for (let i = 0; i < req.user.reminders.length; i++) {
      // if the event the tag, add it to a list
      if (req.user.reminders[i].importance === filter) {
        filteredEvents.push(req.user.reminders[i]);
      }
    }

    sortedTags = sortTags(filteredEvents);
    res.render("reminder/index", {
      user: req.user,
      reminders: filteredEvents,
      database: database,
      friendIDs: req.user.friends.friendID,
      calendarData,
      sortedTags,
    });
  },
};

module.exports = remindersController;
