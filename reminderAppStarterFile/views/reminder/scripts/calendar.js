const weekDays = ['S', "M", "T", "W", "T", "F", "S"]

let today = new Date()
let todayStrTokens = today.toLocaleString('en-GB', {dateStyle: "full"}).split(' ')
let todayObj = {
    year: todayStrTokens[3],
    month: todayStrTokens[2],
    monthNum: today.getMonth() + 1,
    date: todayStrTokens[1],
    weekDay: todayStrTokens[0].slice(0,-1)
}

let firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
let lastOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

let calendarData = {
    weekDays,
    today: todayObj,
    firstOfMonthDay: firstOfMonth.getDay(),
    lastOfMonthDate: lastOfMonth.getDate()
}

module.exports= { calendarData }