const weekDays = ['S', "M", "T", "W", "T", "F", "S"]

let today = new Date()
let todayStrTokens = today.toLocaleString('en-GB', {dateStyle: "full"}).split(' ')
let todayObj = {
    year: todayStrTokens[3],
    month: todayStrTokens[2],
    date: todayStrTokens[1],
    weekDay: todayStrTokens[0].slice(0,-1),
    realDate: today,
}


let firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
let lastOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

let calendarData = {
    weekDays,
    today: todayObj,
    shownDate: Object.assign({},todayObj),
    firstOfMonthDay: firstOfMonth,
    lastOfMonthDate: lastOfMonth,
}

let changeMonth = (newDate) => {
    let newDateStrTokens = newDate.toLocaleString('en-GB', {dateStyle: "full"}).split(' ')
    calendarData.shownDate.realDate = newDate
    calendarData.shownDate.year = newDateStrTokens[3]
    calendarData.shownDate.month = newDateStrTokens[2]
    calendarData.firstOfMonthDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1).getDay()
    calendarData.lastOfMonthDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()
}

module.exports= { calendarData, changeMonth}