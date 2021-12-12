type HelpType = "help";
type PlayType = "play";
type StopType = "stop";
type SkipType = "skip";
type PrevType = "prev";
type PauseType = "pause";
type UnpauseType = "unpause";
type NwmapType = "nwmap";
type NwserverType = "nwserver";
export interface Command {
  command: HelpType;
  play: PlayType;
  stop: StopType;
  skip: SkipType;
  prev: PrevType;
  pause: PauseType;
  unpause: UnpauseType;
  nwmap: NwmapType;
  nwserver: NwserverType;
}
