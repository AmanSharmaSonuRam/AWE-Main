import { gql } from "@apollo/client";

export const GetCustomers = gql`
  query {
    customers {
      id
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;

export const GET_CUSTOMER = gql`
  query GetCustomer($id: Int!) {
    customer(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;


export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $phoneNumber: String!,
    $notes: String,
    $tags: [TagInput],
    $address: AddressInput
  ) {
    createCustomer(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      phoneNumber: $phoneNumber,
      notes: $notes,
      tags: $tags,
      address: $address
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;



