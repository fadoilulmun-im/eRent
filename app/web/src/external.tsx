// make sure to export default component not export const
export default {
  "render-html": () => [
    import("web.utils/components/RenderHTML"),
    { c: "", s: "", h: "" },
  ],
  "html-head": () => [
    import("web.utils/components/HtmlHead"),
    { c: "", s: "", h: "" },
  ],
  "hello-world": () => [
    import("web.utils/components/HelloWorld"),
    { c: "", s: "", h: "" },
  ],
  loading: () => [
    import("web.crud/src/legacy/Loading"),
    { c: "", s: "", h: "" },
  ],
  admin: () => [import("web.crud/src/CRUD"), { c: "", s: "", h: "" }],
  qform: () => [import("web.crud/src/form/BaseForm"), { c: "", s: "", h: "" }],
  qlist: () => [import("web.crud/src/list/QBaseList"), { c: "", s: "", h: "" }],
  "button-default": () => [
    import("./components/button-default"),
    { c: "", s: "", h: "" },
  ],
  textinput: () => [import("./components/textinput"), { c: "", s: "", h: "" }],
  "box-item": () => [import("./components/box-item"), { c: "", s: "", h: "" }],
  navbar: () => [import("./components/navbar"), { c: "", s: "", h: "" }],
  "box-item2": () => [
    import("./components/box-item2"),
    { c: "", s: "", h: "" },
  ],
  "top-naviagation": () => [
    import("./components/top-naviagation"),
    { c: "", s: "", h: "" },
  ],
  notif: () => [import("./components/notif"), { c: "", s: "", h: "" }],
  "total-price-cart": () => [
    import("./components/total-price-cart"),
    { c: "", s: "", h: "" },
  ],
  "item-cart": () => [
    import("./components/item-cart"),
    { c: "", s: "", h: "" },
  ],
  "bottom-nav-detail-product": () => [
    import("./components/bottom-nav-detail-product"),
    { c: "", s: "", h: "" },
  ],
  "rent-now": () => [import("./components/rent-now"), { c: "", s: "", h: "" }],
  loding: () => [import("./components/loding"), { c: "", s: "", h: "" }],
  index: () => [import("./components/index"), { c: "", s: "", h: "" }],
  search: () => [import("./components/search"), { c: "", s: "", h: "" }],
  detailProduct: () => [
    import("./components/detailProduct"),
    { c: "", s: "", h: "" },
  ],
  editProfil: () => [
    import("./components/editProfil"),
    { c: "", s: "", h: "" },
  ],
  newAddress: () => [
    import("./components/newAddress"),
    { c: "", s: "", h: "" },
  ],
  myAddress: () => [import("./components/myAddress"), { c: "", s: "", h: "" }],
  cart: () => [import("./components/cart"), { c: "", s: "", h: "" }],
  checkout: () => [import("./components/checkout"), { c: "", s: "", h: "" }],
  myOrder: () => [import("./components/myOrder"), { c: "", s: "", h: "" }],
  register: () => [import("./components/register"), { c: "", s: "", h: "" }],
  image: ()=>[import("./components/comp/image"),{ c: "", s: "", h: "" }],
  windowBox: ()=>[import("./components/comp/windowBox"),{ c: "", s: "", h: "" }],
  about: ()=>[import("./components/about"),{ c: "", s: "", h: "" }],
  orderDetail: () => [
    import("./components/orderDetail"),
    { c: "", s: "", h: "" },
  ],
  notification: () => [
    import("./components/notification"),
    { c: "", s: "", h: "" },
  ],
  trackOrder: () => [
    import("./components/trackOrder"),
    { c: "", s: "", h: "" },
  ],
  "payment-nav": () => [
    import("./components/payment-nav"),
    { c: "", s: "", h: "" },
  ],
  "shipping-nav": () => [
    import("./components/shipping-nav"),
    { c: "", s: "", h: "" },
  ],
  "item-cart2": () => [
    import("./components/item-cart2"),
    { c: "", s: "", h: "" },
  ],
  address: () => [import("./components/comp/address"), { c: "", s: "", h: "" }],
  "delivery-status": () => [
    import("./components/delivery-status"),
    { c: "", s: "", h: "" },
  ],
  "button-edit-profile": () => [
    import("./components/button-edit-profile"),
    { c: "", s: "", h: "" },
  ],
  "order-history": () => [
    import("./components/order-history"),
    { c: "", s: "", h: "" },
  ],
  test: () => [import("./components/test"), { c: "", s: "", h: "" }],
};
