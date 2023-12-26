// Write your code here
import './index.css'

const MatchCard = props => {
  const {recentMatchDetails} = props
  const {
    competingTeamLogo,
    competingTeam,
    matchStatus,
    result,
  } = recentMatchDetails
  const getMatchStatusClassName = status =>
    status === 'Won' ? 'match-won' : 'match-lost'
  const matchStatusClassName = `match-status ${getMatchStatusClassName(
    matchStatus,
  )}`

  return (
    <li className="list-items">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="logo"
      />
      <p className="competing-team">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={matchStatusClassName}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
