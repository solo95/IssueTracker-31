import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import IssueListPage from '@Page/IssueList'
import Login from '@Page/Login'
import Header from './component/common/Header'
import NewIssuePage from '@Page/NewIssue'
import LabelListPage from '@Page/LabelList'
import MilestoneListPage from '@Page/MilestoneList'

const root = document.getElementById('root')
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={IssueListPage} />
      <Route exact path="/new" component={NewIssuePage} />
      <Route exact path="/labels" component={LabelListPage} />
      <Route exact path="/milestones" component={MilestoneListPage} />
    </BrowserRouter>
  )
}
ReactDom.render(<App />, root)
