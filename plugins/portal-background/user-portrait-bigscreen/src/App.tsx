import React from 'react'
import styled from 'styled-components'

import { ConfigurationInput } from './types'
import UserSearch from './components/UserSearch'
import GlobalStyle from './components/GlobalStyle'
import ScreenTitle from './components/ScreenTitle'
import { ALL_SCREEN_CHARTS } from './utils/constants'
import { transformPluginConfigration } from './utils'
import { ScreenConfigurationContext } from './context'

import maskImage from './assets/mask.png'
import centerImage from './assets/center.png'
import bigBaseImage from './assets/big-base.png'
import backgroundImage from './assets/background.png'


const Screen = styled.div`
  width: 100%;
  height: 100%;
  min-width: 1800px;
  min-height: 920px;
  position: relative;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  overflow: hidden;
`

const PlantImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  transform: translate(-50%, -70%) scale(2.7);
  width: 355px;
  height: 355px;
  object-fit: cover;
`

const BaseImage = styled.img`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform-origin: center center;
  transform: translate(0, -9%);
`

const MaskImage = styled.img`
  position: absolute;
  object-fit: cover;
  left: 0;
  bottom: 0;
  width: 100%;
`

const ScreenApp: React.FC<ConfigurationInput> = (props) => {

  const ctx = transformPluginConfigration(props)

  return (
    <ScreenConfigurationContext.Provider value={ctx}>
      <Screen>
        <GlobalStyle />
        <ScreenTitle />
        <BaseImage draggable={false} src={bigBaseImage} />
        <PlantImage draggable={false} src={centerImage} />
        <MaskImage draggable={false} src={maskImage} />
        <UserSearch />
        {ALL_SCREEN_CHARTS}
      </Screen>
    </ScreenConfigurationContext.Provider>

  )
}

export default ScreenApp
