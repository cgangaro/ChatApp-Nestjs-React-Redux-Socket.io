export function validateInput(str: string) {
    if (str.length > 0 && str.length < 10)
        return true;
    return false;
}