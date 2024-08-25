"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Customer } from "@prisma/client"

export default function Component() {
  // const [customers, setCustomers] = useState([
  //   {
  //     id: 1,
  //     firstName: "John Doe",
  //     email: "john@example.com",
  //     phone: "555-1234",
  //     // address: "123 Main St, Anytown USA",
  //   },
  //   {
  //     id: 2,
  //     firstName: "Jane Smith",
  //     email: "jane@example.com",
  //     phone: "555-5678",
  //     // address: "456 Oak Rd, Somewhere City",
  //   },
  //   {
  //     id: 3,
  //     firstName: "Bob Johnson",
  //     email: "bob@example.com",
  //     phone: "555-9012",
  //     // address: "789 Elm St, Elsewhere Town",
  //   },
  // ])
  // const [searchTerm, setSearchTerm] = useState("")
  // const [selectedCustomer, setSelectedCustomer] = useState<Customer>(customers[0])
  // const [orderTags, setOrderTags] = useState([])
  // const [orderNotes, setOrderNotes] = useState("")
  // const [selectedShippingAddress, setSelectedShippingAddress] = useState(null)
  // const filteredCustomers = customers.filter((customer) =>
  //   customer.name.toLowerCase().includes(searchTerm.toLowerCase()),
  // )
  // const handleCustomerSelect = (customer: Customer) => {
  //   setSelectedCustomer(customer)
  //   setSelectedShippingAddress(customer.address)
  // }
  // const handleAddTag = (tag) => {
  //   setOrderTags([...orderTags, tag])
  // }
  // const handleRemoveTag = (index) => {
  //   const updatedTags = [...orderTags]
  //   updatedTags.splice(index, 1)
  //   setOrderTags(updatedTags)
  // }
  // const handleOrderNotesChange = (e) => {
  //   setOrderNotes(e.target.value)
  // }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 py-8">
      <div className="col-span-2 lg:col-span-2 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" placeholder="Enter product name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea id="product-description" placeholder="Enter product description" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="product-quantity">Quantity</Label>
                <Input id="product-quantity" type="number" placeholder="Enter quantity" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product-price">Price</Label>
                <Input id="product-price" type="number" placeholder="Enter price" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product-total">Total</Label>
                <Input id="product-total" type="number" placeholder="Total" disabled />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                Add Product
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Glimmer Lamps</div>
                    <div className="text-sm text-muted-foreground">Warm and cozy lighting</div>
                  </TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>$50.00</TableCell>
                  <TableCell>$100.00</TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Aqua Filters</div>
                    <div className="text-sm text-muted-foreground">Clean and fresh water</div>
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>$49.00</TableCell>
                  <TableCell>$49.00</TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="customer-search">Search Customer</Label>
              <Input
                id="customer-search"
                placeholder="Search customer by name"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* {selectedCustomer ? (
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customer-name">Name</Label>
                    <Input id="customer-name" placeholder="Enter customer name" defaultValue={selectedCustomer.name} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customer-email">Email</Label>
                    <Input
                      id="customer-email"
                      type="email"
                      placeholder="Enter customer email"
                      defaultValue={selectedCustomer.email}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customer-phone">Phone</Label>
                    <Input
                      id="customer-phone"
                      placeholder="Enter customer phone"
                      defaultValue={selectedCustomer.phone}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customer-address">Address</Label>
                    <Textarea
                      id="customer-address"
                      placeholder="Enter customer address"
                      defaultValue={selectedCustomer.address}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex items-center gap-4 cursor-pointer hover:bg-muted/50 rounded-md p-2"
                      onClick={() => handleCustomerSelect(customer)}
                    >
                      <Avatar className="w-10 h-10 border">
                        <AvatarImage src="/placeholder-user.jpg" alt={customer.name} />
                        <AvatarFallback>{customer.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground">No customers found</div>
                )}
              </div>
            )} */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Tags</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-wrap gap-2">
              {/* {orderTags.map((tag, index) => (
                <div key={index} className="bg-muted px-3 py-1 rounded-full flex items-center gap-2">
                  <span>{tag}</span>
                  <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => handleRemoveTag(index)}>
                    <XIcon className="h-3 w-3" />
                  </Button>
                </div>
              ))} */}
              <Input
                placeholder="Add a tag"
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     handleAddTag(e.target.value)
                //     e.target.value = ""
                //   }
                // }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Notes</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Textarea
              id="order-notes"
              placeholder="Add order notes"
              // value={orderNotes}
              // onChange={handleOrderNotesChange}
            />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 lg:col-span-1 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>$149.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax</span>
              <span>$15.00</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>$174.00</span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline">Save Order</Button>
            <Button>Place Order</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* {selectedShippingAddress ? (
              <div className="grid gap-2">
                <div className="font-medium">{selectedCustomer.name}</div>
                <div>{selectedShippingAddress}</div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">No shipping address selected</div>
            )} */}
          </CardContent>
          <CardFooter>
            <Button variant="outline">Change Address</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function TrashIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


function XIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}