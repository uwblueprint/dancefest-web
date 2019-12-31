import React from "react";
import {
    ListItem,
    List,
    Paper,
    Grid,
    Button,
    withStyles,
} from "@material-ui/core";
import { Link } from 'react-router-dom';
import styles from '../styles';
import { getAwards } from '../../api/AwardsAPI';

import AwardDialog from './AwardDialog';

const filters = {
    all: 0,
    nominated: 1,
    pending: 2,
}


class AwardsPanel extends React.Component {
    state = {
        nominatedAwards: [],
        pendingAwards: [],
        filter: filters.all,
    }

    componentDidMount() {
        const { eventId } = this.props;
        getAwards(eventId)
            .then(({ data }) => {
                const nominatedAwards = Object.values(data).filter((value) => value.winningPerformanceId !== null);
                const pendingAwards = Object.values(data).filter((value) => value.winningPerformanceId === null);

                this.setState({nominatedAwards, pendingAwards});
            }).catch((err) =>{
                console.log(err);
            });
    }

    renderAwardCard(data, cardType) {
        // todo: figure out if there is a score when someone wins
        const { title, nomineeCount, winner, score } = data;
        const { classes: { awardsListItemStyle, awardsCardButtonStyle, awardsCardStyle, awardsCardFooterStyle, awardsCardLeftColumnStyle, awardsCardRightColumnStyle } } = this.props;
        return (
            <ListItem className={awardsListItemStyle}>
                <Paper style={{ width: '100%' }}>
                    <Grid className={awardsCardStyle} container spacing={0} direction="row">
                        <Grid item xs={10}>
                            <div className={awardsCardLeftColumnStyle}>
                                <h3>{title}</ h3>
                                <div className={awardsCardFooterStyle}>
                                    <h5>{cardType === 'pending' ? 'UNDECIDED •\xa0' : 'Awarded To:\xa0'}</h5>
                                    <h6>{cardType === 'pending' ? `${nomineeCount} dances nominated` : `${winner}	• Average Score: ${score}`}</ h6>
                                </ div>
                            </ div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className={awardsCardRightColumnStyle}>
                                {cardType ===  'pending' && <Button variant="outlined" classes={{ root: awardsCardButtonStyle }}><Link to='/' style={{ textDecoration: 'none' }}>Select Winner</Link></Button>}
                                {cardType === 'nominated' && <Button variant="outlined" classes={{ root: awardsCardButtonStyle }}><Link to='/' style={{ textDecoration: 'none' }}>Edit</Link></Button>}
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </ ListItem>
        );
    }

    render() {
        const { nominatedAwards, pendingAwards, filter } = this.state;
        const { classes: { awardsPanelStyle, awardsFilterButtonStyle, awardsCardButtonStyle } } = this.props;
        const renderNewButton = (<AwardDialog/>); //updateData={this.updatePerformances} createData={this.createPerformance} eventId={eventId} formType="new" />);

        return (
            <div className={awardsPanelStyle}>
                <Grid container spacing={2}>
                    <Grid style={{display: "flex", justifyContent: "space-between", marginBottom: "1rem"}} item xs={12}>
                        <div>
                            <Button onClick={() => this.setState({ filter: filters.all })} classes={{ root: awardsFilterButtonStyle }} variant='outlined'>
                                SEE ALL
                            </Button>
                            <Button onClick={() => this.setState({ filter: filters.pending })} classes={{root: awardsFilterButtonStyle }} variant='outlined'>
                              { `PENDING NOMINATION (${pendingAwards.length})` }
                            </ Button>
                            <Button onClick={() => this.setState({ filter: filters.nominated })} classes={{root: awardsFilterButtonStyle }} variant='outlined'>
                                { `DECIDED AWARDS (${nominatedAwards.length})`}
                            </ Button>
                        </div>
                            
                       {renderNewButton}
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <List style={{overflow: 'auto', maxHeight: 350}}>
                                {
                                    [filters.pending, filters.all].indexOf(filter) > -1 
                                    && <React.Fragment>
                                        <ListItem><h1>PENDING NOMINATION</h1></ListItem>
                                        {pendingAwards.map((data) => this.renderAwardCard(data, 'pending'))}
                                    </React.Fragment>
                                }
                                
                                {
                                    [filters.nominated, filters.all].indexOf(filter) > -1
                                    && <React.Fragment>
                                        <ListItem><h1>NOMINATION DECIDED</h1></ListItem>
                                        { nominatedAwards.map((data) => this.renderAwardCard(data, 'nominated')) }
                                    </React.Fragment>
                                }
                            </ List>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(AwardsPanel);