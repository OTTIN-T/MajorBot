import { Message } from "discord.js";
import DisTube from "distube";
import ListCommand from "./help";
import NwMap from "./nwMap";
import NwServer from "./nwServer";
import Pause from "./pause";
import Play from "./play";
import Prev from "./prev";
import Resume from "./resume";
import Skip from "./skip";
import Stop from "./stop";

export default class Command {
  constructor() {}

  static async action(
    message: Message<boolean>,
    args: string[],
    command: string
  ): Promise<void | Message<boolean> | DisTube | number> {
    if (command === "help") {
      return await ListCommand.action(message);
    }
    if (command === "play") {
      return await Play.action(message, args);
    }
    if (command === "stop") {
      return await Pause.action(message);
    }
    if (command === "skip") {
      return await Resume.action(message);
    }
    if (command === "prev") {
      return await Skip.action(message);
    }
    if (command === "pause") {
      return await Prev.action(message);
    }
    if (command === "unpause") {
      return await Stop.action(message);
    }
    if (command === "nwmap") {
      return await NwMap.action(message);
    }
    if (command === "nwserver") {
      return await NwServer.action(message);
    }
  }
}
