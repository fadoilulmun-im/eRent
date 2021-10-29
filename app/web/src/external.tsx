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
  checkbox: () => [import("./components/checkbox"), { c: "", s: "", h: "" }],
  textinput: () => [import("./components/textinput"), { c: "", s: "", h: "" }],
  coolbutton: () => [
    import("./components/coolbutton"),
    { c: "", s: "", h: "" },
  ],
  btn: () => [import("./components/test"), { c: "", s: "", h: "" }],
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
  test: () => [import("./components/test"), { c: "", s: "", h: "" }],
  search: () => [import("./components/search"), { c: "", s: "", h: "" }],
  detailProduct: () => [import("./components/detailProduct"), { c: "", s: "", h: "" }],
  "payment-nav": () => [
    import("./components/payment-nav"),
    { c: "", s: "", h: "" },
  ],
  "shipping-nav": () => [
    import("./components/shipping-nav"),
    { c: "", s: "", h: "" },
  ],
  filter: () => [import("./components/filter"), { c: "", s: "", h: "" }],
  "item-cart2": () => [
    import("./components/item-cart2"),
    { c: "", s: "", h: "" },
  ],
  address: () => [import("./components/address"), { c: "", s: "", h: "" }],
  "save-cancel": () => [
    import("./components/save-cancel"),
    { c: "", s: "", h: "" },
  ],
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
};
