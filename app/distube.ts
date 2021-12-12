import SoundCloudPlugin from "@distube/soundcloud";
import SpotifyPlugin from "@distube/spotify";
import DisTube from "distube";
import bot from "./bot";

const distube: DisTube = new DisTube(bot, {
  searchSongs: 1,
  searchCooldown: 30,
  leaveOnEmpty: true,
  emptyCooldown: 5,
  leaveOnFinish: true,
  leaveOnStop: true,
  emitNewSongOnly: true,
  savePreviousSongs: true,
  emitAddSongWhenCreatingQueue: true,
  emitAddListWhenCreatingQueue: true,
  plugins: [new SoundCloudPlugin(), new SpotifyPlugin()],
});

export default distube;
