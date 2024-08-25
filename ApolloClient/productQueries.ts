import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $description: String
    $price: Float!
    $imageUrl: [String]
    $stockQuantity: Int
    $categoryId: Int
    $variantInputs: [CreateProductVariantInput]
    $collectionIds: [Int]
    $tagIds: [Int]
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      imageUrl: $imageUrl
      stockQuantity: $stockQuantity
      categoryId: $categoryId
      variantInputs: $variantInputs
      collectionIds: $collectionIds
      tagIds: $tagIds
    ) {
      id
      name
      description
      price
      imageUrl
      stockQuantity
      category {
        id
      }
      variants {
        id
        price
      }
      collections {
        id
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GetProducts = gql`
query {
  products {
    id
    name
    description
    price
    imageUrl
    stockQuantity
    variants {
      sku
      stockQuantity
    }
    category {
      name
    }
    collections {
      title
    }
    tags{
      name
    }
  }
}
`