import React from "react";
import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Grid
} from "@mui/material";
import { ChangePassword } from "./ChangePassword";
import { UserPerfilForm } from "./UserPerfilForm";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

export const UserProfile = () => {
  return (
    <Grid container>
      <Grid item xs={4}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box alignItems="center" display="flex" flexDirection="column">
              <Avatar className="avatar" src={user.avatar} />
              <Typography color="textPrimary" gutterBottom variant="h5">
                {user.name}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {`${user.city} ${user.country}`}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {`${moment().format("hh:mm A")} ${user.timezone}`}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Button color="primary" fullWidth variant="text">
              Upload picture
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12}>
      <ChangePassword/>
      </Grid>
      
      </Grid>
      <Grid item xs={8} >
      <UserPerfilForm/>
      </Grid>
    </Grid>
  );
};
