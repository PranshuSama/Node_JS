import "dotenv/config";
import { REST, Routes } from "discord.js";

const token = process.env.DISCORD_BOT_TOKEN;
const applicationId = process.env.DISCORD_APPLICATION_ID;

if (!token || !applicationId) {
  throw new Error("DISCORD_BOT_TOKEN and DISCORD_APPLICATION_ID are required");
}

const commands = [
  {
    name: "create",
    description: "Create a short URL",
  },
];

const rest = new REST({ version: "10" }).setToken(token);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(applicationId), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
