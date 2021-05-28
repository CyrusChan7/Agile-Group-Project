let database = require("../database").Database;
let update = require("../database").writeJSON;
const { calendarData, changeMonth } = require("../views/event/scripts/calendar")

function sortTags(events) {
  // Returns a list all tags and their occurence count for displayed events
  const tagObj = {};
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

function formatDate(eventDateStr) {

  let eventDate = new Date(eventDateStr)

  if (eventDateStr === "") {
    return "";
  }

  if (eventDateStr.indexOf("T") === -1) {
    const eventYear = eventDateStr.split("/")[2];
    if (eventYear.length > 4) {   // time format: MM/DD/YYYY hh:mm
      return eventDate.toLocaleString('en-US')
    } else {    // time format: MM/DD/YYYY
      return eventDate.toLocaleString('en-US').split(",")[0];
    }

  } else {  // chrome date format YYYY-MM-DDThh:mm
    return eventDate.toLocaleString('en-US')
  }

}

let eventsController = {
  // Display all events
  list: (req, res) => {
    sortedTags = sortTags(req.user.events);
    res.render("event/index", {
      user: req.user,
      events: req.user.events,
      database: database,
      calendarData,
      sortedTags,
    });
  },

  new: (req, res) => {
    // Shows the create screen
    res.render("event/create");
  },

  listOne: (req, res) => {
    // List only one event
    const eventToFind = req.params.id;
    const searchResult = req.user.events.find(function (event) {
      return event.id == eventToFind;
    });
    if (searchResult != undefined) {
      res.render("event/single-event", { eventItem: searchResult });
    } else {
      res.render("event/index", {
        user: req.user,
        events: req.user.events,
        database: database,
      });
    }
  },

  searchBarResults: (req, res) => {
    // Search for event based on its title name
    let searchResultsDatabase = [];
    const userSearchTerm = req.query.search;

    for (let i = 0; i < req.user.events.length; i++) {
      // Add event to list if name has substring
      if (req.user.events[i].title.toLowerCase().includes(userSearchTerm.toLowerCase())) {
        searchResultsDatabase.push(req.user.events[i]);
      }
    }
    sortedTags = sortTags(searchResultsDatabase);
    res.render("event/index", {
      user: req.user,
      events: searchResultsDatabase,
      database: database,
      calendarData,
      sortedTags,
    });
  },

  // Create a new event
  create: async (req, res) => {
    let idNum = Number(1);
    if (req.user.events.length != 0) {
      idNum = Number(req.user.events[req.user.events.length - 1].id) + 1;
    }
    const event = {
      id: idNum,
      title: req.body.title,
      description: req.body.description,
      importance: req.body.importance,
      image_url: "",
      tags: req.body.tags.split(",").map(item=>item.trim()),
      date: formatDate(req.body.date)  //req.body.date.replace("T", " "),
    };
    // Use Unsplash API to fetch images for events. Stopped working. Hit API limit?
    /*
    const client_id = process.env.Unsplash_CLIENT_ID;
    const photos = await fetch(
      `https://api.unsplash.com/photos/random?query=${event.title}&client_id=${client_id}`
    );

    const parsedPhotos = await photos.json();

    if ("errors" in parsedPhotos) {
      console.log("ERROR: Cannot find image!");
      event.image_url = "/event.svg";
      req.user.events.push(event);
    } else {
      // Save the URL into event object
      event.image_url = parsedPhotos.urls.regular;

      req.user.events.push(event);
    }
    */
    event.image_url = "/event.svg"
    req.user.events.push(event);

    update()
    res.redirect("/events");
  },

  // Edit a specific event
  edit: (req, res) => {
    const eventToFind = req.params.id;
    const searchResult = req.user.events.find(function (event) {
      return event.id == eventToFind;
    });
    // update()   // not necessary
    res.render("event/edit", { eventItem: searchResult });
  },

  // Update a specific event
  update: (req, res) => {
    // Loop through all events and update the correct one (id)
    req.user.events.forEach((event) => {
      if (String(event.id) === req.params.id) {
        event.title = req.body.title;
        event.description = req.body.description;
        event.importance = req.body.importance;
        event.tags = req.body.tags.split(",").map(item=>item.trim());
        event.date = formatDate(req.body.date)  // req.body.date.replace("T", " ");
      }
    });
    update()
    res.redirect("/event/" + req.params.id);
  },

  // Delete event based on event's id
  delete: (req, res) => {
    const eventToFind = Number(req.params.id);

/*
    req.user.events.forEach((event) => {
      event.id = Number(event.id);
    });
*/
    // Not found by default
    let index = -1;
    for (let i = 0; i < req.user.events.length; i++) {
      if (req.user.events[i].id === eventToFind) {
        //console.log(i);
        index = i;
        break;
      }
    }
    /*

    const result = req.user.events.filter(({ id }) =>
      id.includes(eventToFind)
    );
    */
    // Remove array element based on index position
    if (index >= 0) {
      req.user.events.splice(index, 1);
    }
    update()
    res.redirect("/events");
  },

  listEventOfTheDay: (req, res) => {
    const dateString = req.params.date
    const events = req.user.events

    const eventOfTheDay = events.filter((event) => {
      const eventDate = new Date(event.date);
      const dateStrTokens = eventDate.toLocaleString('en-GB', {dateStyle: "short"}).split('/');
      const eventDateString = dateStrTokens[2] + dateStrTokens[1] + dateStrTokens[0];
      
      return eventDateString === dateString;
    })

    res.render("event/events-of-the-day", {
      events: eventOfTheDay
    });
  },

  // Change months
  nextMonth: (req, res) => {
    // Displays the next month on the calendar
    const newMonth = new Date(calendarData.shownDate.realDate.getFullYear(), calendarData.shownDate.realDate.getMonth()+1, 1);
    changeMonth(newMonth)
    res.redirect("/events");
  },

  prevMonth: (req, res) => {
    // Displays the next month on the calendar
    const newMonth = new Date(calendarData.shownDate.realDate.getFullYear(), calendarData.shownDate.realDate.getMonth()-1, 1);
    changeMonth(newMonth)
    res.redirect("/events");
  },

  resetMonth: (req, res) => {
    // Resets the shown month to today's month
    const newMonth = new Date(calendarData.today.realDate.getFullYear(), calendarData.today.realDate.getMonth(), calendarData.today.realDate.getDate());
    changeMonth(newMonth)
    res.redirect("/events");
  },
  
  tagFilter: (req, res) => {
    // Filter events based on tag
    const filteredEvents = [];
    const filter = req.query.tag;

    for (let i = 0; i < req.user.events.length; i++) {
      // if the event the tag, add it to a list
      if (req.user.events[i].tags.includes(filter)) {
        filteredEvents.push(req.user.events[i]);
      }
    }

    sortedTags = sortTags(filteredEvents);
    res.render("event/index", {
      user: req.user,
      events: filteredEvents,
      database: database,
      calendarData,
      sortedTags,
    });
  },

  impFilter: (req, res) => {
    // Filter events based on importance
    const filteredEvents = [];
    const filter = req.query.importance;

    for (let i = 0; i < req.user.events.length; i++) {
      // if the event the has the importance level
      if (req.user.events[i].importance === filter) {
        filteredEvents.push(req.user.events[i]);
      }
    }

    sortedTags = sortTags(filteredEvents);
    res.render("event/index", {
      user: req.user,
      events: filteredEvents,
      database: database,
      calendarData,
      sortedTags,
    });
  },
};

module.exports = eventsController;
