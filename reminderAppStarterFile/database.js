let fs = require('fs');

let Database = JSON.parse(fs.readFileSync('./UserData.json', 'utf8'))


const writeJSON = () =>  {
    let dictstring = JSON.stringify(Database, null, '\t')
    fs.writeFile("UserData.json", dictstring, function(err, result) {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('done')
})
}


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

module.exports = { Database, userModel, writeJSON };