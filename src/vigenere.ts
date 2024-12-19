export const vigenere = (text: string, key: string, decrypt: boolean = false): string => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const keyUpper = key.toUpperCase();
    let result = "";

    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const isUpperCase = char === char.toUpperCase();
        const charUpper = char.toUpperCase();

        if (!alphabet.includes(charUpper)) {
            result += char;
            continue;
        }

        const textIndex = alphabet.indexOf(charUpper);
        const keyChar = keyUpper[keyIndex % keyUpper.length];
        const keyIndexShift = alphabet.indexOf(keyChar);

        const shift = decrypt ? -keyIndexShift : keyIndexShift;
        const newIndex = (textIndex + shift + alphabet.length) % alphabet.length;

        result += isUpperCase
            ? alphabet[newIndex]
            : alphabet[newIndex].toLowerCase();

        keyIndex++;
    }

    return result;
}
