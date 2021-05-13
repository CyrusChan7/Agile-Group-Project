const weekDays = ['S', "M", "T", "W", "T", "F", "S"]

let today = new Date()
let todayStrTokens = today.toLocaleString('en-GB', {dateStyle: "full"}).split(' ')
let todayObj = {
    year: todayStrTokens[3],
    month: todayStrTokens[2],
    date: todayStrTokens[1],
    weekDay: todayStrTokens[0].slice(0,-1),
    realDate: today,
    shownDate: today,
}


let firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
let lastOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

let calendarData = {
    weekDays,
    today: todayObj,
    firstOfMonthDay: firstOfMonth,
    lastOfMonthDate: lastOfMonth,
}

let changeMonth = (newDate) => {
    console.log(newDate)
    let newDateStrTokens = newDate.toLocaleString('en-GB', {dateStyle: "full"}).split(' ')
    todayObj.year = newDateStrTokens[3]
    todayObj.month = newDateStrTokens[2]
    todayObj.date = newDateStrTokens[1]
    todayObj.shownDate = newDate
    calendarData.firstOfMonthDay = new Date(todayObj.shownDate.getFullYear(), todayObj.shownDate.getMonth(), 1).getDay()
    calendarData.lastOfMonthDate = new Date(todayObj.shownDate.getFullYear(), todayObj.shownDate.getMonth() + 1, 0).getDate()
    console.log(todayObj.realDate)
    console.log(todayObj.shownDate)
    console.log(calendarData.today.realDate.getMonth())
    console.log(calendarData.today.realDate.getFullYear())
}

module.exports= { calendarData, changeMonth}