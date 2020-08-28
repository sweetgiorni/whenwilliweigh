import moment from 'moment';

const kgs_to_lbs = (kgs) => kgs * 2.20462262185;
const lbs_to_kgs = (lbs) => lbs * 0.45359237;

const bmr = (gender, lbs, inches, age) => {
    if (gender === "male") {
        return 66.0 + (6.2 * lbs) + (12.7 * inches) - (6.76 * age);
    }
    return 655.0 + (4.35 * lbs) + (4.7 * inches) - (4.7 * age);
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
        var newWeight = currentWeight - (bmr(gender, currentWeight, height, age) - caloriesIn + exerciseCalsBurned(currentWeight, mets, exerciseMinutes)) / 3500

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
