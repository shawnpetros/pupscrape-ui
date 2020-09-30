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
    margin: "auto",
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
  const [doggos, setDoggos] = React.useState({});
  const classes = useStyles();

  React.useEffect(() => {
    async function fetchDogs() {
      const {
        data: {
          dogList: { dogs = [] },
        },
      } = await axios(
        "https://vrv4szc74j.execute-api.us-east-1.amazonaws.com/dev/pets"
      );
      setDoggos(dogs);
    }
    fetchDogs();
  }, []);
  return (
    <>
      <CssBaseline />
      <Container className={classes.container} maxWidth="md">
        {!!doggos.length ? (
          <GridList className={classes.gridList} cellHeight="auto" spacing={1}>
            {doggos.map((doggo) => (
              <Card className={classes.root}>
                <CardActionArea onClick={() => window.open(doggo.url)}>
                  <CardMedia
                    className={classes.media}
                    image={doggo.photo}
                    title={doggo.name}
                  />
                  <CardContent>
                    <div className={classes.nameContainer}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {doggo.name}
                      </Typography>
                      {doggo.new && (
                        <Chip label="New" color="secondary" size="small" />
                      )}
                    </div>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Age: {doggo.age}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Sex: {doggo.sex}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Breed: {doggo.breed}
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
