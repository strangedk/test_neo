import * as signals from "signals";

const add = () => new signals.Signal()

export default {
  onInit : add(),
  onChoose : add(),
  onWin : add(),
  onLoose : add(),
  onExtra : add(),
  onBonusOpen : add(),
  onBonusClosed : add(),
  onOk : add(),

  onGameOver : add(),

  disableItems : add(),
  enableItems : add(),
}
