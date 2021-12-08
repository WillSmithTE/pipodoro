export const getTimes = () => devTimes

const prodTimes = buildTimes(
    25 * 60,
    5 * 60,
)

const devTimes = buildTimes(
    1 * 60,
    .2 * 60,
)

function buildTimes(workTimeSeconds, breakTimeSeconds) {
    return {
        workTimeSeconds,
        breakTimeSeconds
    }
}

