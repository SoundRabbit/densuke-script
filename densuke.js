const from = [2021, 10];
const to = [2021, 11];
const time_table = {
    holiday: ["13:00～17:00", "17:00～21:00", "21:00～25:00"],
    normal: ["21:00～25:00"],
};
const holiday = new Set([[2021, 11, 3], [2021, 11, 23]]);

const isHoliday = date => {
    return holiday.has([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
};

const format = date => {
    const day = ["日", "月", "火", "水", "木", "金", "土"];
    const month = date.getMonth() + 1;

    const red = "🟥";
    const blue = "🟦";
    const black = "⬛";
    const holiday = "🔴"

    let prefix = black;
    if (date.getDay() == 0) {
        prefix = red;
    } else if (isHoliday(date)) {
        prefix = holiday;
    } else if (date.getDay() == 6) {
        prefix = blue;
    }

    return prefix + `${("00" + month).slice(-2)}月${("00" + date.getDate()).slice(-2)}日（${day[date.getDay()]}）`;
};

const logMonth = (year, month) => {
    const date = new Date(year, month - 1, 1);

    while (date.getFullYear() == year && date.getMonth() < month) {
        let times = time_table.normal;
        if (date.getDay() == 0 || date.getDay() == 6 || isHoliday(date)) {
            times = time_table.holiday;
        }

        for (time of times) {
            console.log(format(date) + " " + time);
        }
        date.setDate(date.getDate() + 1);
    }

};

const monthLen = from[0] == to[0] ? to[1] - from[1] : (to[0] - from[0] - 1) * 12 + (12 - from[1]) + to[1];

for (let monthOffet = 0; monthOffet <= monthLen; monthOffet++) {
    const month = (from[1] + monthOffet - 1) % 12 + 1;
    const year = from[0] + Math.floor((from[1] + monthOffet - 1) / 12)

    logMonth(year, month);
}
