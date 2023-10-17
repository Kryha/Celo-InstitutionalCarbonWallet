"use client";

import { FormDropdownInput, FormNumberInput } from "@/components";
import { useWalletStore } from "@/store";
import { SafeTransactionBody } from "@/types";
import { Button, CircularProgress, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { ethers } from "ethers";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGetBalance } from "../balance";
import { EXCHANGE_TRANSFER_LIST } from "./constants";
import { useSendTransaction } from "./services";

export function SendTransactionForm() {
  const privateKey = useWalletStore((state) => state.privateKey);
  const { data: balance = "0", isLoading: isLoadingBalance } = useGetBalance();
  const { mutate: sendTransaction, isLoading: isSendingTransaction } = useSendTransaction();
  const formMethods = useForm<SafeTransactionBody & { tokenType: string }>({
    defaultValues: { pk: privateKey },
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

  const onSubmit = (data: SafeTransactionBody) =>
    sendTransaction(
      { pk: data.pk, destination: data.destination, value: String(data.amount) },
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
            <Typography variant="overline">Celo Wallet of {companyName}</Typography>
            {isLoadingBalance ? (
              <CircularProgress
                color="secondary"
                size={20}
              />
            ) : (
              <Typography variant="body1">
                Balance: {ethers.utils.formatEther(ethers.BigNumber.from(balance))} ETH
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
                    value={exchange?.tokens[0].price}
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
                    value={amount ? (Number(amount) * (exchange?.tokens[0].price || 0)).toFixed(8) : 0}
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
