
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.StoreScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  username: 'username',
  address: 'address',
  status: 'status',
  isActive: 'isActive',
  logo: 'logo',
  email: 'email',
  contact: 'contact',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  mrp: 'mrp',
  price: 'price',
  images: 'images',
  category: 'category',
  inStock: 'inStock',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  storeId: 'storeId'
};

exports.Prisma.Products_dessertsScalarFieldEnum = {
  dessert_id: 'dessert_id',
  name_eng: 'name_eng',
  name: 'name',
  image_url: 'image_url',
  price: 'price',
  amount: 'amount',
  status: 'status',
  date: 'date'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: 'id',
  quantity: 'quantity',
  price: 'price',
  orderId: 'orderId',
  productIdDessert: 'productIdDessert',
  productId: 'productId'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  userName: 'userName',
  userEmail: 'userEmail',
  productName: 'productName',
  productImage: 'productImage',
  quantity: 'quantity',
  price: 'price',
  totalPrice: 'totalPrice',
  orderDate: 'orderDate',
  isPaid: 'isPaid',
  paymentMethod: 'paymentMethod',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  status: 'status',
  stripe_session_id: 'stripe_session_id',
  productId: 'productId',
  userId: 'userId',
  addressId: 'addressId',
  storeId: 'storeId'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  amount: 'amount',
  paymentDate: 'paymentDate',
  orderId: 'orderId'
};

exports.Prisma.ShipmentScalarFieldEnum = {
  id: 'id',
  shippingDate: 'shippingDate',
  trackingNumber: 'trackingNumber',
  orderId: 'orderId'
};

exports.Prisma.AddressScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  street: 'street',
  city: 'city',
  state: 'state',
  zip: 'zip',
  country: 'country',
  phone: 'phone',
  description: 'description',
  createdAt: 'createdAt',
  userId: 'userId'
};

exports.Prisma.ProfileScalarFieldEnum = {
  id: 'id',
  address: 'address',
  userId: 'userId'
};

exports.Prisma.FileScalarFieldEnum = {
  id: 'id',
  name: 'name',
  path: 'path',
  size: 'size',
  type: 'type',
  fileUrl: 'fileUrl',
  thumbnailUrl: 'thumbnailUrl',
  parentId: 'parentId',
  isFolder: 'isFolder',
  isStarred: 'isStarred',
  isTrash: 'isTrash',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.CustomersScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  image_url: 'image_url'
};

exports.Prisma.InvoicesScalarFieldEnum = {
  id: 'id',
  amount: 'amount',
  status: 'status',
  date: 'date',
  customerId: 'customerId'
};

exports.Prisma.RevenueScalarFieldEnum = {
  month: 'month',
  revenue: 'revenue'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  password: 'password',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  emailVerifiedAuthjs: 'emailVerifiedAuthjs'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  token: 'token',
  expiresAt: 'expiresAt',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  activeOrganizationId: 'activeOrganizationId',
  sessionToken: 'sessionToken',
  expires: 'expires',
  userId: 'userId'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  accountId: 'accountId',
  providerId: 'providerId',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  accessTokenExpiresAt: 'accessTokenExpiresAt',
  refreshTokenExpiresAt: 'refreshTokenExpiresAt',
  scope: 'scope',
  idToken: 'idToken',
  password: 'password',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  id_token: 'id_token',
  session_state: 'session_state',
  userId: 'userId'
};

exports.Prisma.VerificationScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  value: 'value',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.InvitationScalarFieldEnum = {
  id: 'id',
  email: 'email',
  role: 'role',
  status: 'status',
  expiresAt: 'expiresAt',
  organizationId: 'organizationId',
  inviterId: 'inviterId'
};

exports.Prisma.AuthenticatorAuthjsScalarFieldEnum = {
  credentialID: 'credentialID',
  providerAccountId: 'providerAccountId',
  credentialPublicKey: 'credentialPublicKey',
  counter: 'counter',
  credentialDeviceType: 'credentialDeviceType',
  credentialBackedUp: 'credentialBackedUp',
  transports: 'transports',
  userId: 'userId'
};

exports.Prisma.MemberScalarFieldEnum = {
  id: 'id',
  role: 'role',
  createdAt: 'createdAt',
  organizationId: 'organizationId',
  userId: 'userId'
};

exports.Prisma.OrganizationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  logo: 'logo',
  createdAt: 'createdAt',
  metadata: 'metadata'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.PaymentMethod = exports.$Enums.PaymentMethod = {
  COD: 'COD',
  STRIPE: 'STRIPE'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  ORDER_PLACED: 'ORDER_PLACED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED'
};

exports.Role = exports.$Enums.Role = {
  member: 'member',
  admin: 'admin',
  owner: 'owner',
  guest: 'guest',
  user: 'user'
};

exports.Prisma.ModelName = {
  Store: 'Store',
  Product: 'Product',
  products_desserts: 'products_desserts',
  OrderItem: 'OrderItem',
  Order: 'Order',
  Payment: 'Payment',
  Shipment: 'Shipment',
  Address: 'Address',
  Profile: 'Profile',
  File: 'File',
  Customers: 'Customers',
  Invoices: 'Invoices',
  Revenue: 'Revenue',
  User: 'User',
  Session: 'Session',
  Account: 'Account',
  Verification: 'Verification',
  Invitation: 'Invitation',
  AuthenticatorAuthjs: 'AuthenticatorAuthjs',
  Member: 'Member',
  Organization: 'Organization'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
