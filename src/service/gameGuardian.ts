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

    /**
     * @param data
     * @param key
     */
    public static log(data: object | string | number, key?: string) {
        const loggerElm = document.querySelector("#logger")
        if (!loggerElm) return

        const newElm = document.createElement("pre")
        if (typeof data === "string") {
            newElm.textContent = data
        } if (typeof data === "number"){
            newElm.textContent = data.toString()
        }else {
            newElm.textContent = JSON.stringify(data)
        }

        if (key) {
            newElm.classList.add(key)
            const oldElm = document.querySelector(`.${key}`)
            if (oldElm) {
                oldElm.replaceWith(newElm)
                return;
            }
        }

        loggerElm.appendChild(newElm)
    }
}