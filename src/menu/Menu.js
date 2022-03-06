import { Lightning } from '@lightningjs/sdk'
import Item from './Item.js'

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      x: 50,
      y: 150,
      Items: {
        x: 40,
      },
      FocusIndicator: { y: 5, text: { text: '>', fontFace: 'Regular', fontSize: 14 } },
    }
  }

  _init() {
    this._blink = this.tag('FocusIndicator').animation({
      duration: 0.5,
      repeat: 0,
      actions: [{ p: 'x', v: { 0: 0, 0.5: -40, 1: 0 } }],
    })

    this._blink.start()

    this._index = 0
  }

  set items(v) {
    this.tag('Items').children = v.map((el, idx) => {
      return {
        type: Item,
        action: el.action,
        label: el.label,
        y: idx * 90,
        title: el.title,
        description: el.description,
      }
    })
  }

  get items() {
    return this.tag('Items').children
  }

  get activeItem() {
    return this.items[this._index]
  }

  _handleUp() {
    this._setIndex(Math.max(0, --this._index))
  }

  _handleDown() {
    this._setIndex(Math.min(++this._index, this.items.length - 1))
  }

  _setIndex(idx) {
    this.tag('FocusIndicator').setSmooth('y', idx * 90 + 5)
    this._index = idx
  }
}
