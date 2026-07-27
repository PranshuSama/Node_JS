import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import connectDB from "./connection.js";
import { createShortURL } from "./controllers/url.js";
import URL from "./models/url.js";
import express from "express";

const token = process.env.DISCORD_BOT_TOKEN;
const mongoURL = process.env.MONGO_URL;

if (!token) {
  throw new Error("DISCORD_BOT_TOKEN is required");
}

if (!mongoURL) {
  throw new Error("MONGO_URL is required");
}

// Connect to MongoDB
connectDB(mongoURL);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  message.reply({
    content: "Hi From Bot",
  });

  if (message.content.startsWith("create ")) {
    const url = message.content.split("create ")[1].trim();
    if (!url) {
      return message.reply("Please provide a URL to shorten.");
    }

    try {
      const shortUrl = await createShortURL(url);
      return message.reply(`Shortened URL: ${shortUrl}`);
    } catch (error) {
      console.error(error);
      return message.reply("There was an error shortening the URL.");
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "create") {
    const url = interaction.options.getString("url");
    try {
      const shortUrl = await createShortURL(url);
      await interaction.reply(`Shortened URL: ${shortUrl}`);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "There was an error shortening the URL.", ephemeral: true });
    }
  }
});

client.login(token);

const app = express();
const port = 3000;

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (entry) {
      res.redirect(entry.redirectURL);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
