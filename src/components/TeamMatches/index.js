// Write your code here
import {Component} from 'react'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'

import './index.css'

const apiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {teamMatchesData: {}}

  componentDidMount() {
    this.getTeamDetails()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${apiUrl}${id}`)
    const teamData = await response.json()

    const updatedData = {
      teamBannerUrl: teamData.team_banner_url,
      latestMatch: this.getFormattedData(teamData.latest_match_details),
      recentMatches: teamData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }
    console.log(updatedData)
    this.setState({teamMatchesData: updatedData})
  }

  renderRecentMatchesList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerURL, latestMatch} = teamMatchesData

    return (
      <div className="responsive-container">
        <img src={teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const className = `team-matches-container ${this.getRouteClassName()}`
    return <div className={className}>{this.renderTeamMatches()}</div>
  }
}

export default TeamMatches
