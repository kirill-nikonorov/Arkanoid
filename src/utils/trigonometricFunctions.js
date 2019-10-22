const toRadians = (angle) => {
    return angle * (Math.PI / 180);
};

const {cos, sin} = Math;


export const toRoundCos = (degree) => {
    return cos(toRadians(degree)).toFixed(2)
};
export const toRoundSin = (degree) => {
    return sin(toRadians(degree)).toFixed(2)
};

export const findCathetuses = (hypotenuse, angle) => {
    return [hypotenuse * toRoundCos(angle), hypotenuse * toRoundSin(angle)]
};
export const findHypotenuseFromFarCathetus = (hypotenuse, angle) => {
    return hypotenuse / toRoundSin(angle)
};
export const findHypotenuseFromNearCathetus = (hypotenuse, angle) => {
    return hypotenuse / toRoundCos(angle)
};
export const putAngleInOrder = (angle) => {
    let newAngle = angle;
    if (angle < -360) newAngle = angle + 360;
    if (angle > 360) newAngle = angle - 360;

    return newAngle;
};