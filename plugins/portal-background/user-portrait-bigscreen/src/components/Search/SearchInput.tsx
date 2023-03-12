import styled from 'styled-components'
import inputImage from '@/assets/input.png'
import searchImage from '@/assets/search.png'

const Div = styled.div`
  width: 427px;
  height: 36px;
  background: url(${inputImage});
  background-size: 454px 60px;
  background-position: -12px -11px;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const Input = styled.input`
  position: relative;
  z-index: 1;
  padding: 0;
  outline: none;
  border: none;
  margin-left: 22px;
  height: 24px;
  color: #fff;
  font-size: 14px;
  font-family: PingFang SC;
  width: 300px;
  background: transparent;
`

const Button = styled.button`
  width: 94px;
  height: 30px;
  cursor: pointer;
  background: transparent;
  margin-left: auto;
  margin-right: 3px;
  border: none;
`

const Span = styled.span`
  display: flex;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 16px;
  justify-content: center;
  align-items: center;
`

const SearchImage = styled.img`
  width: 20px;
  height: 20px;
`

const SearchInput = () => {
  return (
    <Div>
      <Input type='text' />
      <Button>
        <Span>
          <SearchImage draggable={false} src={searchImage} />
          <span>搜索</span>
        </Span>
      </Button>
    </Div>
  )
}

export default SearchInput