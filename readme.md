# react-particle-effect-button ([demo](https://transitive-bullshit.github.io/react-particle-effect-button/))

> Bursting particle effect buttons for React.

[![NPM](https://img.shields.io/npm/v/react-particle-effect-button.svg)](https://www.npmjs.com/package/react-particle-effect-button) [![Build Status](https://travis-ci.org/transitive-bullshit/react-particle-effect-button.svg?branch=master)](https://travis-ci.org/transitive-bullshit/react-particle-effect-button) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![Demo](https://raw.githubusercontent.com/transitive-bullshit/react-particle-effect-button/master/example/demo.gif)](https://transitive-bullshit.github.io/react-particle-effect-button/)

This library is a React port of an awesome [Codrops Article](https://tympanus.net/codrops/2018/04/25/particle-effects-for-buttons/) by [Luis Manuel](https://tympanus.net/codrops/author/luis/) (original [source](https://github.com/codrops/ParticleEffectsButtons/)).

## Install

```bash
npm install --save react-particle-effect-button
```

## Usage

Check out the [Demo](https://transitive-bullshit.github.io/react-particle-effect-button/) to see it in action.

```jsx
import React, { Component } from 'react'

import ParticleEffectButton from 'react-particle-effect-button'

class App extends Component {
  state = {
    hidden: false
  }

  render () {
    return (
      <ParticleEffectButton
        color='#121019'
        hidden={this.state.hidden}
      >
        BUTTON CONTENT GOES HERE
      </ParticleEffectButton>
    )
  }
}
```

Note that `children` can be anything from a simple `<button>` to a complex React subtree. The `children` should represent the button's contents.

You change the `hidden` boolean prop to kick-off an animation, typically as a result of a click on the button's contents. If `hidden` changes to `true`, the button will perform a disintegrating animation. If `hidden` changes to `false`, it will reverse and reintegrate the original content.

## Props

| Property      | Type               | Default                               | Description                                                                                                                                  |
|:--------------|:-------------------|:--------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| `hidden`  | boolean           | false                                  | Whether button should be hidden or visible. Changing this prop starts an animation. |
| `color`  | string           | '#000'                                  | Particle color. Should match the button content's background color |
| `children`  | React Node           | undefined                         | The contents of the button. |
| `duration`  | number           | 1000                                  | Animation duration in milliseconds. |
| `easing`  | string           | 'easeInOutCubic'                        | Animation easing. |
| `type`  | string           | circle                                  | 'circle' or 'rectangle' or 'triangle' |
| `style`  | string           | fill                                  | 'fill' or 'stroke' |
| `direction`  | string           | 'left'                                  | 'left' or 'right' or 'top' or 'bottom' |
| `canvasPadding`  | number           | 150                                  | Amount of extra padding to add to the canvas since the animation will overflow the content's bounds |
| `size`  | number | func           | random(4)                             | Particle size. May be a static number or a function which returns numbers. |
| `speed`  | number | func           | random(4)                             | Particle speed. May be a static number or a function which returns numbers. |
| `particlesAmountCoefficient`  | number    | 3                             | Increases or decreases the relative number of particles |
| `oscillationCoefficient`  | number           | 20                         | Increases or decreases the relative curvature of particles |
| `onBegin`  | func           | noop                                     | Callback to be notified once an animation starts. |
| `onComplete`  | func           | noop                                  | Callback to be notified once an animation completes. |

I tried to keep the properties exactly the same as in the original codrops version.

## Related

- [anime.js](http://animejs.com/) - Underlying animation engine.
- [ParticleEffectsButtons](https://github.com/codrops/ParticleEffectsButtons/) - Original source this library is based on.
- [Codrops Article](https://tympanus.net/codrops/2018/04/25/particle-effects-for-buttons/) - Original article this library is based on.

This module was bootstrapped with [create-react-library](https://github.com/transitive-bullshit/create-react-library).

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
