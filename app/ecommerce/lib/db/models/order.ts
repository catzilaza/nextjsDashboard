// User (1) ──── (1) Customer ────< (N) Address
//                   │
//                   ├───< (N) Order ────< (N) OrderItem >──── (1) Product
//                   │        │
//                   │        └─── (1) Payment
//                   │
//                   └───< (N) Invoice ────< (N) InvoiceItem >──── (1) Product
//====================================================================================
// User (1) ────< (N) Order ────< (N) OrderItem >──── (1) Product
//                   │                 │
//                   │                 └───< (N) Review
//                   │
//                   ├─── (1) Payment
//                   │
//                   └─── (1) ShippingInfo
// - User (1) ────< (N) Order
// - ผู้ใช้หนึ่งคนสามารถมีหลายคำสั่งซื้อ (Order)
// - Order ────< (N) OrderItem >──── (1) Product
// - คำสั่งซื้อหนึ่งมีหลายรายการสินค้า (OrderItem)
// - แต่ละ OrderItem อ้างอิงไปยัง Product หนึ่งตัว
// - OrderItem └───< (N) Review
// - สินค้า (Product) สามารถมีหลาย Review จากผู้ใช้
// - Review เชื่อมโยงกับทั้ง Product และ User
// - Order ──── (1) Payment
// - คำสั่งซื้อหนึ่งมีการชำระเงินหนึ่งครั้ง (Payment)
// - Order ──── (1) ShippingInfo
// - คำสั่งซื้อหนึ่งมีข้อมูลการจัดส่งหนึ่งชุด (ShippingInfo
