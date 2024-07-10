class DateHandler{
    dateStringToDate(dateString, time = "00:00:00") {
        const [day, month, year] = dateString.split("/").map(part => part.padStart(2,'0'));
        if (!day || !month || !year) {
            throw new Error('Data fornecida inválida.');
        }
        const date = new Date(`${year}-${month}-${day}T${time}-03:00`);
        return date;
    }

    toAmazonIsoDateTime(date){
        const [day, month, year] = date.toLocaleDateString().split("/").map(part => part.padStart(2,'0'));
        const time = date.toLocaleTimeString();
        const timeString = `T${time}-03:00`;
        const amazonIsoDateTime = `${year}-${month}-${day}${timeString}`;
        return amazonIsoDateTime;
    }

    getAmazonOrdersIsoDateTimeNow(){
        const date = new Date();
        const now = new Date(date.getTime()-300000);
        return this.toAmazonIsoDateTime(now);
    }

    validateDateString(dateString){
        
        const errors = [];
        
        function verifyLeapYear(year){
            if ((year%4 === 0 && year%100 !== 0) || year%400 == 0) {
                return true;
            } else {
                return false;
            }
        }

        let [day = "0", month = "0", year = "0"] = dateString.split("/")
        const hasTwoBars = dateString.split("/").length == 3;
        const dayIsNumber = isNaN(Number(day));
        const monthIsNumber = isNaN(Number(month));
        const yearIsNumber = isNaN(Number(year));
        const dayLengthOk = day.length >= 1 || false;
        const monthLengthOk = month.length >= 1 || false;
        const yearLengthOk = (year.length === 4 || year.length === 2) || false;
        year = year.length === 2 ? "20" + year : year;
        
        if (!hasTwoBars){
            console.log('A data deve estar no formato "dd/mm/aaaa" ou "dd/mm/aaaa".');
            return false;
        }
        
        if (dayIsNumber) {
            errors.push('Dia inserido não numérico.');
        }
        
        if (monthIsNumber) {
            errors.push('Mês inserido não numérico.');
        }
        
        if (yearIsNumber) {
            errors.push('Ano inserido não numérico.');
        }
        
        if (!dayLengthOk) {
            errors.push('Dia inserido inválido.');
        }
        
        if (!monthLengthOk) {
            errors.push('Mês inserido inválido.');
        }
        
        if (!yearLengthOk) {
            errors.push('Ano inserido inválido.');
        }
        
        if (errors.length === 0) {
            const isLeapYear = verifyLeapYear(year);

            const daysOfMonth = isLeapYear ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            const daysInCurrentMonth = daysOfMonth[Number(month) - 1]
            const isValidMonth = (month >= 1 && month <= 12);
            const isValidYear = (year >= 2000);
            const isValidDay = (day <= daysInCurrentMonth && day >= 1);

            if (isValidMonth && !isValidDay) {
                errors.push('Dia inserido inválido.');
            }
            if (!isValidMonth) {
                errors.push('Mês inserido inválido.');
            }
            if (!isValidYear) {
                errors.push('Ano inserido inválido. Digite um ano maior que 1999.');
            }

        }
            
        if (errors.length > 0) {
            console.log('Data inválida, os seguintes erros foram encontrados:')
            errors.forEach((error, index) => {
                console.log(`${index + 1}. ${error}`);
            })
            return false
        } else {
            return true;
        }
    }
}

module.exports = DateHandler;