
import { ListOrdered, Package2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Orders = () => {
  // This would typically come from an API or context
  const orders = [
    {
      id: "ORD-001",
      date: "2024-04-10",
      items: [
        { name: "Nike Air Max 90", size: "US 10", price: 129.99 },
      ],
      status: "Delivered",
      total: 129.99,
    },
    {
      id: "ORD-002",
      date: "2024-04-08",
      items: [
        { name: "Adidas Ultraboost", size: "US 9.5", price: 179.99 },
        { name: "Nike Dunk Low", size: "US 9.5", price: 99.99 },
      ],
      status: "In Transit",
      total: 279.98,
    },
    {
      id: "ORD-003",
      date: "2024-04-05",
      items: [
        { name: "Jordan 1 Retro High", size: "US 11", price: 169.99 },
      ],
      status: "Delivered",
      total: 169.99,
    },
  ]

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 gap-4">
          <ListOrdered className="h-6 w-6" />
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Package2 className="h-4 w-4 text-muted-foreground" />
                        {item.name} ({item.size})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Orders
