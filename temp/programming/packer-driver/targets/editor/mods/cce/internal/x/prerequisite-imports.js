System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: async function () {
      // Auto generated represents the prerequisite imports of project modules.
      await (async () => {
        const requests = [() => _context.import("file:///D:/Tower-Run/Tower-Run/assets/Scripts/Block.ts"), () => _context.import("file:///D:/Tower-Run/Tower-Run/assets/Scripts/CheckPoint.ts"), () => _context.import("file:///D:/Tower-Run/Tower-Run/assets/Scripts/Coin.ts"), () => _context.import("file:///D:/Tower-Run/Tower-Run/assets/Scripts/GameManager.ts"), () => _context.import("file:///D:/Tower-Run/Tower-Run/assets/Scripts/MenuUIManager.ts"), () => _context.import("file:///D:/Tower-Run/Tower-Run/assets/Scripts/Player.ts"), () => _context.import("file:///D:/Tower-Run/Tower-Run/assets/Scripts/PlayerCtrl.ts"), () => _context.import("file:///D:/Tower-Run/Tower-Run/assets/Scripts/Progress.ts"), () => _context.import("file:///D:/Tower-Run/Tower-Run/assets/Scripts/Score.ts"), () => _context.import("file:///D:/Tower-Run/Tower-Run/assets/Scripts/UIManager.ts"), () => _context.import("file:///D:/Tower-Run/Tower-Run/assets/Scripts/UIModel.ts")];

        for (const request of requests) {
          try {
            await request();
          } catch (_err) {// The error should have been caught by executor.
          }
        }
      })();
    }
  };
});
//# sourceMappingURL=prerequisite-imports.js.map