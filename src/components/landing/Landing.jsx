import React from "react";
import PerformancesSection from '../performances/PerformancesSection';
import AwardsPanel from '../awards/AwardsPanel';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import SectionHeader from "../interface/SectionHeader";

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div>
            { value === index && children }
        </div>
    )
}

function LandingSection(props) {
    const [value, setValue] = React.useState(0);
    const { classes, match: { params: { eventId, eventTitle }}} = props;

    function handleTabChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <React.Fragment>
            <SectionHeader title={eventTitle} />
            <AppBar position="static">
                <Tabs classes={{ 
                    root: classes.landingTabBarStyle, 
                    indicator: classes.landingTabBarIndicatorStyle }}
                    variant="fullWidth" value={value}
                    onChange={handleTabChange}>
                    <Tab classes={{ root: classes.landingTabStyle, selected: classes.landingTabStyle_selected }} label="Performances" />
                    <Tab classes={{ root: classes.landingTabStyle, selected: classes.landingTabStyle_selected }} label="Awards" />
                </Tabs>
            </AppBar>
            
            <TabPanel value={value} index={0}>
                <PerformancesSection eventId={eventId} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AwardsPanel eventId={eventId} />
            </TabPanel>
        </React.Fragment>
    );
}

export default withStyles(styles)(LandingSection);