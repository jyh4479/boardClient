const FormatService = {
    getFormatDate: date => {
        let year = date.getFullYear();
        let month = (1 + date.getMonth());
        month = month >= 10 ? month : '0' + month;
        let day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '-' + month + '-' + day;

    },
    spaceCheck: check => {
        if (check === "") return null
        else return check
    }
}

const DateService = {
    getCurrentDate: () => {
        return FormatService.getFormatDate(new Date())
    }
}

export {DateService, FormatService}