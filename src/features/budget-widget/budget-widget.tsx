import { budgetColors } from "@constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowBack, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { alpha, Button, Grid, Stack, Theme, Typography } from "@mui/material";
import { BudgetItemType, BUDGET_RADI, isBudgetGroupType, isBudgetTypeType } from "constants/Budget";
import { useAuth } from 'context/auth/use-auth';
import dayjs from "dayjs";
import { FormInputText } from "features/form-input-text";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { budgetsRepository } from "repository/budgetsRepository";
import { ApiErrorDto, PostBudgetDto } from "types/dtos";
import { GetBudgetParams } from "types/params/query/api/BudgetParams";
import { number, object, SchemaOf } from 'yup';
import { BudgetPieChart } from ".";

type IFormInput = {
  [key in BudgetItemType]?: number;
}

const validationSchema: SchemaOf<IFormInput> = object({
  income: number().typeError("Debe ser un número"),
  entry: number().typeError("Debe ser un número"),
  salary: number().typeError("Debe ser un número"),
  other: number().typeError("Debe ser un número"),
  expenses: number().typeError("Debe ser un número"),
  essential: number().typeError("Debe ser un número"),
  radi: number().typeError("Debe ser un número"),
  otherFood: number().typeError("Debe ser un número"),
  medicine: number().typeError("Debe ser un número"),
  transport: number().typeError("Debe ser un número"),
  rent: number().typeError("Debe ser un número"),
  waterService: number().typeError("Debe ser un número"),
  internet: number().typeError("Debe ser un número"),
  cellphone: number().typeError("Debe ser un número"),
  entertainment: number().typeError("Debe ser un número"),
  streetFood: number().typeError("Debe ser un número"),
  recreative: number().typeError("Debe ser un número"),
  optional: number().typeError("Debe ser un número"),
  homeAppliances: number().typeError("Debe ser un número"),
  clothing: number().typeError("Debe ser un número"),
  alcohol: number().typeError("Debe ser un número"),
  extras: number().typeError("Debe ser un número"),
  gifts: number().typeError("Debe ser un número"),
  vacations: number().typeError("Debe ser un número"),
}).required();

export type BudgetWidgetProps = {
  typeOrGroup?: BudgetItemType;
  onItemClick: (name: BudgetItemType) => void;
  onValuesUpdated: () => void;
}

type MergedBudgetTable = {
  name: BudgetItemType,
  currentValue: number,
  lastTwelveMoths: number,
  currentYear: number,
}

