import React, { Component } from 'react'

import DemoBlock from './DemoBlock'
import demos from './demos'

export default class App extends Component {
  render () {
    return (
      <div
        style={{
          background: '#000',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {demos.map((demo, index) => (
          <DemoBlock
            key={index}
            background={demo.background}
            text={demo.text}
            buttonStyles={demo.buttonStyles}
            buttonOptions={demo.buttonOptions}
          />
        ))}
      </div>
    )
  }
}
