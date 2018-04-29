import React, { Component } from 'react'
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

  render () {
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
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '46vmax',
          height: '46vmax',
          margin: '2vmax 2vmax 0 0',
          background
        }}
      >
        {hidden && !animating && (
          <button
            style={{
              position: 'absolute',
              top: '1em',
              right: '1em',
              background: '#32bafa',
              color: '#fff',
              border: '0',
              borderRadius: 4,
              fontSize: '1em',
              padding: '0.7em 1.2em',
              cursor: 'pointer',
              outline: 'none'
            }}
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
            style={{
              background: '#121019',
              color: '#fff',
              padding: '1.5rem 3rem',
              border: '0',
              borderRadius: 5,
              cursor: 'pointer',
              fontSize: '1.2em',
              ...buttonStyles
            }}
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
