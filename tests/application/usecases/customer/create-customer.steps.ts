import { loadFeature, defineFeature } from "jest-cucumber";
import { CreateCustomer } from "@/application/usecases/customer";
import { CustomerRepositorySpy } from "@/tests/application/mocks";
import { customerMock } from "@/tests/domain/mocks";
import { ConflictError } from "@/domain/errors";
import { throwError } from "@/tests/test-helpers";

const feature = loadFeature(
  "tests/application/usecases/customer/features/create-customer.feature"
);

defineFeature(feature, (test) => {
  let sut: CreateCustomer;
  let customerRepositorySpy: CustomerRepositorySpy;
  let result: any;
  let error: Error | null;

  const customerInput = {
    cpf: "44204681816",
    email: "any_email@mail.com",
    name: "any_name",
  };

  beforeEach(() => {
    customerRepositorySpy = new CustomerRepositorySpy();
    sut = new CreateCustomer(customerRepositorySpy);
    result = null;
    error = null;
  });

  test("Successfully creating a new customer", ({ given, when, then, and }) => {
    given("I have valid customer information", (table) => {
      const [data] = table;
      customerRepositorySpy.findByCpfResult = null;
      Object.assign(customerInput, data);
    });

    when("I try to create the customer", async () => {
      result = await sut.execute(customerInput);
    });

    then("the customer should be created successfully", () => {
      expect(result.customerId).toBeTruthy();
    });

    and("the customer should have correct information", () => {
      expect(result.getCpf()).toBe(customerInput.cpf);
      expect(result.getEmail()).toBe(customerInput.email);
      expect(result.getName()).toBe(customerInput.name);
    });

    and("the repository should be called with correct data", () => {
      expect(customerRepositorySpy.findByCpfParams).toBe(customerInput.cpf);
      expect(customerRepositorySpy.saveParams?.customerId).toBeTruthy();
      expect(customerRepositorySpy.saveParams?.getCpf()).toBe(
        customerInput.cpf
      );
      expect(customerRepositorySpy.saveParams?.getEmail()).toBe(
        customerInput.email
      );
      expect(customerRepositorySpy.saveParams?.getName()).toBe(
        customerInput.name
      );
    });
  });

  test("Attempting to create a customer with existing CPF", ({
    given,
    when,
    then,
  }) => {
    given("I have customer information with an existing CPF", () => {
      customerRepositorySpy.findByCpfResult = customerMock;
    });

    when("I try to create the customer", async () => {
      try {
        await sut.execute(customerInput);
      } catch (e) {
        error = e as Error;
      }
    });

    then(
      /^I should receive a conflict error with message "(.*)"$/,
      (message) => {
        expect(error).toBeInstanceOf(ConflictError);
        expect(error?.message).toBe(message);
      }
    );
  });

  test("System error during CPF check", ({ given, when, then }) => {
    given("the system encounters an error during CPF verification", () => {
      jest
        .spyOn(customerRepositorySpy, "findByCpf")
        .mockImplementationOnce(throwError);
    });

    when("I try to create the customer", async () => {
      try {
        await sut.execute(customerInput);
      } catch (e) {
        error = e as Error;
      }
    });

    then("the error should be propagated", () => {
      expect(error).toBeTruthy();
    });
  });

  test("System error during customer save", ({ given, when, then }) => {
    given("the system encounters an error while saving the customer", () => {
      customerRepositorySpy.findByCpfResult = null;
      jest
        .spyOn(customerRepositorySpy, "save")
        .mockImplementationOnce(throwError);
    });

    when("I try to create the customer", async () => {
      try {
        await sut.execute(customerInput);
      } catch (e) {
        error = e as Error;
      }
    });

    then("the error should be propagated", () => {
      expect(error).toBeTruthy();
    });
  });
});
