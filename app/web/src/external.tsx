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
  "rent-now": () => [
    import("./components/rent-now"),
    { c: "", s: "", h: "" },
  ],
  "option-item": () => [
    import("./components/option-item"),
    { c: "", s: "", h: "" },
  ],
};
