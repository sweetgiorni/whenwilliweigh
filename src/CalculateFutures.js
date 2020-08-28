import moment from 'moment';

//const kgs_to_lbs = (kgs) => kgs * 2.20462262185;
const lbs_to_kgs = (lbs) => lbs * 0.45359237;

const calculate_bmr = (gender, lbs, inches, age) => {
    if (gender === "male") {
        return (4.536  * lbs) + (15.88  * inches) - (5.0 * age) + 5;
    }
    return (4.536 * lbs) + (15.88 * inches) - (5.0 * age) - 161;
}

const exerciseCalsBurned = (weight, mets, minutes) => {
    return mets * 3.5 * lbs_to_kgs(weight) / 200 * minutes
}

export const createLine = (gender, caloriesIn, mets, exerciseMinutes, height, startWeight, age, goalWeight) => {
    var weights = [startWeight]
    var dates = [moment()]

    var currentDate = dates[0]
    var currentWeight = startWeight
    var tooFast = false
    while (true) {
        var bmr = calculate_bmr(gender, currentWeight, height, age) * 1.2 // 1.2 is for little-to-no exercise; this will be factored in later with METs and minutes exercised
        var deficit = bmr - caloriesIn
        deficit += exerciseCalsBurned(currentWeight, mets, exerciseMinutes)
        var newWeight = currentWeight - (deficit / 3500.0)

        currentWeight = newWeight;

        var newDate = currentDate.clone()
        newDate.add(1, 'days')
        currentDate = newDate

        weights.push(newWeight);
        dates.push(newDate.toDate());
        if (currentWeight < goalWeight)
            break;
        if (dates.length > 1000) {
            console.log("Calculation overdose! XXX")
            break;
        }
        // Check if losing more than two pounds per week
        if (tooFast === false && weights.length % 7 === 0) {
            if (weights[weights.length - 7] - currentWeight > 2.0) {
                tooFast = true;
            }
        }
    }
    return [dates, weights, tooFast]
}
