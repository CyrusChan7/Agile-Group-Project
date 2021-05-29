# Eventful

### A calendar app that offers a quick and easy way for the user to make, organize, and edit their events.

<br/>  

#### **How to run Eventful locally:**

1. Install the most recent LTS version of Node.js
2. Navigate to the root directory (Agile-Group-Project)
3. Install the required dependencies using `npm install`
4. Start the app by running `node index.js`
5. Visit `http://localhost:3001/` in your web browser of choice (Google Chrome recommended)
6. Login using the demo account we have created for you, email: `321@gmail.com` password: `123` or create your own account

#### **Programs required:**
- Latest Node.js LTS
- Visual Studio Code or related IDE
- A web browser 

#### **JavaScript library dependencies:**

To easily install dependencies, type the command `npm install`.  
  
##### **What libraries you can expect:**

"body-parser": "^1.15.2",  
"dotenv": "^8.2.0",  
"ejs": "^2.7.4",  
"express": "^4.17.1",  
"express-ejs-layouts": "^2.2.0",  
"express-session": "^1.17.1",  
"method-override": "^2.3.7",  
"mongoose": "^4.7.7",  
"node-fetch": "^2.6.1",  
"nodemon": "^1.19.4",  
"passport": "^0.4.1",  
"passport-local": "^1.0.0",  
"should": "^13.2.3"  

#### **Deploy instructions:**

1. Ensure that `npm start` is `node index.js` in `package.json`
2. Create a new GitHub repository
3. Push the all of the related files and directories into said newly created GitHub repository
4. Connect Heroku with GitHub, then select the GitHub repository that you created
5. (OPTIONAL) Enable automatic deploys if you wish to automatically detect changes in GitHub and deploy by itself

NOTE: The first deploy must be manual regardless of whether the automatic deploy option is enabled, only subsequent deployments will be automatic.  
  
#### **How to run tests:**  
  
1. Type `npm run test`. All 24 tests should pass.

#### **Features:**
- A calendar display with events appearing on the corresponding dates of the calendar
- A top banner showing weather information
- Ability to filter events by importance level and tags
- Events of different importance levels are shown in different colors
- Ability to add, edit, and delete events
- Secure local login
