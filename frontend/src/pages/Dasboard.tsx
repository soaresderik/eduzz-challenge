import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { DashContainer } from "./styles";
import Chart from "react-apexcharts";
import { formatPrice } from "../utils/currency";
import { useMain } from "../store/main";
import { useAuth } from "../store/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function Dashboard() {
  const {
    getBalance,
    getHistory,
    currentPrice,
    balance,
    history,
    price,
  } = useMain();

  const { logout } = useAuth();

  useEffect(() => {
    (async () => {
      await getBalance();
      await getHistory();
      await currentPrice();
    })();
  }, [getBalance, getHistory, currentPrice]);

  const [chart] = useState({
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
      },
      colors: ["#00c708", "#e80000"],
      dataLabels: {
        enabled: false,
        formatter: function (val: number, opts: any) {
          console.log({ val, opts });
          return formatPrice(val / 100);
        },
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Valor de compra e de venda (Últimas 24hs)",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        title: {
          text: "24h",
        },
        labels: {
          show: false,
        },
        tickAmount: 5,
      },
      yaxis: {
        title: {
          text: "Preço",
        },
        labels: {
          formatter: function (value: number) {
            return formatPrice(value / 100);
          },
        },
        tickAmount: 6,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  function handleLogout() {
    logout();
  }

  return (
    <DashContainer maxWidth="md">
      <Grid
        container
        spacing={4}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <h1>Dashboard</h1>
        </Grid>
        <Grid item>
          <Button onClick={handleLogout}>
            <ExitToAppIcon />
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid
          xs={12}
          md={5}
          item
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Seu saldo
                </Typography>
                <h2>{balance}</h2>
              </CardContent>
            </Card>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Cotação atual
                </Typography>
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography color="textSecondary" gutterBottom>
                      Compra
                    </Typography>
                    <h3 style={{ color: "#00c708" }}>{price.buy}</h3>
                  </Grid>
                  <Grid item>
                    <Typography color="textSecondary" gutterBottom>
                      Venda
                    </Typography>
                    <h3 style={{ color: "#e80000" }}>{price.sell}</h3>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Transações
                </Typography>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Comprar BTC"
                    variant="outlined"
                    size="small"
                  />
                  <Button variant="outlined" size="large">
                    ENVIAR
                  </Button>
                </div>
                <br />
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Depositar em conta"
                    variant="outlined"
                    size="small"
                  />
                  <Button variant="outlined" size="large">
                    ENVIAR
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              {history.length && (
                <Chart options={chart.options} series={history} type="line" />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashContainer>
  );
}
