import {
  Flex,
  HStack,
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
import { CustomSpinner } from "./CustomSpinner";
import { NameWrap } from "./NameWrap";
import { VSFButton } from "./VSFButton";
import { VSFDatePicker } from "./VSFDatePicker";
import { SelectOptionsInterface, VSFDropdown } from "./VSFDropdown";
import { VSFInput } from "./VSFInput";
import { VSFTextArea } from "./VSFTextArea";

export const TransactionModal: React.FC = ({}) => {
  const {
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
  } = useContext(HomeContext);

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
  };
  const handleDepositChange = (value: string) => {
    handleDataChange({ deposit: parseInt(value) });
  };
  const handleDateChange = (value: string) => {
    handleDataChange({ date: value });
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDataChange({ amount: e.target.value });
    handleErrorChange({
      amount: isEmpty(e.target.value) || isNumeric(e.target.value),
    });
  };
  const handleFrequencyChange = (value: string) => {
    handleDataChange({ frequency: parseInt(value) });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"white"}>
          <ModalHeader bg={"purple.1"}>
            {isEdit ? "Edit transaction" : "Add transaction"}
          </ModalHeader>
          <ModalCloseButton
            border="2px solid"
            borderRadius={8}
            borderColor={"black"}
          />
          <ModalBody>
            {isLoading ? (
              <CustomSpinner />
            ) : (
              <VStack>
                <HStack w="100%" h="100%">
                  <NameWrap title="Name" w="100%" error={error.name}>
                    <VSFInput
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
                    value={data?.description || ""}
                    placeholder="Transaction description"
                    onChange={handleDescriptionChange}
                  />
                </NameWrap>

                <HStack>
                  <NameWrap title="Type" w="100%" error={error.type}>
                    <VSFDropdown
                      value={data.type?.toString() || ""}
                      onChange={handleTypeChange}
                      error={error.type}
                      options={transactionOptions}
                      placeholder="Select transaction type"
                    />
                  </NameWrap>
                  <NameWrap title="Deposit" w="100%" error={error.deposit}>
                    <VSFDropdown
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
                    placeholder="Transaction amount"
                    onChange={handleAmountChange}
                    error={error.amount}
                    value={data.amount?.toString()}
                  />
                </NameWrap>
                <NameWrap title="Date" w="100%">
                  <VSFDatePicker
                    value={data.date}
                    onChange={handleDateChange}
                  />
                </NameWrap>
                <NameWrap title="Frequency" w="100%" error={error.frequency}>
                  <VSFDropdown
                    value={data.frequency?.toString() || ""}
                    onChange={handleFrequencyChange}
                    options={frequencyOptions}
                    error={error.frequency}
                    placeholder="Select frequency type"
                  />
                </NameWrap>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter bg={"purple.1"}>
            <Flex w="100%" justify="flex-end">
              <VSFButton onClick={submit} isLoading={isSubmitting}>
                {isEdit ? "Update" : "Submit"}
              </VSFButton>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
