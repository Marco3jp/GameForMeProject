import {reflectionInput, ReflectionInterface} from "../component/service/reflection";

/**
 * 反射を管理するサービス
 */
export class Reflection implements ReflectionInterface{
    /**
     * 直線に対する反射を計算する
     * @return {number} 反射角を返す
     */
    public calculateWithLine(reflective: reflectionInput, wall: reflectionInput): number {
        // 壁を常に0度とみなす考え方
        // ReflectiveAngleが負にならないように、一旦360を加算してから壁の角度を引いて、その上で超えている部分は弾く
        const correctedReflectiveAngle = ((reflective.angle + 360) - wall.angle) % 360

        // TODO: 条件は一旦わかりやすさのために分割しているので、まとめられそうならまとめてみる
        if (correctedReflectiveAngle >= 0 && 90 > correctedReflectiveAngle) {
            // 左上から右上に反射するパターン
            return (360 - correctedReflectiveAngle + wall.angle) % 360
        } else if(correctedReflectiveAngle >= 90 && 180 > correctedReflectiveAngle){
            // 右上から左上に反射するパターン
            const angleOfIncidence = 180 - correctedReflectiveAngle;
            return (180 + angleOfIncidence + wall.angle) % 360
        }else if(correctedReflectiveAngle >= 180 && 270 > correctedReflectiveAngle){
            // 右下から左下に反射するパターン
            const angleOfIncidence = correctedReflectiveAngle - 180;
            return (180 - angleOfIncidence + wall.angle) % 360
        }else if(correctedReflectiveAngle >= 270 && 360 >= correctedReflectiveAngle) {
            // 左下から右下に反射するパターン
            return (360 - correctedReflectiveAngle + wall.angle) % 360
        }

        throw new Error("Unexpect case")
    }
}