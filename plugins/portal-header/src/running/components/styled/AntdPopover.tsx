import { Popover } from 'antd'
import styled from 'styled-components'

export const ThemedPopover = styled(Popover)`
  border: 1px solid ${props => props.theme.border.color};
`