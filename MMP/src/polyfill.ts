import { Buffer } from "buffer";
import EventEmitter from "events";

(window as any).global = window;
(window as any).Buffer = Buffer;
(window as any).EventEmitter = EventEmitter;
