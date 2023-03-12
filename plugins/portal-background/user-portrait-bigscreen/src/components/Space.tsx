import styled from 'styled-components'

const Space = styled.div<{ x?: number, y?: number }>`
  height: 0;
  width: 0;
  margin-left: ${prop => prop.x ?? 0}px;
  margin-top: ${prop => prop.y ?? 0}px;
`

export default Space