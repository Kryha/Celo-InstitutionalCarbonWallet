"use client";

import { FormDropdownInput, FormNumberInput } from "@/components";
import { useWalletStore } from "@/store";
import { ExecuteUserTransactionBody } from "@/types";
import { Button, CircularProgress, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { ethers } from "ethers";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGetBalance, useGetTokenBalance } from "../balance";
import { EXCHANGE_TRANSFER_LIST, NCT_TOKEN_PRICE } from "./constants";
import { useSendTransaction } from "./services";

export function SendTransactionForm() {
  const privateKey = useWalletStore((state) => state.privateKey);
  const { data: balance = "0", isLoading: isLoadingBalance } = useGetBalance();
  const { data: tokenBalance = "0", isLoading: isLoadingTokenBalance } = useGetTokenBalance();
  const { mutate: sendTransaction, isLoading: isSendingTransaction } = useSendTransaction();
  const formMethods = useForm<ExecuteUserTransactionBody & { tokenType: string }>({
    defaultValues: { pk: privateKey, destination: "", tokenType: "" },
    mode: "onBlur",
  });
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting, isLoading, isValidating, isValid },
  } = formMethods;
  const isDisabled = isSubmitting || isLoading || isValidating || isSendingTransaction;
  const amount = watch("amount");
  const tokenType = watch("tokenType");
  const destination = watch("destination");
  const exchange = EXCHANGE_TRANSFER_LIST.find((exchange) => exchange.value === destination);
  const tokenTypeOptions = exchange?.tokens.map((token) => ({ label: token.name, value: token.name })) || [];
  const companyName = process.env.NEXT_PUBLIC_company_name!;
  const tokenValue = amount ? (Number(amount) * NCT_TOKEN_PRICE).toFixed(8) : 0;

  const onSubmit = (data: ExecuteUserTransactionBody) =>
    sendTransaction(
      { pk: data.pk, destination: data.destination, amount: String(tokenValue) },
      {
        onSuccess: () => {
          toast.success("Successfully sent transaction!");
          reset({ pk: privateKey }, { keepValues: false });
        },
      }
    );

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <Stack gap={1}>
            <Typography
              variant="overline"
              color="primary.light"
            >
              Celo Wallet of {companyName}
            </Typography>
            <Typography
              variant="body1"
              color="primary.light"
            >
              Balance:
            </Typography>
            {isLoadingBalance ? (
              <CircularProgress
                color="secondary"
                size={20}
              />
            ) : (
              <Typography
                variant="body1"
                color="primary.light"
              >
                {ethers.utils.formatEther(ethers.BigNumber.from(balance))} CELO
              </Typography>
            )}
            {isLoadingTokenBalance ? (
              <CircularProgress
                color="secondary"
                size={20}
              />
            ) : (
              <Typography
                variant="body1"
                color="primary.light"
              >
                {Number(ethers.utils.formatEther(ethers.BigNumber.from(tokenBalance))) / NCT_TOKEN_PRICE} NCT
              </Typography>
            )}
          </Stack>
          <FormDropdownInput
            name="destination"
            label="Buy from"
            control={control}
            options={EXCHANGE_TRANSFER_LIST}
            formControlProps={{ color: "secondary", disabled: isDisabled }}
            rules={{ required: { value: true, message: "This field is required" } }}
          />
          {destination && (
            <>
              <FormDropdownInput
                name="tokenType"
                label="Token type"
                control={control}
                options={tokenTypeOptions}
                formControlProps={{ color: "secondary", disabled: isDisabled }}
                rules={{ required: { value: true, message: "This field is required" } }}
              />
              {tokenType && (
                <>
                  <TextField
                    label="Price"
                    value={NCT_TOKEN_PRICE}
                    disabled
                  />
                  <FormNumberInput
                    name="amount"
                    label="Amount"
                    control={control}
                    textFieldProps={{
                      color: "secondary",
                      disabled: isDisabled,
                      InputProps: {
                        endAdornment: <InputAdornment position="end">NCT</InputAdornment>,
                      },
                    }}
                    rules={{
                      required: { value: true, message: "This field is required" },
                      validate: (value: number) => value !== 0 || "Amount must be more than 0",
                    }}
                  />
                  <TextField
                    label="Value"
                    value={tokenValue}
                    disabled
                    InputProps={{ endAdornment: <InputAdornment position="end">ETH</InputAdornment> }}
                  />
                </>
              )}
            </>
          )}
          <Button
            variant="outlined"
            fullWidth
            type="submit"
            disabled={isDisabled || !isValid}
            endIcon={
              isDisabled ? (
                <CircularProgress
                  color="inherit"
                  size={20}
                />
              ) : null
            }
          >
            Buy{amount ? ` ${amount} ${tokenType}` : ""}
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
