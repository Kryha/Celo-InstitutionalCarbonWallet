"use client";

import { FormDropdownInput, FormNumberInput } from "@/components";
import { useWalletStore } from "@/store";
import { SafeTransactionBody } from "@/types";
import { Button, CircularProgress, InputAdornment, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { EXCHANGE_TRANSFER_LIST } from "./constants";
import { useSendTransaction } from "./services";
import { ethers } from "ethers";
import { useGetBalance } from "../balance";

export function SendTransactionForm() {
  const privateKey = useWalletStore((state) => state.privateKey);
  const userInfo = useWalletStore((state) => state.userInfo);
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
    formState: { isSubmitting, isLoading, isValidating },
  } = formMethods;
  const isDisabled = isSubmitting || isLoading || isValidating || isSendingTransaction;
  const amount = watch("amount");
  const tokenType = watch("tokenType");
  const values = watch();

  const onSubmit = (data: SafeTransactionBody) =>
    sendTransaction(
      { ...data, amount: String(data.amount) },
      {
        onSuccess: () => {
          toast.success("Successfully sent transaction!");
          // TODO: check why reset not working
          reset({ pk: privateKey }, { keepValues: false });
        },
      }
    );

  console.log({ values });
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <Stack gap={1}>
          <Typography variant="overline">Celo Wallet of {userInfo?.name}</Typography>
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
            label="Send to"
            control={control}
            options={EXCHANGE_TRANSFER_LIST}
            formControlProps={{ color: "secondary", disabled: isDisabled }}
            rules={{ required: { value: true, message: "This field is required" } }}
          />
          <FormDropdownInput
            name="tokenType"
            label="Token type"
            control={control}
            options={[{ label: "NCT", value: "NCT" }]}
            formControlProps={{ color: "secondary", disabled: isDisabled }}
            rules={{ required: { value: true, message: "This field is required" } }}
          />
          <FormNumberInput
            name="amount"
            label="Amount"
            control={control}
            textFieldProps={{
              color: "secondary",
              disabled: isDisabled,
              InputProps: {
                endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
              },
            }}
            rules={{
              required: { value: true, message: "This field is required" },
              validate: (value: number) => value !== 0 || "Amount must be more than 0",
            }}
          />
          <Button
            variant="outlined"
            fullWidth
            type="submit"
            disabled={isDisabled}
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
