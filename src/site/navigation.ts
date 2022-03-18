import { CategorySlugType, MenuItemType } from 'types';
import {
  CATEGORY_PAGE_QUERIES,
  PRODUCT_PAGE_QUERIES,
} from 'types/params/query/website';
import { UrlObject } from 'url';

export const HOME_PAGE = '/';
export const HOME_MENU_ITEM: MenuItemType = {
  id: 'nav.home',
  intl: 'nav.home',
  defaultMessage: 'Home',
  href: HOME_PAGE,
};

export const CATEGORIES_PAGE = '/categories';

export const CATEGORY_PAGE = '/category';
export const categoryPageBySlug = (
  slug: CategorySlugType,
  query?: Partial<CATEGORY_PAGE_QUERIES>
): UrlObject => {
  return {
    pathname: `${CATEGORY_PAGE}/${slug}`,
    query,
  };
};

export const SEARCH_PAGE = '/search';

export const RECENTLY_VIEWED_PAGE = '/recentlyViewed';

export const OFFER_PRODUCTS_PAGE = '/offer-products';
export const NEW_PRODUCTS_PAGE = '/new-products';

export const ALL_PRODUCT_PAGE = '/products';
export const PRODUCT_PAGE = '/product';
export const productPageBySlug = (
  slug: string,
  query?: Partial<PRODUCT_PAGE_QUERIES>
): UrlObject => {
  return {
    pathname: `${PRODUCT_PAGE}/${slug}`,
    query,
  };
};

export const BUDGET_PAGE = '/my-budget';
export const BUDGET_MENU_ITEM: MenuItemType = {
  id: 'nav.budget',
  intl: 'nav.budget',
  defaultMessage: 'Mi chanchito',
  href: BUDGET_PAGE,
};

export const LOGIN_PAGE = '/login';
export const LOGIN_MENU_ITEM: MenuItemType = {
  id: 'nav.login',
  intl: 'nav.login',
  defaultMessage: 'Iniciar sesión',
  href: LOGIN_PAGE,
};

export const REGISTER_PAGE = '/register';

export const RESET_PASSWORD_PAGE = '/reset-password';

export const RESTORE_PASSWORD_PAGE = '/restore-password';

export const CONTACT_PAGE = '/contact-us';
export const CONTACT_MENU_ITEM: MenuItemType = {
  id: 'nav.contact_us',
  intl: 'nav.contact_us',
  defaultMessage: 'Información de contacto',
  href: CONTACT_PAGE,
};

export const CONTACT_MENU_ITEM_SHORT: MenuItemType = {
  id: 'nav.contact_us_short',
  intl: 'nav.contact_us_short',
  defaultMessage: 'Contáctanos',
  href: CONTACT_PAGE,
};

export const MAP_PAGE = '/map';
export const MAP_MENU_ITEM: MenuItemType = {
  id: 'nav.map',
  intl: 'nav.map',
  defaultMessage: 'Donde nos encontramos',
  href: MAP_PAGE,
};

export const CART_PAGE = '/cart';
export const CART_MENU_ITEM: MenuItemType = {
  id: 'nav.cart',
  intl: 'nav.cart',
  defaultMessage: 'Cart',
  href: CART_PAGE,
};

export const CHECKOUT_PAGE = '/checkout';
export const CHECKOUT_MENU_ITEM: MenuItemType = {
  id: 'nav.checkout',
  intl: 'nav.checkout',
  defaultMessage: 'Checkout',
  href: CHECKOUT_PAGE,
};

export const FAQ_PAGE = '/faq';
export const FAQ_MENU_ITEM: MenuItemType = {
  id: 'nav.faq',
  intl: 'nav.faq',
  defaultMessage: 'Preguntas frecuentes',
  href: FAQ_PAGE,
};

export const COVID19_PAGE = '/covid19';
export const COVID19_MENU_ITEM: MenuItemType = {
  id: 'nav.covid19',
  intl: 'nav.covid19',
  defaultMessage: 'Medidas contra el covid',
  href: COVID19_PAGE,
};

export const OTHER_SERVICES_PAGE = '/other-services';
export const OTHER_SERVICES_MENU_ITEM: MenuItemType = {
  id: 'nav.otherServices',
  intl: 'nav.otherServices',
  defaultMessage: 'Otros servicios',
  href: OTHER_SERVICES_PAGE,
};

export const ACCOUNT_PAGE = '/account';
export const VIEW_ORDERS_PAGE = '/orders';

export const ORDER_RECEIVED_PAGE = '/order-received';

export const WORK_WITH_US_PAGE = '/work-with-us';
export const WORK_WITH_US_MENU_ITEM: MenuItemType = {
  id: 'nav.work_with_us',
  intl: 'nav.work_with_us',
  defaultMessage: 'Trabaja con nosotros',
  href: WORK_WITH_US_PAGE,
};

export const DEVOLUTIONS_PAGE = '/devolutions';
export const DEVOLUTIONS_MENU_ITEM: MenuItemType = {
  id: 'nav.devolutions',
  intl: 'nav.devolutions',
  defaultMessage: 'Devolutions',
  href: DEVOLUTIONS_PAGE,
};
export const TERMS_AND_CONDITIONS_PAGE = '/terms-conditions';
export const TERMS_AND_CONDITIONS_MENU_ITEM: MenuItemType = {
  id: 'nav.terms_and_conditions',
  intl: 'nav.terms_and_conditions',
  defaultMessage: 'Terms and Conditions',
  href: TERMS_AND_CONDITIONS_PAGE,
};

export const PRIVACY_POLICY_PAGE = '/privacy-policy';
export const PRIVACY_POLICY_MENU_ITEM: MenuItemType = {
  id: 'nav.privacy_policy',
  intl: 'nav.privacy_policy',
  defaultMessage: 'Privacy Policy',
  href: PRIVACY_POLICY_PAGE,
};

export const ABOUT_US_PAGE = '/about-us';
export const ABOUT_US_MENU_ITEM: MenuItemType = {
  id: 'nav.about_us',
  intl: 'nav.about_us',
  defaultMessage: 'Quienes somos',
  href: ABOUT_US_PAGE,
};

export const RECIPES_PAGE = '/recipes';

export const MAIN_MENU_ITEMS: MenuItemType[] = [
  CONTACT_MENU_ITEM_SHORT,
  LOGIN_MENU_ITEM,
];

export const MAIN_MENU_AUTH_ITEMS: MenuItemType[] = [
  CONTACT_MENU_ITEM_SHORT,
  BUDGET_MENU_ITEM,
];

export const FOOTER_MENU: MenuItemType[] = [
  ABOUT_US_MENU_ITEM,
  // WORK_WITH_US_MENU_ITEM,
  FAQ_MENU_ITEM,
  MAP_MENU_ITEM,
  COVID19_MENU_ITEM,
  CONTACT_MENU_ITEM,
  PRIVACY_POLICY_MENU_ITEM,
  DEVOLUTIONS_MENU_ITEM,
  TERMS_AND_CONDITIONS_MENU_ITEM,
];

export const MY_ORDERS: MenuItemType = {
  id: 'contextMenuLogin.orders',
  intl: 'contextMenuLogin.orders',
  defaultMessage: 'Mis órdenes',
  href: VIEW_ORDERS_PAGE,
};

export const MY_PROFILE: MenuItemType = {
  id: 'contextMenuLogin.profile',
  intl: 'contextMenuLogin.profile',
  defaultMessage: 'Mi perfil',
  href: ACCOUNT_PAGE,
};

export const CONTEXT_MENU_LOGIN: MenuItemType[] = [MY_ORDERS, MY_PROFILE];
