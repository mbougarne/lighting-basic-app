/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Router, Utils, Colors } from '@lightningjs/sdk'
import routes from './lib/routes'
import { Main, Splash } from './pages'

export default class App extends Router.App {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      rect: true,
      color: Colors('black').get(),
      w: 1920,
      h: 1080,
      Logo: {
        x: 50,
        y: 50,
        text: { text: 'RTL+', fontFace: 'Regular', textColor: Colors('yellow').get() },
      },
      Splash: {
        type: Splash,
        signals: { loaded: true },
        alpha: 0,
      },
      Main: {
        type: Main,
        alpha: 0,
        signals: { select: 'menuSelect' },
      },
    }
  }

  _setup() {
    Router.startRouter(routes)
    this._setState('Splash')
  }

  static _states() {
    return [
      class Splash extends this {
        $enter() {
          this.tag('Splash').setSmooth('alpha', 1)
        }

        $exit() {
          this.tag('Splash').setSmooth('alpha', 0)
        }

        loaded() {
          this._setState('Main')
        }
      },
      class Main extends this {
        $enter() {
          this.tag('Main').patch({
            smooth: { alpha: 1, y: 0 },
          })
        }

        $exit() {
          this.tag('Main').patch({
            smooth: { alpha: 0, y: 100 },
          })
        }

        menuSelect({ item }) {
          if (this._hasMethod(item.action)) {
            return this[item.action]()
          }
        }

        _getFocused() {
          return this.tag('Main')
        }
      },
    ]
  }
}
