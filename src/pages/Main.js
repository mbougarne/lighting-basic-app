import { Lightning, Colors, Router } from '@lightningjs/sdk'
import { Menu } from '../menu'

export default class Main extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,
      Menu: {
        type: Menu,
        items: [
          { label: 'Home', action: 'home', title: 'Home Page', description: 'Welcome to RTL+' },
          {
            label: 'ABOUT',
            action: 'about',
            title: 'About Page',
            description: 'Learn more about RTL+',
          },
          {
            label: 'Search',
            action: 'search',
            title: 'Search Page',
            description: 'Search for something',
          },
        ],
      },
      Headline: {
        mount: 0.5,
        x: 960,
        y: 540,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 48,
          textColor: Colors('white').get(),
        },
      },
      Description: {
        mount: 0.5,
        x: 960,
        y: 600,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 24,
          textColor: Colors('white').get(),
        },
      },
    }
  }

  _setContent() {
    const { title, description } = this.tag('Menu').activeItem
    this.tag('Headline').patch({
      text: { text: title },
    })

    this.tag('Description').patch({
      text: { text: description },
    })
  }

  _getFocused() {
    return this.tag('Menu')
  }

  _handleEnter() {
    this.signal('select', { item: this.tag('Menu').activeItem })
    Router.navigate(this.tag('Menu').activeItem.action)
    this._setContent()
  }

  _active() {
    this._setContent()
  }
}
