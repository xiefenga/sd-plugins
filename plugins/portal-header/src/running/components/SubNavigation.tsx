import React from 'react'
import styled from 'styled-components'
import { useStore } from 'portal-shared'

import { usePluginConfig } from '@/running/hooks'
import ArrowRightOutlined from './icons/ArrowRightOutlined.svg'

const NavigationWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  .nav-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    margin-right: 12px;
    color: inherit;
    transition: none;

    &:hover {
      color: ${props => props.theme.font.hover};
      
      span {
        transform: translateX(-1px);
      }
      svg {
        transform: scale(0.9) translateX(1px);
      }
    }

    span, svg {
      transition: color .3s, transform .5s;
    }

    svg {
      margin-bottom: 2px;
      transform: scale(0.9);
    }
  }
`

const SubNavigation: React.FC = () => {
  
  const { isLevel, subNavs } = usePluginConfig()

  const ssoCode = useStore(state => state.code)

  if (isLevel && subNavs?.length) {
    return (
      <NavigationWrapper>
        {subNavs.map(nav => {

          const target = nav.url + (nav.url.includes('?') ? '&' : '?') + `code=${ssoCode}`

          return (
            <React.Fragment key={nav.name}>
              <a className='nav-item' href={target} target='_blank' rel='noreferrer'>
                <span>{nav.name}</span>
                <ArrowRightOutlined />
              </a>
            </React.Fragment>
          )
        })}
      </NavigationWrapper>
    )
  }

  return null
}

export default SubNavigation