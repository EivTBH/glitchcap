// This file is now live in the textdoc above and runs once socketlib is ready
import { registerSocketFunctions } from './socket.js';

Hooks.once("socketlib.ready", () => {
  registerSocketFunctions();
});
