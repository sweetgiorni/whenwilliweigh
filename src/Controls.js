import React from 'react'
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, Typography, RadioGroup, Drawer, Radio, Divider, FormControlLabel, CssBaseline, Grid, Input, Slider } from '@material-ui/core';
import { createLine } from "./CalculateFutures";
import WarningIcon from '@material-ui/icons/Warning';

const Plot = createPlotlyComponent(Plotly);

const drawerWidth = 300;

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
    const [calories, setCalories] = React.useState(2000);
    const [mets, setMets] = React.useState(5.0);
    const [exerciseMinutes, setExerciseMinutes] = React.useState(0);
    const [height, setHeight] = React.useState(74)
    const [startWeight, setStartWeight] = React.useState(300)
    const [goalWeight, setGoalWeight] = React.useState(280)
    const [age, setAge] = React.useState(23)

    const [dates, weights, tooFast] = createLine(gender, calories, mets, exerciseMinutes, height, startWeight, age, goalWeight);

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
                        <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={(e, newGender) => setGender(newGender)}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <Divider />
                    <FormLabel component="legend">Calories per day</FormLabel>
                    <Grid container spacing={2} >
                        <Grid item xs>
                            <Slider
                                value={typeof calories === 'number' ? calories : 0}
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
                    <FormLabel component="legend">Exercise METs</FormLabel>
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
                    <FormLabel component="legend">Exercise Minutes/Day</FormLabel>
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
                            marker: { color: 'red' },
                        }
                    ]}
                    layout={{
                        margin: {
                            t: 50,
                            b: 50,
                            l: 50,
                            r: 50,
                            pad: 0
                        }, autoSize: true, title: 'Future Weight', tickformat: '%B %d, %Y', hoverformat: '%B %d, %Y'
                    }}
                />
                {tooFast && <Grid style={{ marginTop: '2em' }} container className={classes.root}>
                    <Grid item xs={1}>
                        <WarningIcon color="primary" />
                    </Grid>
                    <Grid item >
                        <Typography>
                            According to experts, losing 1–2 pounds (0.45–0.9 kg) per week is a healthy and safe rate, while losing more than this is considered too fast.
                        </Typography>
                    </Grid>
                </Grid>}



            </main>

        </div >
    )
}
