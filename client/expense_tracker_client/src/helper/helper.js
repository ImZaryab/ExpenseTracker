import _ from 'lodash'

export function getSum(transaction, type){
    let sum = _(transaction)
            .groupBy("type") //groups the entries by the key "type" into arrays
            .map((obj, key) => {
                if(!type) return _.sumBy(obj, 'amount') //sums the 'amount' keys from each array and maps them to the respective array
                return {
                    'type': key,
                    'color': obj[0].color,
                    'total': _.sumBy(obj, 'amount')
                }
            })
            .value()
    return sum;
}

export function getLabelsPercentage(transaction){
    let amountSum = getSum(transaction, 'type');
    let totalAll = _.sum(getSum(transaction));

    let percentage = _(amountSum)
                    .map(obj => _.assign(obj, { percentage: (100 * obj.total) / totalAll }))
                    .value()
    return percentage;
}

export function chart_Data(transaction, custom){

    // let dataValue = getSum(transaction);

    let colors = _.map(transaction, a => a.color) //create array of all colors from transactions
    colors = _.uniq(colors) //create a unique array of the colors to remove duplicates

    const config = {
        data: {
            datasets:[{
                data: getSum(transaction),
                backgroundColor: colors,
                hoverOffset: 2,
                borderRadius: 5,
                spacing: 15,
            }]
        },
        options: {
            cutout: 100
        }
    }

    return custom ?? config;
}

export function getTotal(transaction){
    return _.sum(getSum(transaction));
}