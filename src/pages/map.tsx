import { Box } from '@mui/material';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { SEO } from "components";
import React from "react";
import Maps from "../components/layout/maps/MapGoogle";
import credentials from "../utils/credentials";

const mapUrl = `https://maps.googleapis.com/maps/api/js?=3.exp&key=${credentials.mapsKey}`;

const sucursales = [
  {
    title: "Local Terminal",
    adress: "Nuñez de Bonilla 2-83 y Ave. España",
    city: "Cuenca, Azuay, Ecuador",
    lat: -2.894859704335412,
    lng: -78.9944168999551,
  },
  {
    title: "Local Heroes de Verdeloma",
    adress: "Heroes de Verdeloma 13-59 y Estevez de Toral",
    city: "Cuenca, Azuay, Ecuador",
    lat: -2.887737380114293,
    lng: -79.00898387527131,
  },
];

export default function MapPage() {
  return (
    <Box mt={4} px={{ xs: "5%", sm: "10%", lg: 0 }}>
      <SEO title="Donde Encontrarnos" description="Ubicación de nuestras tiendas." />
      <Grid textAlign="center" mb={2}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          Donde Encontrarnos
        </Typography>
      </Grid>
      <Grid container spacing={3} fontWeight="bold">
        {sucursales.map((sucursal) => (
          <Grid key={sucursal.title} item md xs={12}>
            <Typography variant="h5" fontWeight="bold" color="primary">
              {sucursal.title}
            </Typography>

            <Typography variant="h6" fontWeight="bold">
              {sucursal.adress}
            </Typography>

            <Typography variant="h6" fontWeight="bold" mb={2}>
              {sucursal.city}
            </Typography>
            <div>
              <Maps
                googleMapURL={mapUrl}
                containerElement={<div style={{ height: "500px" }}> </div>}
                mapElement={<div style={{ height: "100%" }}> </div>}
                loadingElement={<p>Cargando</p>}
                lati={sucursal.lat}
                long={sucursal.lng}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
