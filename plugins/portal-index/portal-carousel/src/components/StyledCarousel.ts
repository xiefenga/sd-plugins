import { Carousel } from 'antd'
import styled from 'styled-components'

export const StyledCarousel = styled(Carousel)`
  .slick-dots-bottom {
    display: flex!important;
    margin: 0;
    padding: 0;
    left: auto;
    right: 20px;
    bottom: 10px;

    li {
      border: 2px solid #fff;
    }

    li, button{
      width: 6px!important;
      height: 6px!important;
    }
  }
`

export default StyledCarousel