export const BudgetWidget = ({ typeOrGroup, onItemClick, onValuesUpdated, }: BudgetWidgetProps) => {
  const [savingBudget, setSavingBudget] = useState(false);
  const [mergedBudgetTable, setMergedBudgetTable] = useState<MergedBudgetTable[]>([])
  const { token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const loadData = async () => {
    const now = dayjs();
    let repository = budgetsRepository.getBudget;
    if (isBudgetTypeType(typeOrGroup)) {
      repository = budgetsRepository.getBudgetByType;
    } else if (isBudgetGroupType(typeOrGroup)) {
      repository = budgetsRepository.getBudgetByGroup;
    }

    const commonParams: GetBudgetParams = {
      key: token,
      type: typeOrGroup && isBudgetTypeType(typeOrGroup) ? typeOrGroup : undefined,
      group: typeOrGroup && isBudgetGroupType(typeOrGroup) ? typeOrGroup : undefined,
    }

    try {
      const [currentMothData, lastTwelveMonthsData, currentYearData] = await Promise.all([
        await repository(commonParams),
        await repository({
          ...commonParams,
          dateFrom: now.add(-1, 'M').toISOString(),
          dateTo: now.add(-1, 'M').add(-1, 'y').toISOString(),
        }),
        await repository({
          ...commonParams,
          dateFrom: now.startOf('y').toISOString(),
          dateTo: now.toISOString(),
        }),
      ]);

      const mergedBudgetTable = currentMothData.map<MergedBudgetTable>(({ name, value }) => {
        const lastTwelveMoths = lastTwelveMonthsData.find(p => p.name === name)?.value || 0;
        const currentYear = currentYearData.find(p => p.name === name)?.value || 0;
        return {
          name,
          currentValue: value,
          lastTwelveMoths,
          currentYear,
        }
      });

      setMergedBudgetTable(mergedBudgetTable);
    } catch (e: any) {
      enqueueSnackbar(
        formatMessage({
          id: 'generalNotification.error.text',
          defaultMessage: 'Error {error}',
        }, {
          error: e.message,
        }),
        {
          variant: 'error',
        }
      );
    }
  }

  useEffect(() => {
    loadData();
  }, [typeOrGroup]);

  const { control, handleSubmit } = useForm<IFormInput>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: IFormInput) => {
    setSavingBudget(true);
    budgetsRepository.sendBudget({
      data: Object.entries(data)
        .filter(([key]) => key !== BUDGET_RADI)
        .map<PostBudgetDto>(([key, value]) => ({ name: key as BudgetItemType, value })),
      key: token,
    })
      .then(() => {
        enqueueSnackbar(
          formatMessage({
            id: 'myBudget.updated.notification',
            defaultMessage: 'Updated correctly',
          }),
          {
            variant: 'success',
          }
        );
        onValuesUpdated()
      })
      .catch((e: ApiErrorDto) => {
        enqueueSnackbar(
          formatMessage({
            id: 'generalNotification.error.text',
            defaultMessage: 'Error {error}',
          }, {
            error: e.message,
          }),
          {
            variant: 'error',
          }
        );
      })
      .finally(() => setSavingBudget(false));
  }

  const isDetailView = isBudgetGroupType(typeOrGroup);
  // const isDetailView = true;

  const handleShowNextLevel = (name: BudgetItemType) => {
    if (!isDetailView) {
      onItemClick(name);
    }
  }

  return (
    <Stack direction="column" spacing={2} flex="auto" width="100%">
      <Grid
        container
        justifyContent="flex-end"
        height={{
          xs: "25%",
          // lg: "40%",
        }}
      >
        <Grid item xs={3}>
          <BudgetPieChart pieData={mergedBudgetTable.map(({ name, currentValue }) => ({ name, value: currentValue }))} />
        </Grid>
        <Grid item xs={3}>
          <BudgetPieChart pieData={mergedBudgetTable.map(({ name, lastTwelveMoths }) => ({ name, value: lastTwelveMoths }))} />
        </Grid>
        <Grid item xs={3}>
          <BudgetPieChart pieData={mergedBudgetTable.map(({ name, currentYear }) => ({ name, value: currentYear }))} />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item xs={3} textAlign="right">
          <Typography variant="subtitle1" color="secondary" p={1} fontWeight="bold">
            Este mes
          </Typography>
        </Grid>
        <Grid item xs={3} textAlign="right">
          <Typography variant="subtitle1" color="secondary" p={1} fontWeight="bold">
            últimos 12 meses
          </Typography>
        </Grid>
        <Grid item xs={3} textAlign="right">
          <Typography variant="subtitle1" color="secondary" p={1} fontWeight="bold">
            Año presente
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" component="form" onSubmit={handleSubmit(onSubmit)}>
        {
          mergedBudgetTable.map(({ name, currentValue, lastTwelveMoths, currentYear }, index) => (
            <Grid
              item
              container
              key={name}
              alignItems="center"
              sx={{
                cursor: !isDetailView ? 'pointer' : undefined,
                p: 0.25,
                '&:hover': {
                  borderRadius: 2,
                  backgroundColor: (theme: Theme) => alpha(theme.palette.secondary.main, 0.1),
                  fontWeight: 'bold',
                  'div > p:not(.MuiFormHelperText-root)': {
                    backgroundColor: budgetColors[index],
                  },
                }
              }}
              onClick={() => handleShowNextLevel(name)}
              spacing={0.5}
            >
              <Grid item xs={3} textAlign="center">
                <Typography variant="subtitle1" color="secondary" p={1} fontWeight="inherit">
                  <FormattedMessage
                    id={`myBudget.${name}`}
                    defaultMessage={name}
                  />
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="right">{
                isDetailView ?
                  <FormInputText
                    type="number"
                    control={control}
                    defaultValue={currentValue}
                    name={name}
                    placeholder="Ingrese un valor"
                    autoComplete="off"
                    size="small"
                    fullWidth
                    disabled={name === BUDGET_RADI}
                  />
                  :
                  <Typography variant="body1" p={1} bgcolor={alpha(budgetColors[index], 0.8)} fontWeight="inherit">
                    {currentValue}
                  </Typography>
              }
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Typography variant="body1" p={1} bgcolor={alpha(budgetColors[index], 0.8)} fontWeight="inherit">
                  {lastTwelveMoths}
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Typography variant="body1" p={1} bgcolor={alpha(budgetColors[index], 0.8)} fontWeight="inherit">
                  {currentYear}
                </Typography>
              </Grid>
            </Grid>
          ))
        }
        {
          isDetailView && (
            <Grid
              item
              container
              alignItems="center"
              p={0.5}
            >
              <Grid item xs={3}>

              </Grid>
              <Grid item xs={3} textAlign="center">
                <LoadingButton
                  type="submit"
                  color="secondary"
                  sx={{
                    borderRadius: 0,
                  }}
                  variant="contained"
                  loading={savingBudget}
                  loadingPosition="start"
                  startIcon={<Save />}
                >
                  {
                    savingBudget ?
                      'Grabando'
                      :
                      'Grabar'
                  }
                </LoadingButton>
              </Grid>
            </Grid>
          )
        }
      </Grid>
    </Stack>
  );
}

export const BudgetNestedContainer = () => {
  const [budgetLevel, setbudgetLevel] = useState<BudgetItemType[]>([]);

  const handleShowNextLevel = (name: BudgetItemType) => {
    setbudgetLevel(b => [...b, name]);
  }

  const handleShowParentLevel = () => {
    setbudgetLevel(b => b.slice(0, b.length - 1));
  }

  const goFirstLevel = () => {
    setbudgetLevel([]);
  }

  const isSublevel = budgetLevel.length > 0;
  const groupName = budgetLevel[budgetLevel.length - 1];

  return (
    <Fragment>
      {
        isSublevel && (
          <Fragment>
            <Button
              color="secondary"
              sx={{
                alignSelf: 'flex-start',
                borderRadius: 0,
              }}
              variant="text"
              startIcon={<ArrowBack />}
              onClick={handleShowParentLevel}
            >
              REGRESAR
            </Button>
            <Typography
              variant="h4"
              sx={{
                textTransform: "uppercase",
              }}
              gutterBottom
            >
              <FormattedMessage
                id={`myBudget.${groupName}`}
                defaultMessage={groupName}
              />
            </Typography>
          </Fragment>
        )
      }
      <BudgetWidget key={groupName} typeOrGroup={groupName} onItemClick={handleShowNextLevel} onValuesUpdated={goFirstLevel} />
    </Fragment>
  );
}