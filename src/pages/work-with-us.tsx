import { PhotoCamera } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { Box, FormControl, IconButton, MenuItem, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { SEO } from "components";
import Image from "components/image/image";
import { StyledInput } from "components/layout/StyledInput";
import { StyledLabel } from "components/layout/StyledLabel";
import React, { ChangeEvent, useState } from "react";
import { StyledTextField } from "../components/layout/StyledTextField";

const ImageInput = styled("input")({
  display: "none",
});

const PrimaryTypo = styled(Typography)(() => ({
  color: 'primary.main',
  fontWeight: "bold",
}));

export default function WorkWithUsPage() {
  const [imageToPost, setImageToPost] = useState(null);
  const addImage = (event: ChangeEvent) => {
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = (readerEvent: ProgressEvent<any>) => {
      setImageToPost(readerEvent.target?.result);
    };
  };
  const [MStatus, setMStatus] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setMStatus(event.target.value);
  };
  return (
    <Box mt={4}>
      <SEO title="Trabaja con nosotros" description="" />
      <PrimaryTypo mb={3} variant="h4" textAlign="center">
        Trabaja con nosotros
      </PrimaryTypo>
      <Grid container spacing={{ sm: 8 }} px={{ xs: "10%", sm: 0 }}>
        <Grid item md={2} xs={12} ml={{ md: 6 }}>
          <Stack alignItems="center">
            <Box
              mt={{ md: 7 }}
              component="span"
              border={3}
              borderColor='secondary.main'
              height={180}
              width={170}
              alignContent="center"
            >
              {imageToPost ? (
                <Image
                  src={imageToPost}
                  alt="user"
                  height={180}
                  width={170}
                  layout="intrinsic"
                ></Image>
              ) : (
                <PersonIcon sx={{ fontSize: 165 }} />
              )}
            </Box>
            <label htmlFor="icon-button-file">
              <ImageInput
                accept="image/*"
                onChange={addImage}
                id="icon-button-file"
                type="file"
              />
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Stack>
        </Grid>
        <Grid item md={3} xs={12} sx={{ my: { md: 0, sm: -6 } }}>
          <Stack spacing={{ xs: 2 }} sx={{
            width: { sm: "50%", md: "100%" },
            mx: { sm: "25%", md: 0 }
          }}>
            <PrimaryTypo variant="h6">Información personal</PrimaryTypo>
            <StyledTextField label="Nombres" placeholder="Nombres" />
            <StyledTextField label="Apellidos" placeholder="Apellidos" />
            <StyledTextField
              label="Fecha de nacimiento"
              type="date"
              defaultValue="2000-05-24"
            />
            <StyledTextField
              label="Cédula de identidad"
              placeholder="Cédula de identidad"
            />
            <FormControl>
              <StyledLabel id="1">Estado Civil</StyledLabel>
              <Select
                labelId="1"
                value={MStatus}
                onChange={handleChange}
                label="Estado Civil"
                input={<StyledInput />}
              >
                <MenuItem value={1}>Soltero</MenuItem>
              </Select>
            </FormControl>
            <PrimaryTypo variant="h6">Lugar de nacimiento</PrimaryTypo>
            <FormControl>
              <StyledLabel id="1">País</StyledLabel>
              <Select
                labelId="1"
                value={MStatus}
                onChange={handleChange}
                label="País"
                input={<StyledInput />}
              >
                <MenuItem value={1}>Ecuador</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <StyledLabel id="1">Provincia</StyledLabel>
              <Select
                labelId="1"
                value={MStatus}
                onChange={handleChange}
                label="Provincia"
                input={<StyledInput />}
              >
                <MenuItem value={1}>Azuay</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <StyledLabel id="1">Ciudad</StyledLabel>
              <Select
                labelId="1"
                value={MStatus}
                onChange={handleChange}
                label="Ciudad"
                input={<StyledInput />}
              >
                <MenuItem value={1}>Cuenca</MenuItem>
              </Select>
            </FormControl>
            <StyledTextField
              label="Dirección de residencia"
              placeholder="Dirección de residencia"
            />
          </Stack>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Stack spacing={2}>
            <PrimaryTypo variant="h6">Experiencia laboral</PrimaryTypo>
            <StyledTextField label="Empresa" placeholder="Empresa" />
            <StyledTextField label="Cargo" placeholder="Cargo" />
            <PrimaryTypo variant="h6">Tiempo laborado</PrimaryTypo>
            <StyledTextField
              label="Desde"
              defaultValue="2000-05-24"
              type="date"
            />
            <StyledTextField
              label="Hasta"
              defaultValue="2000-05-24"
              type="date"
            />
          </Stack>
          <Button>
            <PrimaryTypo variant="body2">Agregar</PrimaryTypo>
          </Button>
        </Grid>
        <Grid item md={3} sm={6} xs={12} >
          <Stack spacing={2}>
            <PrimaryTypo variant="h6">Educación</PrimaryTypo>
            <StyledTextField label="Primaria" placeholder="Primaria" />
            <StyledTextField label="Secundaria" placeholder="Secundaria" />
            <StyledTextField label="Universidad" placeholder="Universidad" />
          </Stack>
          <Button>
            <PrimaryTypo variant="body2">Agregar</PrimaryTypo>
          </Button>
          <Stack mt={"4vh"}>
            <Button variant="contained" color="secondary" sx={{
              borderRadius: 0
            }}>Enviar</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
