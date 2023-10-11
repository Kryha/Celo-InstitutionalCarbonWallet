"use client";

import { FormDropdownInput, FormNumberInput } from "@/components";
import { useWalletStore } from "@/store";
import { SafeTransactionBody } from "@/types";
import { Button, CircularProgress, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { EXCHANGE_TRANSFER_LIST } from "./constants";
import { useSendTransaction } from "./services";

export function SendTransactionForm() {
  const address = useWalletStore((state) => state.address);
  const userInfo = useWalletStore((state) => state.userInfo);
  const { mutate: sendTransaction, isLoading: isSendingTransaction } = useSendTransaction();
  const formMethods = useForm<any>({
    defaultValues: {},
    mode: "onBlur",
  });
  const {
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { isSubmitting, isLoading, isValidating, errors },
  } = formMethods;
  const isDisabled = isSubmitting || isLoading || isValidating || isSendingTransaction;
  const values = getValues();
  const onSubmit = (data: SafeTransactionBody) => sendTransaction(data);
  console.log({ values, errors });
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          gap={4}
          maxWidth={300}
        >
          <FormDropdownInput
            name="pk"
            label="Send from"
            control={control}
            options={[{ label: userInfo?.name || "", value: address }]}
            formControlProps={{ color: "secondary" }}
            rules={{ required: { value: true, message: "This field is required" } }}
          />
          <FormDropdownInput
            name="destination"
            label="Send to"
            control={control}
            options={EXCHANGE_TRANSFER_LIST}
            formControlProps={{ color: "secondary" }}
            rules={{ required: { value: true, message: "This field is required" } }}
          />
          <FormNumberInput
            name="amount"
            label="Amount"
            control={control}
            textFieldProps={{ color: "secondary" }}
            rules={{
              required: { value: true, message: "This field is required" },
              validate: (value: number) => value > 0 || "Amount must be more than 0",
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
            Send
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
