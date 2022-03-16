import { Box, Divider, Grid, Paper, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React from "react"
interface IPCardSale {
  dataCard: [IPDataCard]
}
interface IPDataCard {
  flag: any;
  country: string;
  sale: string;
  value: string;
  bounce: string
}

const useStyles = makeStyles({
  title: {
    fontSize: "12px !important"
  },
  value: {
    fontSize: "14px !important"
  },
  boxSale: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
})

const CardSale: React.FC<IPCardSale> = ({ dataCard }) => {
  const classes = useStyles()
  return (
    <Box>
      <Paper sx={{ borderRadius: "15px", px: 2, py: 2 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "16px", mb: 2 }}>
          {/* Sale by country */}
          Sale by country
        </Typography>
        {
          dataCard.map((item: any, index: any) => (
            <Box key={index}>
              <Grid container alignItems={"center"} >
                <Grid item xs={1}>
                  <img src={item.flag} alt="flag" />
                </Grid>
                <Grid item xs={4} >

                  <Typography className={classes.title}>
                    Country:
                  </Typography>
                  <Typography className={classes.value} sx={{ fontWeight: 600 }} >
                    {item.country}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography className={classes.title}>
                    Sale:
                  </Typography>
                  <Typography className={classes.value} sx={{ fontWeight: 600 }}>
                    {item.sale}
                  </Typography>
                </Grid>
                <Grid item xs={3} >
                  <Box className={classes.boxSale}><Typography className={classes.title}>
                    Value:
                  </Typography>
                    <Typography className={classes.value} sx={{ fontWeight: 600 }}>
                      $ {item.value}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={2}> <Box className={classes.boxSale}><Typography className={classes.title}>
                  Bounce:
                </Typography>
                  <Typography className={classes.value} sx={{ fontWeight: 600 }}>
                    {item.bounce} %
                  </Typography></Box></Grid>
              </Grid>
              <Divider sx={{ my: 1 }} />
            </Box>
          ))
        }
      </Paper>
    </Box>

  )
}

export default CardSale