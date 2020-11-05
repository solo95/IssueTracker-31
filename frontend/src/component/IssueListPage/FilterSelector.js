import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import PopUp from '@Component/common/PopUp'
import { issueListContext } from '@Page/IssueList'

const FilterSelector = ({ type, multiSelect = false }) => {
  const context = useContext(issueListContext)
  const detail = useRef()

  const popupProps = getPopUpProps(type, multiSelect, context, detail)
  if (!popupProps) return false

  console.log(detail)

  return (
    <StyledDetail ref={detail}>
      <StyledSummary>
        {type}
        <StyledSpan></StyledSpan>
      </StyledSummary>
      <StyledDetailsMenu>
        <PopUp
          title={popupProps.title}
          kind={popupProps.kind}
          data={popupProps.data ? popupProps.data : []}
          targetCondition={popupProps.targetCondition}
          updateConditions={popupProps.updateConditions}
          multiSelect={multiSelect}
        ></PopUp>
      </StyledDetailsMenu>
    </StyledDetail>
  )
}

const getPopUpProps = (type, multiSelect, context, detail) => {
  const updateConditions = (id, kind) => {
    const newConditions = { ...context.conditions }
    if (id === 0) newConditions[kind] = [id]
    else {
      if (!multiSelect) {
        if (newConditions[kind].includes(id)) newConditions[kind] = []
        else newConditions[kind] = [id]
      } else {
        if (context.conditions[kind].includes(0))
          newConditions[kind] = newConditions[kind].filter(value => value !== 0)
        if (context.conditions[kind].includes(id)) {
          newConditions[kind] = newConditions[kind].filter(
            value => value !== id,
          )
        } else newConditions[kind] = [...newConditions[kind], id]
      }
    }
    context.setConditions(newConditions)
    detail.current.open = !detail.current.open
  }

  const clickMarkAsPopUp = (id, kind) => {
    // 선택된 아이템들의 id 리스트 필요
    console.log(id)
    detail.current.open = !detail.current.open
  }

  switch (type) {
    case 'Author':
      return {
        title: 'Filter by author',
        kind: 'author',
        data: context.users,
        targetCondition: context.conditions.author,
        updateConditions: updateConditions,
      }
    case 'Label':
      return {
        title: 'Filter by label',
        kind: 'label',
        data: [{ id: 0, name: 'Unlabeled' }, ...context.labels],
        targetCondition: context.conditions.label,
        updateConditions: updateConditions,
      }
    case 'Milestones':
      return {
        title: 'Filter by milestone',
        kind: 'milestone',
        data: [
          { id: 0, title: 'Issues with no milestone' },
          ...context.milestones,
        ],
        targetCondition: context.conditions.milestone,
        updateConditions: updateConditions,
      }
    case 'Assignee':
      return {
        title: 'Filter by who` assigned',
        kind: 'assignee',
        data: [{ id: 0, nickname: 'Assigned to nobody' }, ...context.users],
        targetCondition: context.conditions.assignee,
        updateConditions: updateConditions,
      }
    case 'Projects':
      return { title: 'Filter by project' }
    case 'Sort':
      return { title: 'Sort by' }
    case 'Mark as':
      return {
        title: 'Action',
        kind: 'markAs',
        data: [
          { id: 1, text: 'Open' },
          { id: 2, text: 'Closed' },
        ],
        targetCondition: [],
        updateConditions: clickMarkAsPopUp,
      }
    default:
      return false
  }
}

const StyledDetail = styled.details`
  position: relative;
  display: inline-block;
  padding: 0px 16px;
  appearance: none;
`

const StyledSummary = styled.summary`
  display: inline-block;
  white-space: nowrap;
  padding: 0;
  color: #586069;
  list-style: none;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  background-color: initial;
  border: 0;
  appearance: none;
  outline: none;
  box-shadow: none;
  &::-webkit-details-marker {
    display: none;
  }
`

const StyledSpan = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: middle;
  content: '';
  border-top-style: solid;
  border-top-width: 4px;
  border-right: 4px solid transparent;
  border-bottom: 0 solid transparent;
  border-left: 4px solid transparent;
`

const StyledDetailsMenu = styled.div`
  position: absolute;
  top: auto;
  right: 0;
  bottom: auto;
  left: auto;
  padding: 0;
`

export default FilterSelector
