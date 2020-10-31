import React from 'react'
import styled from 'styled-components'

const PopUp = ({ kind, title, data, multiSelect = false }) => {
  console.log(kind, title, data, multiSelect)
  const items = data.reduce((result, item) => {
    const newItem = makeNewItem(kind, item)
    return [...result, newItem]
  }, [])

  return (
    <StyledContainer>
      <StyledHeader>{title}</StyledHeader>
      {items}
    </StyledContainer>
  )
}

const makeNewItem = (kind, data) => {
  switch (kind) {
    case 'user':
    case 'label':
      return (
        <StyledItemContainer key={data.id}>
          <StyledColorSpan color={data.color}></StyledColorSpan>
          <StyledTextSpan>{data.name}</StyledTextSpan>
          <StyledTextDiv>{data.description}</StyledTextDiv>
        </StyledItemContainer>
      )
    case 'milestone':
      return (
        <StyledItemContainer key={data.id}>
          <StyledBigText>{data.title}</StyledBigText>
          {data.dueDate !== undefined && (
            <StyledSubText>{data.dueDate}</StyledSubText>
          )}
        </StyledItemContainer>
      )

    default:
      return <StyledItemContainer key={data.id}></StyledItemContainer>
  }
}

const StyledContainer = styled.div`
  width: auto;
  display: inline-block;
  margin-top: 4px;
  margin-bottom: 20px;
  border: 1px solid #e8eaef;
  border-radius: 6px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px 0px;
`
const StyledHeader = styled.header`
  padding: 8px 10px;
  background-color: #fcfcfd;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
`
const StyledItemContainer = styled.div`
  padding: 8px 8px 8px 30px;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid #e8eaef;
  font-size: 12px;
  font-weight: 400;
  overflow: hidden;
  text-align: left;
`

const StyledBoldTextDiv = styled.div`
  color: #586069;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
`

const StyledTextSpan = styled.span`
  color: #586069;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
`
const StyledTextDiv = styled.div`
  color: #586069;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
`

const StyledColorSpan = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 14px;
  height: 14px;
  margin-right: 8px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
`

export default PopUp
