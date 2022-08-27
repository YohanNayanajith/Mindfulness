import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function OrderHistoryComponent() {
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState(false);

  React.useEffect(() => {
    const cartData = async () => {
      try {
        let response = await fetch("http://localhost:5000/api/v1/carts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // token: token,
          },
        });
        let json = await response.json();
        setData(json);
        console.log(json);
        // setLoading(false);
      } catch (error) {
        alert(error);
      }
    };
    cartData();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <h1 style={{ margin: 20 }}>Order History Page</h1>

      {/* {data.map((item) => (

        <h1 key={item._id}>{item._id}</h1>
      ))} */}

      <Grid
        container
        display="flex"
        spacing={{ xs: 2 }}
        columns={{ xs: 4 }}
        style={{ minHeight: "100vh", maxWidth: "100%" }}
        justify="center"
      >
        {Array.isArray(data)
          ? data.map((item, index) => (
              <div key={index}>
                <Grid item>
                  <Card sx={{ minWidth: 325, margin: 5 }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          P
                        </Avatar>
                      }
                      // action={
                      //   <IconButton aria-label="settings">
                      //     <MoreVertIcon />
                      //   </IconButton>
                      // }
                      title={item.title}
                      subheader={item.price}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={item.img}
                      alt="Paella dish"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                      <Typography paragraph>Method:</Typography>
                    </CardContent>
                    {/* <CardActions disableSpacing>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                          Heat 1/2 cup of the broth in a pot until simmering,
                          add saffron and set aside for 10 minutes.
                        </Typography>
                        <Typography paragraph>
                          Heat oil in a (14- to 16-inch) paella pan or a large,
                        </Typography>
                        <Typography paragraph>
                          Add rice and stir very gently to distribute. Top with
                        </Typography>
                        <Typography>
                          Set aside off of the heat to let rest for 10 minutes,
                          and then serve.
                        </Typography>
                      </CardContent>
                    </Collapse> */}
                  </Card>
                </Grid>
              </div>
            ))
          : null}
      </Grid>
    </div>
  );
}
