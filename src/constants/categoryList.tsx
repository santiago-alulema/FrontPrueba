import { categoryDefaultNames, CATEGORY_ACEITES_Y_GRASAS, CATEGORY_ADEREZOS, CATEGORY_BEBIDAS, CATEGORY_BEBIDAS_ALCOHOLICAS, CATEGORY_CARNICOS, CATEGORY_CONFITERIA, CATEGORY_CONGELADOS, CATEGORY_CONSERVAS, CATEGORY_DESAYUNO, CATEGORY_ENDULZANTES, CATEGORY_FRUTAS_Y_VERDURAS, CATEGORY_GALLETAS, CATEGORY_GRANOS, CATEGORY_HARINAS_Y_COLADAS, CATEGORY_HIGIENE_Y_CUIDADO_PERSONAL, CATEGORY_HOGAR, CATEGORY_HUEVOS_Y_LACTEOS, CATEGORY_LIQUIDACION, CATEGORY_MASCOTAS, CATEGORY_PANADERIA_Y_PASTELERIA, CATEGORY_PASTAS_Y_FIDEOS, CATEGORY_PRODUCTOS_ONLINE, CATEGORY_PRODUCTO_NUEVO, CATEGORY_SNACKS, CATEGORY_TODOS_PRODUCTOS } from "@constants";
import { Search } from "@mui/icons-material";
import { AceitesGrasasIcon, AderezosIcon, BebidasAlcoholicasIcon, BebidasIcon, CarnicosIcon, ConfiteriaIcon, CongeladosIcon, ConservasIcon, DesayunoIcon, EndulzantesIcon, FrutasVerdurasIcon, GalletasIcon, GranosIcon, HarinasColadasIcon, HigieneCuidadopersonalIcon, HogarIcon, HuevosLacteosIcon, LiquidacionIcon, MascotasIcon, PanaderiaPasteleriaIcon, PastasFideosIcon, ProductoNuevoIcon, ProductosOnlineIcon, SnacksIcon } from "assets/icons/category";
import { ALL_PRODUCT_PAGE, categoryPageBySlug, NEW_PRODUCTS_PAGE } from "site/navigation";
import { MenuItemType } from "types";

