import "./App.css";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  GridList,
  Typography,
  makeStyles,
} from "@material-ui/core";

import React from "react";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 300,
  },
  container: {
    padding: 20,
    display: "flex",
  },
  progress: {
    margin: 'auto'
  },
  gridList: {
    justifyContent: "center",
  },
  nameContainer: {
    "& h2": { marginBottom: "unset" },
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

function App() {
  const [dogData, setDogData] = React.useState({});
  const classes = useStyles();

  React.useEffect(() => {
    async function fetchDogs() {
      const { data: dogs } = await axios(
        "https://vrv4szc74j.execute-api.us-east-1.amazonaws.com/dev/pets"
      );
      setDogData(dogs);
    }
    fetchDogs();
  }, []);
  return (
    <>
      <CssBaseline />
      <Container className={classes.container} maxWidth="md">
        {!!dogData.dogList?.length ? (
          <GridList className={classes.gridList} cellHeight="auto" spacing={1}>
            {dogData.dogList?.map((dog) => (
              <Card className={classes.root}>
                <CardActionArea onClick={() => window.open(dog.url)}>
                  <CardMedia
                    className={classes.media}
                    image={dog.photo}
                    title={dog.name}
                  />
                  <CardContent>
                    <div className={classes.nameContainer}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {dog.name}
                      </Typography>
                      {dogData.newDogIds?.indexOf(dog.id) > -1 && (
                        <Chip label="New" color="secondary" size="small" />
                      )}
                    </div>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Age: {dog.age}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Sex: {dog.sex}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Breed: {dog.breed}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </GridList>
        ) : (
          <CircularProgress className={classes.progress} />
        )}
      </Container>
    </>
  );
}

export default App;
