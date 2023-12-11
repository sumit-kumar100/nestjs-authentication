import { hash, genSalt } from "bcrypt";
import { AES, enc } from "crypto-js";
import { configuration } from "@/config/env.config";

export const getEncryptedString = async (data: string) => {
  const { encryptionKey } = await configuration();

  return AES.encrypt(data, encryptionKey).toString();
};

export const getDecryptedString = async (cipher: string) => {
  const { encryptionKey } = await configuration();

  const bytes = AES.decrypt(cipher, encryptionKey);

  return bytes.toString(enc.Utf8);
};

export const getHashedString = async (data: string) => {
  const salt = await genSalt(10);

  return hash(data, salt);
};
