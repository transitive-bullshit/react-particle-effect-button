/**
 * @class ParticleEffectButton
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import anime from 'animejs'
import classNames from 'classnames'
import raf from 'raf'

import styles from './styles.css'

const noop = () => { }

export default class ParticleEffectButton extends Component {
  static propTypes = {
    hidden: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    duration: PropTypes.number,
    easing: PropTypes.oneOfType([ PropTypes.string, PropTypes.arrayOf(PropTypes.number) ]),
    type: PropTypes.oneOf([ 'circle', 'rectangle', 'triangle' ]),
    style: PropTypes.oneOf([ 'fill', 'stroke' ]),
    direction: PropTypes.oneOf([ 'left', 'right', 'top', 'bottom' ]),
    canvasPadding: PropTypes.number,
    size: PropTypes.oneOfType([ PropTypes.number, PropTypes.func ]),
    speed: PropTypes.oneOfType([ PropTypes.number, PropTypes.func ]),
    color: PropTypes.string,
    particlesAmountCoefficient: PropTypes.number,
    oscillationCoefficient: PropTypes.number,
    onBegin: PropTypes.func,
    onComplete: PropTypes.func
  }

  static defaultProps = {
    hidden: false,
    duration: 1000,
    easing: 'easeInOutCubic',
    type: 'circle',
    style: 'fill',
    direction: 'left',
    canvasPadding: 150,
    size: () => Math.floor((Math.random() * 3) + 1),
    speed: () => rand(4),
    color: '#000',
    particlesAmountCoefficient: 3,
    oscillationCoefficient: 20,
    onBegin: noop,
    onComplete: noop
  }

  state = {
    status: this.props.hidden ? 'hidden' : 'normal',
    progress: 0
  }

  componentWillReceiveProps(props) {
    if (props.hidden !== this.props.hidden) {
      const { status } = this.state

      if (status === 'normal' && props.hidden) {
        this.setState({ status: 'hiding' }, this._startAnimation)
      } else if (status === 'hidden' && !props.hidden) {
        this.setState({ status: 'showing' }, this._startAnimation)
      } else if (status === 'hiding' && !props.hidden) {
        // TODO: show button in middle of hiding animation
      } else if (status === 'showing' && props.hidden) {
        // TODO: hide button in middle of showing animation
      }
    }
  }

  render() {
    const {
      children,
      className,
      direction
    } = this.props

    const {
      status,
      progress
    } = this.state

    const wrapperStyles = { }
    const contentStyles = { }
    const canvasStyles = { }

    if (status === 'hiding' || status === 'showing') {
      const translateProp = this._isHorizontal() ? 'translateX' : 'translateY'
      const translateValue = direction === 'left' || direction === 'top'
        ? progress : -progress

      wrapperStyles.transform = `${translateProp}(${translateValue}%)`
      contentStyles.transform = `${translateProp}(${-translateValue}%)`
    } else if (status === 'hidden') {
      wrapperStyles.visibility = 'hidden'
      canvasStyles.visibility = 'hidden'
    } else if (status === 'normal') {
      canvasStyles.visibility = 'hidden'
    }

    return (
      <div className={classNames(styles.particles, className)}>
        <div
          className={styles.wrapper}
          style={wrapperStyles}
          ref={this._wrapperRef}
        >
          <div
            className={styles.content}
            style={contentStyles}
          >
            {children}
          </div>
        </div>

        <canvas
          className={styles.canvas}
          ref={this._canvasRef}
          style={canvasStyles}
        />
      </div>
    )
  }

  _canvasRef = (ref) => {
    this._canvas = ref
  }

  _wrapperRef = (ref) => {
    this._wrapper = ref
  }

  _startAnimation = () => {
    if (!this._canvas || !this._wrapper) return

    const {
      duration,
      easing,
      canvasPadding,
      onBegin
    } = this.props

    const {
      status
    } = this.state

    if (status === 'hiding') {
      this._progress = 0
    } else {
      this._progress = 1
    }

    this._particles = []

    this._rect = this._wrapper.getBoundingClientRect()
    this._canvas.width = this._rect.width + canvasPadding * 2
    this._canvas.height = this._rect.height + canvasPadding * 2
    this._ctx = this._canvas.getContext('2d')

    anime({
      targets: { value: (status === 'hiding') ? 0 : 100 },
      value: (status === 'hiding') ? 100 : 0,
      duration: duration,
      easing: easing,
      begin: onBegin,
      update: (anim) => {
        const value = anim.animatables[0].target.value

        setTimeout(() => {
          this.setState({ progress: value })
        })

        if (duration) {
          this._addParticles(value / 100)
        }
      }
    })
  }

  _cycleStatus() {
    const { status } = this.state

    if (status === 'normal') {
      this.setState({ status: 'hiding' })
    } else if (status === 'hidden') {
      this.setState({ status: 'showing' })
    } else if (status === 'hiding') {
      this.setState({ status: 'hidden' })
    } else if (status === 'showing') {
      this.setState({ status: 'normal' })
    }
  }

  _loop = () => {
    this._updateParticles()
    this._renderParticles()

    if (this._particles.length) {
      this._raf = raf(this._loop)
    } else {
      this._raf = null
      this._cycleStatus()
      this.props.onComplete()
    }
  }

  _addParticles(progress) {
    const {
      canvasPadding,
      direction,
      particlesAmountCoefficient
    } = this.props

    const {
      status
    } = this.state

    const { width, height } = this._rect

    const delta = status === 'hiding' ? progress - this._progress : this._progress - progress
    const isHorizontal = this._isHorizontal()
    const progressValue = (isHorizontal ? width : height) * progress + delta * (status === 'hiding' ? 100 : 220)

    this._progress = progress

    let x = canvasPadding
    let y = canvasPadding

    if (isHorizontal) {
      x += direction === 'left' ? progressValue : width - progressValue
    } else {
      y += direction === 'top' ? progressValue : height - progressValue
    }

    let i = Math.floor(particlesAmountCoefficient * (delta * 100 + 1))
    if (i > 0) {
      while (i--) {
        this._addParticle({
          x: x + (isHorizontal ? 0 : width * Math.random()),
          y: y + (isHorizontal ? height * Math.random() : 0)
        })
      }
    }

    if (!this._raf) {
      this._raf = raf(this._loop)
    }
  }

  _addParticle(opts) {
    const {
      duration,
      size,
      speed
    } = this.props

    const {
      status
    } = this.state

    const frames = duration * 60 / 1000
    const _speed = isFunc(speed) ? speed() : speed
    const _size = isFunc(size) ? size() : size

    this._particles.push({
      startX: opts.x,
      startY: opts.y,
      x: status === 'hiding' ? 0 : _speed * -frames,
      y: 0,
      angle: rand(360),
      counter: status === 'hiding' ? 0 : frames,
      increase: Math.PI * 2 / 100,
      life: 0,
      death: status === 'hiding' ? (frames - 20) + Math.random() * 40 : frames,
      speed: _speed,
      size: _size
    })
  }

  _updateParticles() {
    const {
      oscillationCoefficient
    } = this.props

    const {
      status
    } = this.state

    for (let i = 0; i < this._particles.length; i++) {
      const p = this._particles[i]

      if (p.life > p.death) {
        this._particles.splice(i, 1)
      } else {
        p.x += p.speed
        p.y = oscillationCoefficient * Math.sin(p.counter * p.increase)
        p.life++
        p.counter += (status === 'hiding' ? 1 : -1)
      }
    }
  }

  _renderParticles() {
    const {
      color,
      type,
      style
    } = this.props

    const {
      status
    } = this.state

    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    this._ctx.fillStyle = this._ctx.strokeStyle = color

    for (let i = 0; i < this._particles.length; ++i) {
      const p = this._particles[i]

      if (p.life < p.death) {
        this._ctx.translate(p.startX, p.startY)
        this._ctx.rotate(p.angle * Math.PI / 180)
        this._ctx.globalAlpha = (status === 'hiding') ? 1 - p.life / p.death : p.life / p.death
        this._ctx.beginPath()

        if (type === 'circle') {
          this._ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI)
        } else if (type === 'triangle') {
          this._ctx.moveTo(p.x, p.y)
          this._ctx.lineTo(p.x + p.size, p.y + p.size)
          this._ctx.lineTo(p.x + p.size, p.y - p.size)
        } else if (type === 'rectangle') {
          this._ctx.rect(p.x, p.y, p.size, p.size)
        }

        if (style === 'fill') {
          this._ctx.fill()
        } else if (style === 'stroke') {
          this._ctx.closePath()
          this._ctx.stroke()
        }

        this._ctx.globalAlpha = 1
        this._ctx.rotate(-p.angle * Math.PI / 180)
        this._ctx.translate(-p.startX, -p.startY)
      }
    }
  }

  _isHorizontal() {
    return this.props.direction === 'left' || this.props.direction === 'right'
  }
}

function rand (value) {
  return Math.random() * value - value / 2
}

function isFunc (value) {
  return typeof value === 'function'
}
