Feature: Create Customer
  As a system user
  I want to create new customers
  So that I can manage customer information

  Scenario: Successfully creating a new customer
    Given I have valid customer information
      | cpf         | email              | name      |
      | 44204681816 | any_email@mail.com | any_name  |
    When I try to create the customer
    Then the customer should be created successfully
    And the customer should have correct information
    And the repository should be called with correct data

  Scenario: Attempting to create a customer with existing CPF
    Given I have customer information with an existing CPF
    When I try to create the customer
    Then I should receive a conflict error with message "Customer already exists"

  Scenario: System error during CPF check
    Given the system encounters an error during CPF verification
    When I try to create the customer
    Then the error should be propagated

  Scenario: System error during customer save
    Given the system encounters an error while saving the customer
    When I try to create the customer
    Then the error should be propagated 