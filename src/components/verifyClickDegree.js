const verifyClickDegree = (firstCoord, secondCoord) => {
    return (firstCoord === secondCoord ||
    firstCoord + 1 === secondCoord ||
    firstCoord + 2 === secondCoord ||
    firstCoord - 1 === secondCoord ||
    firstCoord - 2 === secondCoord
    )
}

export default verifyClickDegree