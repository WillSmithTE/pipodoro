export const getTimes = () => prodTimes

const prodTimes = buildTimes([
    25 * 60,
    5 * 60,
])

const devTimes = buildTimes([
    5, 10, 1, 20
])

function buildTimes(times) {
    return times
}