export const categoryList: MenuItemType[] = [
  {
    id: CATEGORY_TODOS_PRODUCTOS,
    icon: <Search fontSize="inherit" />,
    intl: `category.${CATEGORY_TODOS_PRODUCTOS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_TODOS_PRODUCTOS] as string,
    href: ALL_PRODUCT_PAGE,
  },
  {
    id: CATEGORY_DESAYUNO,
    icon: <DesayunoIcon />,
    intl: `category.${CATEGORY_DESAYUNO}`,
    defaultMessage: categoryDefaultNames[CATEGORY_DESAYUNO] as string,
    href: categoryPageBySlug(CATEGORY_DESAYUNO),
  },
  {
    id: CATEGORY_ADEREZOS,
    icon: <AderezosIcon />,
    intl: `category.${CATEGORY_ADEREZOS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_ADEREZOS] as string,
    href: categoryPageBySlug(CATEGORY_ADEREZOS),
  },
  {
    id: CATEGORY_ACEITES_Y_GRASAS,
    icon: <AceitesGrasasIcon />,
    intl: `category.${CATEGORY_ACEITES_Y_GRASAS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_ACEITES_Y_GRASAS] as string,
    href: categoryPageBySlug(CATEGORY_ACEITES_Y_GRASAS),
  },
  {
    id: CATEGORY_CONSERVAS,
    icon: <ConservasIcon />,
    intl: `category.${CATEGORY_CONSERVAS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_CONSERVAS] as string,
    href: categoryPageBySlug(CATEGORY_CONSERVAS),
  },
  {
    id: CATEGORY_ENDULZANTES,
    icon: <EndulzantesIcon />,
    intl: `category.${CATEGORY_ENDULZANTES}`,
    defaultMessage: categoryDefaultNames[CATEGORY_ENDULZANTES] as string,
    href: categoryPageBySlug(CATEGORY_ENDULZANTES),
  },
  {
    id: CATEGORY_HARINAS_Y_COLADAS,
    icon: <HarinasColadasIcon />,
    intl: `category.${CATEGORY_HARINAS_Y_COLADAS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_HARINAS_Y_COLADAS] as string,
    href: categoryPageBySlug(CATEGORY_HARINAS_Y_COLADAS),
  },
  {
    id: CATEGORY_GALLETAS,
    icon: <GalletasIcon />,
    intl: `category.${CATEGORY_GALLETAS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_GALLETAS] as string,
    href: categoryPageBySlug(CATEGORY_GALLETAS),
  },
  {
    id: CATEGORY_CONFITERIA,
    icon: <ConfiteriaIcon />,
    intl: `category.${CATEGORY_CONFITERIA}`,
    defaultMessage: categoryDefaultNames[CATEGORY_CONFITERIA] as string,
    href: categoryPageBySlug(CATEGORY_CONFITERIA),
  },
  {
    id: CATEGORY_PASTAS_Y_FIDEOS,
    icon: <PastasFideosIcon />,
    intl: `category.${CATEGORY_PASTAS_Y_FIDEOS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_PASTAS_Y_FIDEOS] as string,
    href: categoryPageBySlug(CATEGORY_PASTAS_Y_FIDEOS),
  },
  {
    id: CATEGORY_SNACKS,
    icon: <SnacksIcon />,
    intl: `category.${CATEGORY_SNACKS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_SNACKS] as string,
    href: categoryPageBySlug(CATEGORY_SNACKS),
  },
  {
    id: CATEGORY_BEBIDAS_ALCOHOLICAS,
    icon: <BebidasAlcoholicasIcon />,
    intl: `category.${CATEGORY_BEBIDAS_ALCOHOLICAS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_BEBIDAS_ALCOHOLICAS] as string,
    href: categoryPageBySlug(CATEGORY_BEBIDAS_ALCOHOLICAS),
  },
  {
    id: CATEGORY_BEBIDAS,
    icon: <BebidasIcon />,
    intl: `category.${CATEGORY_BEBIDAS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_BEBIDAS] as string,
    href: categoryPageBySlug(CATEGORY_BEBIDAS),
  },
  {
    id: CATEGORY_CARNICOS,
    icon: <CarnicosIcon />,
    intl: `category.${CATEGORY_CARNICOS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_CARNICOS] as string,
    href: categoryPageBySlug(CATEGORY_CARNICOS),
  },
  {
    id: CATEGORY_HOGAR,
    icon: <HogarIcon />,
    intl: `category.${CATEGORY_HOGAR}`,
    defaultMessage: categoryDefaultNames[CATEGORY_HOGAR] as string,
    href: categoryPageBySlug(CATEGORY_HOGAR),
  },
  {
    id: CATEGORY_CONGELADOS,
    icon: <CongeladosIcon />,
    intl: `category.${CATEGORY_CONGELADOS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_CONGELADOS] as string,
    href: categoryPageBySlug(CATEGORY_CONGELADOS),
  },
  {
    id: CATEGORY_FRUTAS_Y_VERDURAS,
    icon: <FrutasVerdurasIcon />,
    intl: `category.${CATEGORY_FRUTAS_Y_VERDURAS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_FRUTAS_Y_VERDURAS] as string,
    href: categoryPageBySlug(CATEGORY_FRUTAS_Y_VERDURAS),
  },
  {
    id: CATEGORY_GRANOS,
    icon: <GranosIcon />,
    intl: `category.${CATEGORY_GRANOS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_GRANOS] as string,
    href: categoryPageBySlug(CATEGORY_GRANOS),
  },
  {
    id: CATEGORY_HUEVOS_Y_LACTEOS,
    icon: <HuevosLacteosIcon />,
    intl: `category.${CATEGORY_HUEVOS_Y_LACTEOS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_HUEVOS_Y_LACTEOS] as string,
    href: categoryPageBySlug(CATEGORY_HUEVOS_Y_LACTEOS),
  },
  {
    id: CATEGORY_PANADERIA_Y_PASTELERIA,
    icon: <PanaderiaPasteleriaIcon />,
    intl: `category.${CATEGORY_PANADERIA_Y_PASTELERIA}`,
    defaultMessage: categoryDefaultNames[CATEGORY_PANADERIA_Y_PASTELERIA] as string,
    href: categoryPageBySlug(CATEGORY_PANADERIA_Y_PASTELERIA),
  },
  {
    id: CATEGORY_MASCOTAS,
    icon: <MascotasIcon />,
    intl: `category.${CATEGORY_MASCOTAS}`,
    defaultMessage: categoryDefaultNames[CATEGORY_MASCOTAS] as string,
    href: categoryPageBySlug(CATEGORY_MASCOTAS),
  },
  {
    id: CATEGORY_HIGIENE_Y_CUIDADO_PERSONAL,
    icon: <HigieneCuidadopersonalIcon />,
    intl: `category.${CATEGORY_HIGIENE_Y_CUIDADO_PERSONAL}`,
    defaultMessage: categoryDefaultNames[CATEGORY_HIGIENE_Y_CUIDADO_PERSONAL] as string,
    href: categoryPageBySlug(CATEGORY_HIGIENE_Y_CUIDADO_PERSONAL),
  },
  {
    id: CATEGORY_PRODUCTO_NUEVO,
    icon: <ProductoNuevoIcon />,
    intl: `category.${CATEGORY_PRODUCTO_NUEVO}`,
    defaultMessage: categoryDefaultNames[CATEGORY_PRODUCTO_NUEVO] as string,
    href: NEW_PRODUCTS_PAGE,
  },
  {
    id: CATEGORY_LIQUIDACION,
    icon: <LiquidacionIcon />,
    intl: `category.${CATEGORY_LIQUIDACION}`,
    defaultMessage: categoryDefaultNames[CATEGORY_LIQUIDACION] as string,
    href: categoryPageBySlug(CATEGORY_LIQUIDACION),
  },
  {
    id: CATEGORY_PRODUCTOS_ONLINE,
    icon: <ProductosOnlineIcon />,
    intl: `category.${CATEGORY_PRODUCTOS_ONLINE}`,
    defaultMessage: categoryDefaultNames[CATEGORY_PRODUCTOS_ONLINE] as string,
    href: categoryPageBySlug(CATEGORY_PRODUCTOS_ONLINE),
  }
]

























