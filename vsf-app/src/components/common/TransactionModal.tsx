import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Switch,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useMemo } from "react";
import { isEmpty, isNumeric } from "../../utils/helpers";
import { HomeContext } from "../Home";
import { ErrorTransactionForm } from "../Home/types";
import { CustomSpinner } from "./CustomSpinner";
import { NameWrap } from "./NameWrap";
import { TransactionInterface } from "./Table/types";
import { VSFButton } from "./VSFButton";
import { VSFDatePicker } from "./VSFDatePicker";
import { SelectOptionsInterface, VSFDropdown } from "./VSFDropdown";
import { VSFInput } from "./VSFInput";
import { VSFTextArea } from "./VSFTextArea";

export const TransactionFormId: TransactionFormIdInterface = {
  name: "id-transaction-name",
  description: "id-transaction-description",
  type: "id-transaction-type",
  deposit: "id-transaction-deposit",
  amount: "id-transaction-amount",
  frequency: "id-transaction-frequency",
  date: "id-transaction-date",
  isRecurring: "id-transaction-isRecurring",
};
interface TransactionFormIdInterface {
  name: string;
  description: string;
  type: string;
  deposit: string;
  amount: string;
  frequency: string;
  date: string;
  isRecurring: string;
  [key: string]: string | undefined;
}
export interface TransactionModalProps {
  data: TransactionInterface;
  error: ErrorTransactionForm;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOpenEdit: (id: string) => void;
  submit: () => void;
  isLoading: boolean;
  isSubmitting: boolean;
  handleErrorChange: (error: Partial<ErrorTransactionForm>) => void;
  isEdit: boolean;
  handleDataChange: (date: Partial<TransactionInterface>) => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  submit,
  isLoading,
  isSubmitting,
  handleDataChange,
  isEdit,
  data,
  handleErrorChange,
  error,
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDataChange({ name: e.target.value });
    handleErrorChange({ name: isEmpty(e.target.value) });
  };
  const handleDescriptionChange = (value: string) => {
    handleDataChange({ description: value });
  };
  const transactionOptions: SelectOptionsInterface[] = useMemo(
    () => [
      { value: "10", display: "Income" },
      { value: "20", display: "Expense" },
    ],
    []
  );
  const depositOptions: SelectOptionsInterface[] = useMemo(
    () => [
      { value: "10", display: "Bank" },
      { value: "20", display: "Cash" },
    ],
    []
  );
  const frequencyOptions: SelectOptionsInterface[] = useMemo(
    () => [
      { value: "10", display: "Daily" },
      { value: "20", display: "Weekly" },
      { value: "30", display: "Monthly" },
      { value: "40", display: "Yearly" },
    ],
    []
  );
  const handleTypeChange = (value: string) => {
    handleDataChange({ type: parseInt(value) });
    handleErrorChange({ type: isEmpty(value) });
  };
  const handleDepositChange = (value: string) => {
    handleDataChange({ deposit: parseInt(value) });
    handleErrorChange({ deposit: isEmpty(value) });
  };
  const handleDateChange = (value: string) => {
    handleDataChange({ date: value });
    handleErrorChange({ date: isEmpty(value) });
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDataChange({ amount: e.target.value });
    handleErrorChange({
      amount: isEmpty(e.target.value) || isNumeric(e.target.value),
    });
  };
  const handleFrequencyChange = (value: string) => {
    handleDataChange({ frequency: parseInt(value) });
    handleErrorChange({ frequency: isEmpty(value) });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent bg={"white"} position="relative">
          <ModalHeader
            bg={"purple.1"}
            h={12}
            w="100%"
            position="sticky"
            top={0}
            zIndex={2}
          >
            <HStack>
              <Box>{isEdit ? "Edit transaction" : "Add transaction"}</Box>
              <Spacer />
              <Icon
                as={CloseIcon}
                onClick={onClose}
                position="sticky"
                zIndex={2}
                mb={2}
              />
            </HStack>
          </ModalHeader>
          <ModalBody maxH={"70vh"} overflow="scroll">
            {isLoading ? (
              <CustomSpinner />
            ) : (
              <VStack spacing="0" position={"relative"}>
                <HStack w="100%" h="100%">
                  <NameWrap title="Name" w="100%" error={error.name}>
                    <VSFInput
                      id={TransactionFormId.name}
                      error={error.name}
                      value={data?.name}
                      placeholder="Transaction name"
                      onChange={handleNameChange}
                    />
                  </NameWrap>
                  <Spacer />
                  <NameWrap title="Reccurent" pt={2}>
                    <Switch
                      onChange={(e) => {
                        handleErrorChange({ frequency: "" });
                        handleDataChange({ isRecurent: e.target.checked });
                      }}
                      isChecked={data.isRecurent}
                      size="lg"
                      pl={4}
                      colorScheme="teal"
                    />
                  </NameWrap>
                </HStack>
                <NameWrap title="Description" w="100%">
                  <VSFTextArea
                    id={TransactionFormId.description}
                    value={data?.description || ""}
                    placeholder="Transaction description"
                    onChange={handleDescriptionChange}
                  />
                </NameWrap>

                <HStack w="100%">
                  <NameWrap title="Type" w="100%" error={error.type}>
                    <VSFDropdown
                      id={TransactionFormId.type}
                      value={data.type?.toString() || ""}
                      onChange={handleTypeChange}
                      error={error.type}
                      options={transactionOptions}
                      placeholder="Select transaction type"
                    />
                  </NameWrap>
                  <NameWrap title="Deposit" w="100%" error={error.deposit}>
                    <VSFDropdown
                      id={TransactionFormId.deposit}
                      value={data.deposit?.toString() || ""}
                      onChange={handleDepositChange}
                      options={depositOptions}
                      error={error.deposit}
                      placeholder="Select deposit type"
                    />
                  </NameWrap>
                </HStack>
                <NameWrap title="Amount" error={error.amount} w="100%">
                  <VSFInput
                    id={TransactionFormId.amount}
                    placeholder="Transaction amount"
                    onChange={handleAmountChange}
                    error={error.amount}
                    value={data.amount?.toString()}
                  />
                </NameWrap>
                <NameWrap title="Date" w="100%">
                  <VSFDatePicker
                    id={TransactionFormId.date}
                    value={data.date}
                    onChange={handleDateChange}
                  />
                </NameWrap>
                <NameWrap title="Frequency" w="100%" error={error.frequency}>
                  <VSFDropdown
                    id={TransactionFormId.frequency}
                    value={data.frequency?.toString() || ""}
                    onChange={handleFrequencyChange}
                    options={frequencyOptions}
                    error={error.frequency}
                    placeholder="Select frequency type"
                  />
                </NameWrap>
                <Flex
                  pt={2}
                  w="100%"
                  h={12}
                  justify="flex-end"
                  position={"sticky"}
                  bottom={0}
                  zIndex={2}
                  bg="white"
                >
                  <VSFButton onClick={submit} isLoading={isSubmitting}>
                    {isEdit ? "Update" : "Submit"}
                  </VSFButton>
                </Flex>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
