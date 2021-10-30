import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className="infobox">
      <CardContent className="p-4">
        <Typography variant="textSecondary">{title}</Typography>
        <h2>{cases}</h2>
        Total : <Typography variant="textSecondary">{total}</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
