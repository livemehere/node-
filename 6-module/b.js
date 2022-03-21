let count =0;


function getCount(){
    return count;
}

function increase(){
    count++;
}


exports.count = count;
exports.getCount = getCount;
exports.increase = increase;
