import { useState } from 'react'
import { useDebounceFn } from 'ahooks'
import styled from 'styled-components'
import { AutoComplete, AutoCompleteProps, message, Empty } from 'antd'

import { UserSearchResp } from '@/types'
import { searchUser } from '@/api/assets'
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

interface SearchInputProps {
  setSelectUser(_?: UserSearchResp): void
}

const SearchInput = ({ setSelectUser }: SearchInputProps) => {

  const [selectValue, setSelectValue] = useState<UserSearchResp>()

  const [value, setValue] = useState('')

  const [options, setOptions] = useState<AutoCompleteProps['options']>([])

  const { run: onSearch } = useDebounceFn(async (value: string) => {
    if (value.trim()) {
      try {
        const { data } = await searchUser(value.trim())
        setOptions(data.map((item) => ({ 
          label: (<div>
            {item.name} - {item.user_idcode} - {item.office_name}
            {/* <p></p> */}
            {/* <p>{item.user_idcode}</p> */}
          </div>), 
          value: JSON.stringify(item), 
        })))
      } catch (error) {
        message.error('查询失败')
        console.log(error)
        setOptions([])
      }
    } else {
      setOptions([])
    }
  }, { wait: 500 })

  const onChange = (data: string) => {
    try {
      const raw = JSON.parse(data) as UserSearchResp
      setValue(raw.name)
      setSelectValue(raw)
    } catch (_) {
      setValue(data)
    }
  }

  return (
    <Div>
      <AutoComplete
        value={value}
        options={options}
        onChange={onChange}
        onSearch={onSearch}
        style={{ width: 328 }}
        notFoundContent={<Empty />}
      >
        <Input type='text' />
      </AutoComplete>
      
      <Button onClick={() => {
        setSelectUser(selectValue)
      }}>
        <Span>
          <SearchImage
            draggable={false}
            src={searchImage}
          />
          <span>搜索</span>
        </Span>
      </Button>
    </Div>
  )
}

export default SearchInput