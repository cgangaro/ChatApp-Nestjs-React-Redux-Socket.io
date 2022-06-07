import { randomInt } from "mathjs";

export function randomUsernameGenerate() {
    let ret: string = "";
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    while (ret.length < 5)
    {
        ret += characters.charAt(randomInt(25));
    }
    return ret;
}

export default randomUsernameGenerate;