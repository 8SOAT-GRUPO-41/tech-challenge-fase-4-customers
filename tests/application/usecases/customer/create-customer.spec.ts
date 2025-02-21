import { CreateCustomer } from "@/application/usecases/customer";
import { CustomerRepositorySpy } from "@/tests/application/mocks";
import { customerMock } from "@/tests/domain/mocks";
import { ConflictError } from "@/domain/errors";
import { throwError } from "@/tests/test-helpers";

describe("CreateCustomer Use Case", () => {
  let sut: CreateCustomer;
  let customerRepositorySpy: CustomerRepositorySpy;

  const customerInput = {
    cpf: "44204681816",
    email: "any_email@mail.com",
    name: "any_name",
  };

  beforeEach(() => {
    customerRepositorySpy = new CustomerRepositorySpy();
    sut = new CreateCustomer(customerRepositorySpy);
  });

  describe("Given a valid customer input", () => {
    beforeEach(() => {
      customerRepositorySpy.findByCpfResult = null;
    });

    describe("When creating a new customer", () => {
      let result: any;

      beforeEach(async () => {
        result = await sut.execute(customerInput);
      });

      it("Then should create a customer with correct data", () => {
        expect(result.customerId).toBeTruthy();
        expect(result.getCpf()).toBe(customerInput.cpf);
        expect(result.getEmail()).toBe(customerInput.email);
        expect(result.getName()).toBe(customerInput.name);
      });

      it("Then should call findByCpf with correct CPF", () => {
        expect(customerRepositorySpy.findByCpfParams).toBe(customerInput.cpf);
      });

      it("Then should save customer with correct data", () => {
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
  });

  describe("Given a CPF that already exists", () => {
    beforeEach(() => {
      customerRepositorySpy.findByCpfResult = customerMock;
    });

    describe("When creating a customer", () => {
      it("Then should throw ConflictError", async () => {
        const promise = sut.execute(customerInput);
        await expect(promise).rejects.toThrow(
          new ConflictError("Customer already exists")
        );
      });
    });
  });

  describe("Given a system error scenario", () => {
    describe("When findByCpf throws", () => {
      beforeEach(() => {
        jest
          .spyOn(customerRepositorySpy, "findByCpf")
          .mockImplementationOnce(throwError);
      });

      it("Then should propagate the error", async () => {
        const promise = sut.execute(customerInput);
        await expect(promise).rejects.toThrow();
      });
    });

    describe("When save throws", () => {
      beforeEach(() => {
        customerRepositorySpy.findByCpfResult = null;
        jest
          .spyOn(customerRepositorySpy, "save")
          .mockImplementationOnce(throwError);
      });

      it("Then should propagate the error", async () => {
        const promise = sut.execute(customerInput);
        await expect(promise).rejects.toThrow();
      });
    });
  });
});
