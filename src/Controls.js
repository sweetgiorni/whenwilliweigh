import React from 'react'
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, Tooltip, Typography, RadioGroup, Drawer, Radio, Divider, FormControlLabel, CssBaseline, Grid, Input, Slider } from '@material-ui/core';
import { createLine } from "./CalculateFutures";
import moment from 'moment';
import WarningIcon from '@material-ui/icons/Warning';
import HelpIcon from '@material-ui/icons/Help';

const Plot = createPlotlyComponent(Plotly);

const drawerWidth = 300;
const yAxisBuffer = 25; // lbs

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    input: {
        width: '4em',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

export default function Controls() {
    const classes = useStyles();
    const [gender, setGender] = React.useState("male");
    const [calories, setCalories] = React.useState(1800);
    const [mets, setMets] = React.useState(5.0);
    const [exerciseMinutes, setExerciseMinutes] = React.useState(0);
    const [height, setHeight] = React.useState(70)
    const [startWeight, setStartWeight] = React.useState(200)
    const [goalWeight, setGoalWeight] = React.useState(180)
    const [age, setAge] = React.useState(30)

    const [dates, weights, tooFast] = createLine(gender, calories, mets, exerciseMinutes, height, startWeight, age, goalWeight);

    const minCals = 1200;
    const notEnoughCals = calories < minCals;

    var hazards = 0;
    if (tooFast) hazards += 1;
    if (notEnoughCals) hazards += 1;
    var plotLineColor
    if (hazards === 0) plotLineColor = 'green';
    if (hazards === 1) plotLineColor = 'orange';
    if (hazards >= 2) plotLineColor = 'red';

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div style={{ marginLeft: '1em', marginRight: '1em', marginTop: '1em' }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row aria-label="gender" name="gender1" value={gender} onChange={(e, newGender) => setGender(newGender)}>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                    <Divider />
                    <FormLabel component="legend">Calories per day</FormLabel>
                    <Grid container spacing={2} >
                        <Grid item xs>
                            <Slider
                                value={calories}
                                defaultValue={calories}
                                min={0}
                                max={5000}
                                onChange={(e, newCalories) => setCalories(newCalories)}
                                aria-labelledby="input-slider"
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                className={classes.input}
                                value={calories}
                                onChange={(event) => setCalories(event.target.value)}
                                inputProps={{
                                    step: 1,
                                    min: 0,
                                    max: 5000,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                        </Grid>
                    </Grid>
                    <FormLabel component="legend">Exercise MET</FormLabel>
                    <Input
                        className={classes.input}
                        value={mets}
                        onChange={(event) => setMets(event.target.value)}
                        inputProps={{
                            step: 0.1,
                            min: 0,
                            max: 100,
                            type: 'number'
                        }}
                    />
                    <Tooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">The metabolic equivalent of task (MET) is the objective measure of the ratio of the rate at which a person expends energy,
                                relative to the mass of that person, while performing some specific physical activity.
                                Look up your activity's MET ratio with Google and enter it here.
                                </Typography>
                            </React.Fragment>
                        }
                    >
                        <HelpIcon color="primary" />
                    </Tooltip>
                    <FormLabel component="legend">Exercise Minutes Per Day</FormLabel>
                    <Input
                        className={classes.input}
                        value={exerciseMinutes}
                        onChange={(event) => setExerciseMinutes(event.target.value)}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 600,
                            type: 'number'
                        }}
                    />
                    <FormLabel component="legend">Height (inches)</FormLabel>
                    <Input
                        className={classes.input}
                        value={height}
                        onChange={(event) => setHeight(event.target.value)}
                        inputProps={{
                            step: 1,
                            min: 10,
                            max: 150,
                            type: 'number'
                        }}
                    />
                    <FormLabel component="legend">Start Weight (lbs)</FormLabel>
                    <Input
                        className={classes.input}
                        value={startWeight}
                        onChange={(event) => setStartWeight(event.target.value)}
                        inputProps={{
                            step: 1,
                            min: 1,
                            max: 500,
                            type: 'number'
                        }}
                    />
                    <FormLabel component="legend">Goal Weight (lbs)</FormLabel>
                    <Input
                        className={classes.input}
                        value={goalWeight}
                        onChange={(event) => setGoalWeight(event.target.value)}
                        inputProps={{
                            step: 1,
                            min: 1,
                            max: 500,
                            type: 'number'
                        }}
                    />
                    <FormLabel component="legend">Age</FormLabel>
                    <Input
                        className={classes.input}
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </div>
            </Drawer>
            <main className={classes.content}>
                <Plot style={{ margin: 0 }}
                    data={[
                        {
                            x: dates,
                            y: weights,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: plotLineColor },
                        }
                    ]}
                    layout={{
                        yaxis: {
                            hoverformat: '.1f',
                            range: [Math.min(startWeight, goalWeight, weights[weights.length - 1]) - yAxisBuffer, Math.max(startWeight, goalWeight, weights[weights.length - 1]) + yAxisBuffer]
                        },
                        xaxis: {
                            range: [dates[0], moment(dates[dates.length - 1]).add('months', 1).toDate()]
                        },
                        margin: {
                            t: 50,
                            b: 50,
                            l: 50,
                            r: 50,
                            pad: 0
                        }, autoSize: true, title: `When will I weigh <b>${goalWeight}</b> pounds?`, tickformat: '%B %d, %Y', hoverformat: '%B %d, %Y'
                    }}
                />
                {tooFast && <Grid style={{ marginTop: '2em' }} container className={classes.root}>
                    <Grid item xs={1}>
                        <WarningIcon color="primary" />
                    </Grid>
                    <Grid item >
                        <Typography>
                            According to experts, losing 1–2 pound per week is a healthy and safe rate, while losing more than this is considered too fast.
                        </Typography>
                    </Grid>
                </Grid>}
                {notEnoughCals && <Grid style={{ marginTop: '2em' }} container className={classes.root}>
                    <Grid item xs={1}>
                        <WarningIcon color="primary" />
                    </Grid>
                    <Grid item >
                        <Typography>
                            As a general rule, people need a minimum of 1,200 calories daily to stay healthy.
                        </Typography>
                    </Grid>
                </Grid>}


            </main>

        </div >
    )
}
