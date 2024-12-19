import {vigenere} from "./src/vigenere.ts";
import {aesDecrypt, aesEncrypt, gmul, keyExpansion} from "./src/aes.ts";

console.log("====================================");
console.log("Vigenère encryption/decryption");
console.log("====================================");

const plainText = "Hell0 world!";
const key = "CLEF";

// Chiffrement
const encrypted = vigenere(plainText, key);
console.log("Encrypted text:", encrypted);

// Déchiffrement
const decrypted = vigenere(encrypted, key, true);
console.log("Decrypted text:", decrypted);

console.log("\n====================================");
console.log("Advanced Encryption Standard (AES) - GF(256) operations");
console.log("====================================");

const a = 123;
const b = 44;
console.log(`Product of ${a} and ${b} in GF(256): ${gmul(a, b)}`);

const hex_key = [0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c];
const hex_message = [0x32, 0x43, 0xf6, 0xa8, 0x88, 0x5a, 0x30, 0x8d, 0x31, 0x31, 0x98, 0xa2, 0xe0, 0x37, 0x07, 0x34];
const expandedKey = keyExpansion(hex_key);
console.log("Expanded key:", expandedKey)

const aesEncrypted = aesEncrypt(hex_message, expandedKey);
console.log("Encrypted output:", aesEncrypted);

const aesDecrypted = aesDecrypt(aesEncrypted, expandedKey);
console.log("Decrypted output:", aesDecrypted);

const hexOutput = aesDecrypted.map(byte => '0x' + byte.toString(16)).join(', ');
console.log("Decrypted output in hexadecimal:", hexOutput);

if (JSON.stringify(hex_message) === JSON.stringify(aesDecrypted)) {
    console.log("Decryption successful! The message matches the original.");
} else {
    console.log("Decryption failed! The message does not match the original.");
}
