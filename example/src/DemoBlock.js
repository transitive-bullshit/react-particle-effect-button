import React, { Component } from 'react'
import './DemoBlock.css'
import PropTypes from 'prop-types'

import ParticleEffectButton from 'react-particle-effect-button'

export default class DemoBlock extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    buttonStyles: PropTypes.object.isRequired,
    buttonOptions: PropTypes.object.isRequired
  }

  state = {
    hidden: false,
    animating: false
  }

  render() {
    const {
      background,
      text,
      buttonStyles,
      buttonOptions
    } = this.props

    const {
      hidden,
      animating
    } = this.state

    return (
      <div
        className="buttons-div-container"
        style={{ background }}
      >
        {hidden && !animating && (
          <button
            className="animation-reset-button"
            onClick={this._onToggle}
          >
            Reset
          </button>
        )}

        <ParticleEffectButton
          hidden={hidden}
          onComplete={this._onAnimationComplete}
          {...buttonOptions}
        >
          <button
            className="particle-effect-button"
            style={{ ...buttonStyles }}
            onClick={this._onToggle}
          >
            {text}
          </button>
        </ParticleEffectButton>
      </div>
    )
  }

  _onToggle = () => {
    if (this.state.animating) return

    this.setState({
      hidden: !this.state.hidden,
      animating: true
    })
  }

  _onAnimationComplete = () => {
    this.setState({
      animating: false
    })
  }
}
