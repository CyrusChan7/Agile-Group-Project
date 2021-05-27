# event-App-Group-Proj
# ACIT2520 Developing Web Applications

# Group Members List
# <Name, SID>: 
# Bryan Rainbow, A00768125
# Brian Lam, A01236157
# Cyrus Chan, A01242596
# Leo Li, A01226711
# ###################################


# <Breakdown of works>
## Sprint 1 (due by 3/23)
Leo Li
1. Implemented event update functionality

I also needed to research on Youtube and Google the following things:
1. Convert a string "true" / "false" into Boolean value
https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript?page=1&tab=votes#tab-top

Bryan Rainbow
1. Implemented passport local strategy (completed task with Brian Lam)

Dieu Hoang (Brian) Lam
1. Implemented passport local strategy (completed task with Bryan Rainbow)

Cyrus Chan
1. Implemented the ability for users to delete their events  

---

## Sprint 2 (due by 3/28)
Leo Li
1. Coded to fetched random images from Unsplash API for each events (using title as keyword); show them in all events and list-one view
2. Add a default image to the event if no photo is found on Unspash
  
Cyrus Chan
1. Implemented the ability to add tags when creating a event, and the ability to edit tags when editing a event (completed task with Brian Lam)
2. Implemented the ability to search for events by their title names (completed task with Bryan Rainbow)  

I had to research how to split a string by a string character and then operate on the various separated strings.

Bryan Rainbow
1. Added Logout feature
2. Merged user database with event database (users have events now)
3. Updated code to display current users events instead of always showing cindys

---
## Sprint 3 (due by 4/5)
Leo Li
1. Add register new user functionality; if the user is already registered (in the fake database), will redirect to login page
2. Add abstract avatars for users from Avatar API (https://app.abstractapi.com/api/avatars/documentation); 
Research on encodeURIComponent() (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

Bryan Rainbow
1. Helped with some of the event search feature

I also needed to research on Youtube and Google the following things:
https://flaviocopes.com/express-get-query-variables/
https://sailsjs.com/documentation/reference/request-req/req-params
https://www.w3schools.com/howto/howto_css_searchbar.asp

---
## Sprint 4 (due by 4/16)
Leo Li
1. Coded the add friends functionality (able to select from a list of users)
2. Coded to display friends' events (read-only)

I research below from Google:
Break a foreach function with "return" keyword as it is not a for-loop
https://masteringjs.io/tutorials/fundamentals/foreach-continue  
  
Cyrus Chan
1. Implemented core subtask functionality with Brian Lam
2. Fixed error where subtasks stored the correct data in the correct variable but the text did not display properly on the web app
3. Added relevant text and images to the web app's homepage to more accurately reflect on our implemented features
4. Improved on the formatting of various .ejs files to make the display text on the web app more consistent throughout
5. Added single-line comments in JavaScript files where appropriate (with Brian Lam)
6. Removed needless debug console.logs (with Brian Lam)
7. Replaced let to const where appropriate (with Brian Lam)  
  
I had to read through the Passport.js local authentication documentation to figure what variables needed to be changed and cannot be a const.  
  
Also had to read through some ejs documentation (Stack Overflow also really helped) to figure out how to format out the text nicely.

Bryan Rainbow
1. Implmented a Weather API

I had to research the following:
https://developer.accuweather.com/accuweather-forecast-api/apis
https://openweathermap.org/
https://stackoverflow.com/questions/50331113/how-to-serve-script-file-from-express-route
https://bithacker.dev/fetch-weather-openweathermap-api-javascript
https://www.w3schools.com/jsref/event_onload.asp
