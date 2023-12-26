// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {teamMatch: [], isLoading: true}

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({teamMatch: updatedData, isLoading: false})
  }

  renderTeamMatchesList = () => {
    const {teamMatch} = this.state
    return (
      <div>
        <ul className="unordered-list">
          {teamMatch.map(each => (
            <TeamCard eachTeamDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="Oval" height={80} width={80} color="#ffffff" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="ipl-container">
        <div className="team-list-cont">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="app logo"
              className="app-logo"
            />
            <h1 className="heading ">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamMatchesList()}
        </div>
      </div>
    )
  }
}

export default Home
