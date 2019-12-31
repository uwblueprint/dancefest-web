import React, { Component } from 'react';
import humps from 'humps';

import { getAwardPerformances, getAwardPerformanceComments } from '../../api/AwardAPI';
import Loading from '../interface/Loading';
import NomineesSection from './nominations/NomineesSection';
import NomineesList from './nominations/NomineesList';

import './awards.css';

class AwardsSelectionSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      performances: [],
      adjudications: {},
      loading: true,
      selectedPerf: ''
    };

    this.handleDetailsClicked = this.handleDetailsClicked.bind(this);
    this.handleWinnerSelected = this.handleWinnerSelected.bind(this);
  }

  async componentDidMount() {
    const { awardId } = this.props.match.params;
    const { data } = await getAwardPerformances(awardId);

    const performances = Object.values(data).map((performance) => {
      let newPerformance = humps.camelizeKeys(performance);

      let scores = [];
      newPerformance.adjudications.forEach(adj => {
        scores.push(adj['cumulativeMark']);
      });
      newPerformance.averageScore = this.mean(scores);

      return newPerformance;
    });
    this.setState({ performances, loading: false });
  }

  async handleDetailsClicked(performance) {
    const performances = [...this.state.performances];
    const { awardId } = this.props.match.params;
    let comments = performance.adjudications;

    if (!performance.loaded) {
      const { data } = await getAwardPerformanceComments(performance.id, awardId);
      comments = Object.values(data).map((comment) => {
        return humps.camelizeKeys(comment);
      });
    }

    const newPerformances = performances.map((p) => {
      if (p.id === performance.id) {
        p.selected = true;
        p.loaded = true;
        p.adjudications = comments;
      }
      else {
        p.selected = false;
      }
      return p;
    });
    this.setState({ performances: newPerformances, adjudications: comments, selectedPerf: performance });
  }

  // TODO : implement functionality
  handleWinnerSelected(performance) {
    console.log(performance);
  };

  // TO DO: move this to a utils folder
  mean = (vals) => {
    return vals.reduce((a, b) => {
      if (isNaN(b)) return 0;
      return a + b;
    }) / vals.length;
  }

  render() {
    // TODO: check expected results of this
    const { award } = this.props;
    const { adjudications, performances, loading, selectedPerf } = this.state;
    return (
      <React.Fragment>
        {loading ? <Loading /> :
          (
            <React.Fragment>
              <h1 className="title">SELECT WINNER: <span className="award-name">{ award ? award : 'TestAward' }</span></h1>
              
              <div className="sidebar-container">
                <p className="subtitle">Nominated Dances</p>
                <NomineesList
                  performances={performances}
                  onClick={this.handleDetailsClicked} 
                />
              </div>
                
              <div className="views-container">
                <NomineesSection 
                  award={award}
                  adjudications={adjudications}
                  selected={selectedPerf}
                />
              </div>
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}

export default AwardsSelectionSection;
