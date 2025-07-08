export function registerSocketFunctions() {
  const socket = socketlib.registerModule("glitchcap");
  socket.register("summonGlitchcap", summonGlitchcap);
}

async function summonGlitchcap() {
  const summoner = canvas.tokens.placeables.find(t => t.actor?.name === "Al");
  const companionName = "Glitchcap";
  const companionActor = game.actors.getName(companionName);
  if (!summoner || !companionActor) {
    ui.notifications.warn("⚠️ Al or Glitchcap not found.");
    return;
  }

  const gridSize = canvas.grid.size;
  const newX = summoner.x + gridSize;
  const newY = summoner.y;

  const created = await canvas.scene.createEmbeddedDocuments("Token", [{
    name: companionName,
    actorId: companionActor.id,
    x: newX,
    y: newY,
    hidden: false,
    vision: false,
    disposition: 1,
    actorLink: true
  }]);

  const glitchcapToken = canvas.tokens.get(created[0].id);

  new Sequence()
    .sound()
      .file("spellcrash/sounds/bubble.mp3")
      .volume(0.8)
    .effect()
      .file("modules/JB2A_DnD5e/Library/Generic/Creature/FairiesOutwardBurst01_01_Regular_BluePurple_400x400.webm")
      .atLocation(glitchcapToken)
      .scale(0.3)
      .fadeIn(200)
      .fadeOut(100)
      .zIndex(-1)
    .play();
}
