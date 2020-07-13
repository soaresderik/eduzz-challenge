import React, { useState } from "react";
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

export default function Dashboard() {
  const [chart, setChart] = useState({
    series: [
      {
        name: "Compra",
        data: [
          2809000,
          3900500,
          431000,
          960020,
          7203000,
          9203000,
          8306000,
          8306100,
        ],
      },
      {
        name: "Venda",
        data: [
          1200000,
          2100000,
          5402300,
          3050800,
          4907000,
          7230000,
          8900000,
          8306100,
        ],
      },
    ],
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
        min: 100000,
        max: 10000000,
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

  return (
    <DashContainer maxWidth="md">
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
                <h2>R$ 1.238,00</h2>
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
                    <h3 style={{ color: "#00c708" }}>R$ 1.238,00</h3>
                  </Grid>
                  <Grid item>
                    <Typography color="textSecondary" gutterBottom>
                      Venda
                    </Typography>
                    <h3 style={{ color: "#e80000" }}>R$ 1.238,00</h3>
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
              <Chart
                options={chart.options}
                series={chart.series}
                type="line"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashContainer>
  );
}
