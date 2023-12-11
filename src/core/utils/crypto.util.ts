import { hash, genSalt } from "bcrypt";
import { AES, enc } from "crypto-js";
import { configuration } from "@/config/env.config";

export async function getEncryptedString(data: string) {
  const { encryptionKey } = await configuration();

  return AES.encrypt(data, encryptionKey).toString();
}

export async function getDecryptedString(cipher: string) {
  const { encryptionKey } = await configuration();

  const bytes = AES.decrypt(cipher, encryptionKey);

  return bytes.toString(enc.Utf8);
}

export async function getHashedString(data: string) {
  const salt = await genSalt(10);

  return hash(data, salt);
}
