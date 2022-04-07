const a = new Date()
const printDate =function(){
    console.log("Date is ",a.getDate())
}
const printMonth = function(){
    console.log("month is",a.getMonth()+1)
}
const getBatchInfo = function(){
    console.log("uranium1 the topic for today is nodejs module")
}

module.exports = {printDate,printMonth,getBatchInfo}





