import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { getEncryptedString, getHashedString } from "@/core/utils/crypto.util";

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        firstName: "John",
        lastName: "Doe",
        email: "john@gmail.com",
        permissions: "admin",
        password: await getHashedString("john@123"),
        encPassword: await getEncryptedString("john@123"),
      },
      {
        id: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@gmail.com",
        permissions: "user",
        password: await getHashedString("jane@123"),
        encPassword: await getEncryptedString("jane@123"),
      },
      {
        id: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob@gmail.com",
        permissions: "user",
        password: await getHashedString("bob@123"),
        encPassword: await getEncryptedString("bob@123"),
      },
      {
        id: "6ba7b813-9dad-11d1-80b4-00c04fd430c8",
        firstName: "Alice",
        lastName: "Williams",
        email: "alice@gmail.com",
        permissions: "user",
        password: await getHashedString("alice@123"),
        encPassword: await getEncryptedString("alice@123"),
      },
      {
        id: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
        firstName: "Charlie",
        lastName: "Brown",
        email: "charlie@gmail.com",
        permissions: "user",
        password: await getHashedString("charlie@123"),
        encPassword: await getEncryptedString("charlie@123"),
      },
    ]);
  }
}
