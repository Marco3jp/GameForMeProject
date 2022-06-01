import * as PIXI from "pixi.js";

// 試合を見守るサービス
// GameMasterと似ているがこちらのサービスはゲームの中身には干渉せず、一時停止とか再開を担う
export class GameGuardian {
    public static pause() {
        PIXI.Ticker.shared.stop()
    }

    public static resume() {
        PIXI.Ticker.shared.start()
    }
}