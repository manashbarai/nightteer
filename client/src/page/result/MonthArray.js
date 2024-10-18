const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

function getOrdinalSuffix(day) {
    if(day==='1'){
        return `${day}st`
    }else if(day==='2'){
        return `${day}nd`
    }else if(day==='3'){
        return `${day}rd`
    }else{
        return `${day}th`
    }
   
}
module.exports={monthNames,getOrdinalSuffix}
