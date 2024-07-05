class DateHandler{
    dateStringToDate(dateString) {
        const [day, month, year] = dateString.split("/").map(part => part.padStart(2,'0'));
        if (!day || !month || !year) {
            throw new Error('Data fornecida inválida.');
        }
        const date = new Date(`${year}-${month}-${day}`);
        return new Date(date.getTime()+(3*60*60*1000));
    }

    toAmazonIsoDateTime(date){
        const dateString = date.toLocaleDateString();
        const time = date.toLocaleTimeString();
        const amazonIsoDateTime = `${dateString}T${time}-03:00`
        return amazonIsoDateTime;
    }

    getAmazonOrdersIsoDateTimeNow(){
        const date = new Date();
        const now = new Date(date.getTime()-300000);
        return this.toAmazonIsoDateTime(now);
    }
}

module.exports = DateHandler;