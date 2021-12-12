import { Message, StageChannel, VoiceChannel } from "discord.js";
import DisTube from "distube";

export type PlayResult = Promise<void | Message<boolean> | DisTube>;
export type PauseResult = Promise<Message<boolean> | undefined | void>;
export type ResumeResult = Promise<Message<boolean> | undefined | void>;
export type Voice = VoiceChannel | StageChannel | null | undefined;
export type StopResult = Promise<Message<boolean>> | undefined;
export type PrevResult = Promise<Message<boolean> | void> | void | DisTube;
export type SkipResult = Promise<Message<boolean> | void>;
