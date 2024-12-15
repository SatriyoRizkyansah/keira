function main() {
  const config = {
    parent: "game",
    type: Phaser.AUTO,
    width: Config.CAMERA_WIDTH_PX,
    height: Config.CAMERA_HEIGHT_PX,
    physics: {
      default: "arcade",
    },
    scene: {
      preload: preloadFn,
      create: createFn,
      update: updateFn,
    },
  };
  const game = new Phaser.Game(config);
  var blockList;
  var cursorKeys;
  var directorKeys;
  var directorState;
  var gift;
  var grinch;
  var instructions;
  var pathery;
  var patty;
  var santa;
  var victoryCutscene;
  var world;

  // Tombol virtual di HTML
  document.getElementById("up").addEventListener("click", () => simulateKey("ArrowUp"));
  document.getElementById("down").addEventListener("click", () => simulateKey("ArrowDown"));
  document.getElementById("left").addEventListener("click", () => simulateKey("ArrowLeft"));
  document.getElementById("right").addEventListener("click", () => simulateKey("ArrowRight"));
  document.getElementById("space").addEventListener("click", () => simulateKey(" "));
  document.getElementById("i").addEventListener("click", () => simulateKey("i"));
  document.getElementById("g").addEventListener("click", () => simulateKey("g"));

  function preloadFn() {
    this.load.spritesheet("girl", "img/keira.png", {
      frameWidth: Config.PATTY_SPRITE_WIDTH,
      frameHeight: Config.PATTY_SPRITE_HEIGHT,
    });
    this.load.spritesheet("santarun", "img/santarun.png", {
      frameWidth: Config.SANTA_RUN_SPRITE_WIDTH,
      frameHeight: Config.SANTA_RUN_SPRITE_HEIGHT,
    });
    this.load.spritesheet("santadead", "img/santadead.png", {
      frameWidth: Config.SANTA_DEAD_SPRITE_WIDTH,
      frameHeight: Config.SANTA_DEAD_SPRITE_HEIGHT,
    });
    this.load.spritesheet("grinchrun", "img/grinchrun.png", {
      frameWidth: Config.GRINCH_RUN_SPRITE_WIDTH,
      frameHeight: Config.GRINCH_RUN_SPRITE_HEIGHT,
    });
    this.load.spritesheet("tree", "img/tree.png", {
      frameWidth: Config.TREE_SPRITE_WIDTH,
      frameHeight: Config.TREE_SPRITE_HEIGHT,
    });
    this.load.spritesheet("justinblink", "img/rioblink.png", {
      frameWidth: Config.JUSTIN_SPRITE_WIDTH,
      frameHeight: Config.JUSTIN_SPRITE_HEIGHT,
    });

    this.load.image("acadia", "img/rambutmerah.png");
    this.load.image("bkb", "img/keira1.jpg");
    this.load.image("bookcase", "img/bookcase.png");
    this.load.image("confetti1", "img/confetti1.png");
    this.load.image("confetti2", "img/confetti2.png");
    this.load.image("confetti3", "img/confetti3.png");
    this.load.image("confetti4", "img/confetti4.png");
    this.load.image("confetti5", "img/confetti5.png");
    this.load.image("confetti6", "img/confetti6.png");
    this.load.image("confetti7", "img/confetti7.png");
    this.load.image("counter", "img/counter1.png");
    this.load.image("crate", "img/crate.png");
    this.load.image("fireplace", "img/fireplace.png");
    this.load.image("flowers", "img/flowers.png");
    this.load.image("gift", "img/gift.png");
    this.load.image("glow", "img/glow.png");
    this.load.image("grinchfaint", "img/grinchfaint.png");
    this.load.image("hamilton", "img/hamilton.png");
    this.load.image("heart", "img/heart.png");
    this.load.image("liam", "img/liam.png");
    this.load.image("pathmarker", "img/pathmarker.png");
    this.load.image("piano", "img/piano.png");
    this.load.image("rugleft", "img/rugleft.png");
    this.load.image("rugmiddle", "img/rugmiddle.png");
    this.load.image("rugtop", "img/rugtop.png");
    this.load.image("rugtopleft", "img/rugtopleft.png");
    this.load.image("fam", "img/fam.png");
    this.load.image("wallright", "img/wallright.png");
    this.load.image("walltop", "img/walltop.png");
    this.load.image("walltopright", "img/walltopright.png");
    this.load.image("wood", "img/wood.png");
    this.load.image("welcome", "img/welcome.png");
    this.load.image("window", "img/window.png");
  }

  let keyState = {}; // Untuk melacak status tombol (tekan atau tidak)

  function simulateKeyDown(key) {
    // Jika tombol belum ditekan
    if (!keyState[key]) {
      // Tandai tombol sebagai ditekan
      keyState[key] = true;

      // Trigger keydown event
      const downEvent = new KeyboardEvent("keydown", {
        key: key,
        keyCode: keyToCode(key),
        code: key,
        which: keyToCode(key),
        bubbles: true,
      });
      window.dispatchEvent(downEvent);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const directions = ["up", "down", "left", "right"];

    directions.forEach((dir) => {
      const button = document.getElementById(dir);
      if (button) {
        // Untuk desktop
        button.addEventListener("click", () => handleDirection(dir));

        // Untuk mobile (touch)
        button.addEventListener("touchstart", (e) => {
          e.preventDefault(); // Mencegah klik ganda
          handleDirection(dir);
        });
      }
    });

    function handleDirection(direction) {
      console.log("Direction:", direction); // Ganti dengan logika Anda
    }
  });

  // Fungsi untuk menambahkan event listener dengan dukungan sentuh
  function addTouchAndClickListener(element, onTouchStart, onTouchEnd) {
    element.addEventListener("mousedown", onTouchStart);
    element.addEventListener("mouseup", onTouchEnd);
    element.addEventListener("touchstart", (e) => {
      e.preventDefault(); // Mencegah "click" duplikat
      onTouchStart();
    });
    element.addEventListener("touchend", (e) => {
      e.preventDefault();
      onTouchEnd();
    });
  }

  // Tambahkan event listener untuk semua tombol
  addTouchAndClickListener(
    document.getElementById("up"),
    () => simulateKeyDown("ArrowUp"),
    () => simulateKeyUp("ArrowUp")
  );
  addTouchAndClickListener(
    document.getElementById("down"),
    () => simulateKeyDown("ArrowDown"),
    () => simulateKeyUp("ArrowDown")
  );
  addTouchAndClickListener(
    document.getElementById("left"),
    () => simulateKeyDown("ArrowLeft"),
    () => simulateKeyUp("ArrowLeft")
  );
  addTouchAndClickListener(
    document.getElementById("right"),
    () => simulateKeyDown("ArrowRight"),
    () => simulateKeyUp("ArrowRight")
  );
  addTouchAndClickListener(
    document.getElementById("space"),
    () => simulateKeyDown(" "),
    () => simulateKeyUp(" ")
  );
  addTouchAndClickListener(
    document.getElementById("i"),
    () => simulateKeyDown("i"),
    () => simulateKeyUp("i")
  );
  addTouchAndClickListener(
    document.getElementById("g"),
    () => simulateKeyDown("g"),
    () => simulateKeyUp("g")
  );

  function simulateKeyUp(key) {
    // Jika tombol sedang ditekan
    if (keyState[key]) {
      // Tandai tombol sebagai dilepas
      keyState[key] = false;

      // Trigger keyup event
      const upEvent = new KeyboardEvent("keyup", {
        key: key,
        keyCode: keyToCode(key),
        code: key,
        which: keyToCode(key),
        bubbles: true,
      });
      window.dispatchEvent(upEvent);
    }
  }

  // Map key untuk keyCode yang sesuai
  function keyToCode(key) {
    const keyMap = {
      ArrowUp: 38,
      ArrowDown: 40,
      ArrowLeft: 37,
      ArrowRight: 39,
      " ": 32, // Spasi
      i: 73,
      g: 71,
    };
    return keyMap[key] || 0; // Return 0 if key not found
  }

  // Tombol virtual
  document.getElementById("up").addEventListener("mousedown", () => simulateKeyDown("ArrowUp"));
  document.getElementById("down").addEventListener("mousedown", () => simulateKeyDown("ArrowDown"));
  document.getElementById("left").addEventListener("mousedown", () => simulateKeyDown("ArrowLeft"));
  document.getElementById("right").addEventListener("mousedown", () => simulateKeyDown("ArrowRight"));
  document.getElementById("space").addEventListener("mousedown", () => simulateKeyDown(" "));
  document.getElementById("i").addEventListener("mousedown", () => simulateKeyDown("i"));
  document.getElementById("g").addEventListener("mousedown", () => simulateKeyDown("g"));

  document.getElementById("up").addEventListener("mouseup", () => simulateKeyUp("ArrowUp"));
  document.getElementById("down").addEventListener("mouseup", () => simulateKeyUp("ArrowDown"));
  document.getElementById("left").addEventListener("mouseup", () => simulateKeyUp("ArrowLeft"));
  document.getElementById("right").addEventListener("mouseup", () => simulateKeyUp("ArrowRight"));
  document.getElementById("space").addEventListener("mouseup", () => simulateKeyUp(" "));
  document.getElementById("i").addEventListener("mouseup", () => simulateKeyUp("i"));
  document.getElementById("g").addEventListener("mouseup", () => simulateKeyUp("g"));

  function createFn() {
    cursorKeys = this.input.keyboard.createCursorKeys();
    directorKeys = this.input.keyboard.addKeys("space");

    directorState = new DirectorState(directorKeys);
    world = new World(this);
    grid = new Grid(this, world);
    pathery = new Pathery(world, grid);
    blockList = new BlockList(this, world, grid, directorState);
    santa = new Santa(this, grid, directorState);
    grinch = new Grinch(this, grid, directorState);
    patty = new Patty(this, world, grid, cursorKeys);
    gift = new Gift(this, grid);
    director = new Director(this, grid, pathery, santa, grinch, gift, directorState);
    victoryCutscene = new VictoryCutscene(this, patty, gift, directorState, ["confetti1", "confetti2", "confetti3", "confetti4", "confetti5", "confetti6", "confetti7"]);
    instructions = new Instructions(this);

    this.input.keyboard.on("keydown", function (e) {
      if (e.keyCode == Config.DIRECTOR_PRODUCTION_RUNNING_KEY_CODE) {
        director.toggleProductionRunning();
      }
      if (e.keyCode == Config.RESET_KEY_CODE) {
        // resetWithPresetPuzzle(this);
      }
      if (e.keyCode == Config.TOGGLE_INSTRUCTIONS_KEY_CODE) {
        instructions.toggleVisibility();
      }
    });

    resetWithPresetPuzzle(this /* scene */);
  }

  function updateFn() {
    blockList.update(patty.getSprite(), cursorKeys);
    // Patty must move after checking for collisions to allow other sprites to
    // check for overlaps on the next update.
    world.checkCollisions(patty.getSprite());

    patty.update();
    santa.update();
    grinch.update();
    gift.update();
    victoryCutscene.update();
  }

  function resetWithPresetPuzzle(scene) {
    if (directorState.isVictorious()) {
      // Don't reset if we're victorious.
      return;
    }
    resetPuzzle(scene, 4 /* startY */, 1 /* endY */, 6 /* targetX */, 1 /* targetY */, 3 /* keiraX */, 4 /* keiraY */, 17 /* grinchMaxStamina */);
  }

  function resetPuzzle(scene, startY, endY, targetX, targetY, pattyX, pattyY, grinchMaxStamina) {
    world.reset();
    grid.reset(startY, endY, { x: targetX, y: targetY });

    const rightWallGapCenter = grid.getTileCenter(0, endY);
    world.renderRightWall(rightWallGapCenter.y - Config.GRID_TILE_SIZE_PX / 2, rightWallGapCenter.y + Config.GRID_TILE_SIZE_PX / 2);
    blockList.reset();
    blockList.addBlockInGrid(1, 2, "crate");
    blockList.addBlockInGrid(2, 4, "crate");
    blockList.addBlockInGrid(4, 6, "crate");
    blockList.addBlockInGrid(7, 1, "crate");
    blockList.addBlockInGrid(7, 2, "crate");
    blockList.addBlockInGrid(8, 5, "crate");
    blockList.addBlockInGrid(9, 4, "crate");

    createBlinkAnimation(scene, "justinBlinking");
    const justin = blockList.addBlockOffGrid(0, -1, "justinblink", "justinBlinking");

    santa.hide();
    grinch.reset(grinchMaxStamina);
    gift.hide();
    director.reset();
    patty.reset(justin);

    const pattyBounds = patty.getSprite().getBounds();
    if (world.anyObstacleInRegion(pattyBounds.centerX, pattyBounds.centerY, pattyBounds.width, pattyBounds.height)) {
      patty.teleportTo(pattyX, pattyY);
    }
  }

  function createBlinkAnimation(scene, animationKey) {
    const frames = [];
    for (var i = 0; i < Config.JUSTIN_BLINKING_RATIO; i++) {
      frames.push({
        key: "justinblink",
        frame: 0,
      });
    }
    frames.push({
      key: "justinblink",
      frame: 1,
    });

    scene.anims.create({
      key: "justinBlinking",
      frames: frames,
      frameRate: Config.JUSTIN_BLINKING_SPEED,
      repeat: -1,
    });
  }
}

window.onload = main;
