'use client'

import { useState, useEffect } from "react"
import { useQuery, useMutation, gql } from "@apollo/client"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Search, Plus, X, Trash, Mail, Phone, MessageSquare } from "lucide-react"

// GraphQL Queries and Mutations
const SEARCH_PRODUCTS = gql`
  query SearchProducts($searchTerm: String!) {
    searchProducts(searchTerm: $searchTerm) {
      id
      name
      description
      price
    }
  }
`

const SEARCH_CUSTOMERS = gql`
  query SearchCustomers($searchTerm: String!) {
    searchCustomers(searchTerm: $searchTerm) {
      id
      name
      email
      phone
      address
    }
  }
`

const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      id
      name
      email
      phone
      address
    }
  }
`

const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      total
    }
  }
`

const GET_STORE_SETTINGS = gql`
  query GetStoreSettings {
    storeSettings {
      taxIncludedInPrice
    }
  }
`

export default function EnhancedOrdersPage() {
  const [productSearchTerm, setProductSearchTerm] = useState("")
  const [customerSearchTerm, setCustomerSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [customItem, setCustomItem] = useState({ name: "", description: "", price: "", quantity: "" })
  const [orderTags, setOrderTags] = useState([])
  const [orderNotes, setOrderNotes] = useState("")
  const [discount, setDiscount] = useState(0)
  const [shippingFees, setShippingFees] = useState(0)
  const [otherFees, setOtherFees] = useState(0)
  const [collectPaymentLater, setCollectPaymentLater] = useState(false)
  const [taxRate, setTaxRate] = useState(18)
  const [isEditingTax, setIsEditingTax] = useState(false)

  const { data: productData, loading: productLoading } = useQuery(SEARCH_PRODUCTS, {
    variables: { searchTerm: productSearchTerm },
    skip: !productSearchTerm,
  })

  const { data: customerData, loading: customerLoading, refetch: refetchCustomers } = useQuery(SEARCH_CUSTOMERS, {
    variables: { searchTerm: customerSearchTerm },
    skip: !customerSearchTerm,
  })

  const { data: storeSettingsData } = useQuery(GET_STORE_SETTINGS)

  const [createCustomer] = useMutation(CREATE_CUSTOMER)
  const [createOrder] = useMutation(CREATE_ORDER)

  const taxIncludedInPrice = storeSettingsData?.storeSettings?.taxIncludedInPrice ?? true

  useEffect(() => {
    if (customerSearchTerm) {
      refetchCustomers({ searchTerm: customerSearchTerm })
    }
  }, [customerSearchTerm, refetchCustomers])

  const handleAddProduct = (product) => {
    setOrderItems([...orderItems, { ...product, quantity: 1 }])
  }

  const handleAddCustomItem = () => {
    if (customItem.name && customItem.price && customItem.quantity) {
      setOrderItems([...orderItems, { ...customItem, id: `custom-${Date.now()}` }])
      setCustomItem({ name: "", description: "", price: "", quantity: "" })
    }
  }

  const handleRemoveItem = (itemId) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId))
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    setOrderItems(orderItems.map(item => 
      item.id === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
    ))
  }

  const handleAddTag = (tag) => {
    if (tag && !orderTags.includes(tag)) {
      setOrderTags([...orderTags, tag])
    }
  }

  const handleRemoveTag = (tag) => {
    setOrderTags(orderTags.filter(t => t !== tag))
  }

  const handleCreateCustomer = async (newCustomer) => {
    try {
      const { data } = await createCustomer({ variables: { input: newCustomer } })
      setSelectedCustomer(data.createCustomer)
      toast({
        title: "Customer created",
        description: "New customer has been added successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create new customer.",
        variant: "destructive",
      })
    }
  }

  const handleCreateOrder = async () => {
    if (!selectedCustomer || orderItems.length === 0) {
      toast({
        title: "Invalid Order",
        description: "Please select a customer and add items to the order.",
        variant: "destructive",
      })
      return
    }

    const orderInput = {
      customerId: selectedCustomer.id,
      items: orderItems.map(item => ({ productId: item.id, quantity: item.quantity })),
      tags: orderTags,
      notes: orderNotes,
      discount,
      shippingFees,
      otherFees,
      taxRate,
      collectPaymentLater,
    }

    try {
      const { data } = await createOrder({ variables: { input: orderInput } })
      toast({
        title: "Order Created",
        description: `Order #${data.createOrder.id} has been created successfully.`,
      })
      // Reset form or redirect to order details page
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create the order.",
        variant: "destructive",
      })
    }
  }

  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateTax = () => {
    return (calculateSubtotal() - discount) * (taxRate / 100)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const tax = calculateTax()
    return subtotal - discount + shippingFees + otherFees + (taxIncludedInPrice ? 0 : tax)
  }

  const sendInvoice = (method) => {
    // Implement the logic to send invoice via the specified method
    toast({
      title: "Invoice Sent",
      description: `Invoice has been sent via ${method}.`,
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/orders">Orders</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Order</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
                    value={customerSearchTerm}
                    onChange={(e) => setCustomerSearchTerm(e.target.value)}
                  />
                </div>
                {customerLoading && <div>Loading customers...</div>}
                {customerData?.searchCustomers && (
                  <Select onValueChange={(value) => setSelectedCustomer(JSON.parse(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customerData.searchCustomers.map((customer) => (
                        <SelectItem key={customer.id} value={JSON.stringify(customer)}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {selectedCustomer && (
                  <div className="space-y-2">
                    <div><strong>Name:</strong> {selectedCustomer.name}</div>
                    <div><strong>Email:</strong> {selectedCustomer.email}</div>
                    <div><strong>Phone:</strong> {selectedCustomer.phone}</div>
                    <div><strong>Address:</strong> {selectedCustomer.address}</div>
                  </div>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Add New Customer</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Customer</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.target)
                      const newCustomer = Object.fromEntries(formData)
                      handleCreateCustomer(newCustomer)
                    }}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" name="name" required />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" required />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" name="phone" required />
                        </div>
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Textarea id="address" name="address" required />
                        </div>
                        <Button type="submit">Create Customer</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={productSearchTerm}
                    onChange={(e) => setProductSearchTerm(e.target.value)}
                  />
                </div>
                {productLoading && <div>Loading products...</div>}
                {productData?.searchProducts && (
                  <div className="space-y-2">
                    {productData.searchProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">${product.price}</div>
                        </div>
                        <Button onClick={() => handleAddProduct(product)}>Add</Button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Custom Item</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Name"
                      value={customItem.name}
                      onChange={(e) => setCustomItem({ ...customItem, name: e.target.value })}
                    />
                    <Input
                      placeholder="Price"
                      type="number"
                      value={customItem.price}
                      onChange={(e) => setCustomItem({ ...customItem, price: e.target.value })}
                    />
                    <Input
                      placeholder="Quantity"
                      type="number"
                      value={customItem.quantity}
                      onChange={(e) => setCustomItem({ ...customItem, quantity: e.target.value })}
                    />
                    <Button onClick={handleAddCustomItem}><Plus className="mr-2 h-4 w-4" /> Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {orderTags.map((tag) => (
                    <div key={tag} className="flex items-center bg-muted rounded-full px-3 py-1">
                      <span>{tag}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveTag(tag)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Input
                    placeholder="Add a tag"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag(e.target.value)
                        e.target.value = ''
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add any additional notes here..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Discount</span>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    className="w-24 text-right"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping Fees</span>
                  <Input
                    type="number"
                    value={shippingFees}
                    onChange={(e) => setShippingFees(parseFloat(e.target.value) || 0)}
                    className="w-24 text-right"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Other Fees</span>
                  <Input
                    type="number"
                    value={otherFees}
                    onChange={(e) => setOtherFees(parseFloat(e.target.value) || 0)}
                    className="w-24 text-right"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span onClick={() => setIsEditingTax(true)} className="cursor-pointer">
                    Tax ({taxRate}%) {taxIncludedInPrice ? "(included)" : "(excluded)"}
                  </span>
                  {isEditingTax ? (
                    <Input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      onBlur={() => setIsEditingTax(false)}
                      className="w-24 text-right"
                      autoFocus
                    />
                  ) : (
                    <span>${calculateTax().toFixed(2)}</span>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="collect-payment-later"
                    checked={collectPaymentLater}
                    onCheckedChange={setCollectPaymentLater}
                  />
                  <Label htmlFor="collect-payment-later">Collect payment later</Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" onClick={handleCreateOrder}>Create Order</Button>
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => sendInvoice('email')}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Invoice
                  </Button>
                  <Button variant="outline" onClick={() => sendInvoice('sms')}>
                    <Phone className="mr-2 h-4 w-4" />
                    SMS Invoice
                  </Button>
                  <Button variant="outline" onClick={() => sendInvoice('whatsapp')}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    WhatsApp Invoice
                  </Button>
                </div>
              </CardFooter>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}