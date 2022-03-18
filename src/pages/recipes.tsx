import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Skeleton from '@mui/material/Skeleton';
import Typography from "@mui/material/Typography";
import { recipes } from "assets/img/images";
import Image from "components/image/image";
import { useRecipes } from "hooks";
import React from "react";
import { GetRecipeDto } from "types/dtos/GetRecipeDto";

const BannerTop = (
  <Grid alignItems="center"
    justifyContent="space-around"
    direction="row"
    container
    sx={{
      display: { md: "none" },
      backgroundColor: 'primary.main',
      mb: 4,
      px: 2
    }}
    spacing={1}>
    <Grid item xs={2} sm={2}>
      <Image
        src={recipes}
        alt={"Recipes"}
        layout="responsive"
      />
    </Grid>
    <Grid item xs={6}>
      <Typography
        variant="h4"
        fontSize={{ sm: 32, xs: 17 }}
        style={{
          transform: "rotate(-10deg)",
        }}
        color="common.white">Inspirate con nuestras recetas</Typography>

    </Grid>
  </Grid>
)

const Skelet = (
  <Box>
    <Skeleton variant="rectangular" width="100%"
      sx={{ mb: 3, height: "150px", }} />
    <Grid container spacing={{ xs: 2, sm: 8 }} >
      <Grid item sm={5} xs>
        <Skeleton variant="rectangular" sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" sx={{ mb: 3 }} />
      </Grid>
      <Grid item sm={7} xs={12}>
        <Skeleton variant="rectangular" sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" sx={{ mb: 3 }} />
      </Grid>
    </Grid>
  </Box>
)

export default function RecipesPage() {
  const getAllRecipes: GetRecipeDto[] | null = null
  const { data: recipesData } = useRecipes({ initialData: getAllRecipes ?? undefined })


  return (
    <Box>
      {BannerTop}
      <Grid container spacing={4} px={2}>
        <Grid item md={4}
          sx={{
            display: { xs: "none", md: "block" },
            mt: 8
          }}>
          <Typography
            style={{
              transform: "rotate(-10deg)",
              fontSize: 42,
              textAlign: "center"
            }}
            fontWeight="bold"
            variant="h4"
            color={{
              xs: 'primary.main'
            }}
            mb={3}
          >Inspirate con nuestras recetas
          </Typography>
          <Image
            src={recipes}
            alt={"Recetas"}
            layout="responsive"
          />
        </Grid>
        <Grid item md={8} xs={12} sx={{
          overflow: { md: "auto" }, maxHeight: { md: '85vh' },
          mt: 4
        }}>
          {!recipesData ?
            <Box mb={6}>
              {Skelet}
              {Skelet}
              {Skelet}
            </Box>
            : recipesData.map((recipe, index) => (
              <Box key={index}>
                <Grid style={{
                  backgroundImage: 'url(' + recipe.banner + ')',
                  height: "150px",
                  opacity: 0.6,
                  position: "relative"
                }}>
                </Grid>
                <Grid
                  sx={{
                    position: "relative",
                    mt: { md: "-60px", sm: "-50px", xs: "-40px" },
                    ml: "10px",
                    mb: "20px"
                  }} >
                  <Typography variant="h3">{recipe.title}</Typography>
                </Grid>

                <Grid container spacing={{ xs: 2, sm: 8 }}>
                  <Grid item sm={5}>
                    <Typography variant="h6"
                      color={'primary.main'}
                    >Ingredientes</Typography>
                    <Stack>
                      {recipe.Ingredients.map((ingredient, index) => (
                        <Typography key={index} gutterBottom
                          variant="h6">{ingredient}</Typography>
                      ))}
                    </Stack>
                  </Grid>
                  <Grid item sm={7}>
                    <Typography variant="h6"
                      color={'primary.main'}>Preparacion</Typography>
                    <Stack>
                      {recipe.steps.map((step, index) => (

                        <Typography key={index} gutterBottom

                          sx={{
                            typography: "h6",

                          }}><span
                            style={{ color: 'primary.main' }}>{index + 1}</span>
                          {'. '}{step}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            ))
          }
        </Grid>
      </Grid>
    </Box>

  )
}
